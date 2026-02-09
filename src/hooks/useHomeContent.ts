import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../helper/axios';
import handleAsyncOperation from '../helper/AsyncHandler';
import { useTranslation } from './useTranslation';
import { translateObject } from '../utils/translationInit';

const decodeHtmlEntities = (text: string): string => {
  const entities: { [key: string]: string } = {
    '&#39;': "'",
    '&quot;': '"',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&apos;': "'",
    '&#x27;': "'",
    '&#x2F;': '/',
    '&nbsp;': ' ',
  };
  return text.replace(/&#?\w+;/g, (match) => entities[match] || match);
};

interface ContentField {
  content_id: string;
  value: string;
  name: string;
  field_type: string;
  id: string;
}

interface ContentData {
  title: string;
  page_id: string;
  description: string;
  created_at: string;
  updated_at: string;
  id: string;
  fields: ContentField[];
}

interface ContentResponse {
  success: boolean;
  data: ContentData;
  detail: string;
}

export const useHomeContent = (pageId: string) => {
  const [content, setContent] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { currentLanguage } = useTranslation();

  const fetchContent = useCallback(async (overrideLanguage?: string) => {
    const targetLanguage = overrideLanguage || currentLanguage;

    await handleAsyncOperation<ContentResponse>(
      async () => {
        const response = await axiosInstance.get(`/content/${pageId}`);
        return response.data;
      },
      '',
      '',
      setLoading
    ).then(async (result) => {
      if (result?.success) {
        let contentData = result.data;

        // Translate content if language is not English
        if (targetLanguage !== 'en') {
          // Translate title and description
          const fieldsToTranslate = ['title', 'description'];
          contentData = await translateObject(contentData, targetLanguage, fieldsToTranslate);

          // Decode entities for title and description
          if (contentData.title) contentData.title = decodeHtmlEntities(contentData.title);
          if (contentData.description) contentData.description = decodeHtmlEntities(contentData.description);

          // Translate all field values (preserve newlines)
          if (contentData.fields && contentData.fields.length > 0) {
            const translatedFields = await Promise.all(
              contentData.fields.map(async (field) => {
                if (field.value && ['text', 'rich_text', 'string', 'textarea'].includes(field.field_type)) {
                  const { translateText } = await import('../services/translationService');
                  let translatedValue: string;

                  // Preserve newlines by translating each line separately
                  if (field.value.includes('\n')) {
                    const lines = field.value.split('\n');
                    const translatedLines = await Promise.all(
                      lines.map(line => line.trim() ? translateText(line, targetLanguage) : Promise.resolve(line))
                    );
                    translatedValue = translatedLines.join('\n');
                  } else {
                    translatedValue = await translateText(field.value, targetLanguage);
                  }

                  // Decode entities AFTER translation
                  translatedValue = decodeHtmlEntities(translatedValue);

                  return { ...field, value: translatedValue };
                }
                return field;
              })
            );
            contentData = { ...contentData, fields: translatedFields };
          }
        }

        setContent(contentData);
        setError(null);
      }
    });
  }, [pageId, currentLanguage]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  // Listen for language change events to force immediate re-fetch
  useEffect(() => {
    const handleLanguageChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      const newLanguage = customEvent.detail?.language;

      if (newLanguage) {
        // Immediately re-fetch with the new language from event
        // This bypasses the async state update issue
        fetchContent(newLanguage);
      }
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [fetchContent]);

  const getFieldValue = (fieldName: string): string => {
    if (!content) return '';
    console.log(fieldName);
    const field = content.fields.find((f) => f.name === fieldName);
    return field?.value || '';
  };

  const getFieldValueAsNumber = (fieldName: string): number => {
    const value = getFieldValue(fieldName);
    return value ? Number(value) : 0;
  };

  const getFieldValueAsArray = (fieldName: string): any[] => {
    const value = getFieldValue(fieldName);
    if (!value) return [];

    try {
      // First try standard JSON parse
      return JSON.parse(value);
    } catch (error) {
      // If standard JSON parse fails, try to handle single-quoted JSON
      try {
        // Replace single quotes with double quotes for proper JSON formatting
        const doubleQuotedValue = value
          .replace(/'/g, '"')
          .replace(/(\w+):/g, '"$1":'); // Also convert unquoted property names to quoted ones

        return JSON.parse(doubleQuotedValue);
      } catch (parseError) {
        console.error(`Error parsing array field ${fieldName}:`, parseError);
        return [];
      }
    }
  };

  return {
    content,
    loading,
    error,
    getFieldValue,
    getFieldValueAsNumber,
    getFieldValueAsArray,
    refetch: fetchContent,
  };
}; 