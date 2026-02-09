import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../helper/axios';
import { useTranslation } from './useTranslation';
import { translateObject } from '../utils/translationInit';

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

export const useTagoBankContent = (pageId: string) => {
  const [content, setContent] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { currentLanguage } = useTranslation();

  const fetchContent = useCallback(async (overrideLanguage?: string) => {
    const targetLanguage = overrideLanguage || currentLanguage;
    
    try {
      setLoading(true);
      const response = await axiosInstance.get<ContentResponse>(`/tago-bank/content/${pageId}`);
      if (response.data.success && response.data.data) {
        let contentData = response.data.data;
        
        // Translate content if language is not English
        if (targetLanguage !== 'en') {
          // Translate title and description
          const fieldsToTranslate = ['title', 'description'];
          contentData = await translateObject(contentData, targetLanguage, fieldsToTranslate);
          
          // Translate all field values (preserve newlines)
          if (contentData.fields && contentData.fields.length > 0) {
            const translatedFields = await Promise.all(
              contentData.fields.map(async (field: ContentField) => {
                if (!field.value) return field;

                const { translateText } = await import('../services/translationService');
                
                // Handle JSON/Array fields (often used for lists of cards/features)
                if (field.field_type === 'json' || field.field_type === 'array' || field.value.trim().startsWith('[') || field.value.trim().startsWith('{')) {
                  try {
                    // Try to parse as JSON
                    let parsedValue: any;
                    try {
                      parsedValue = JSON.parse(field.value);
                    } catch (e) {
                      // Attempt to fix single quotes if standard parse fails
                      const doubleQuoted = field.value
                        .replace(/'/g, '"')
                        .replace(/(\w+):/g, '"$1":');
                      parsedValue = JSON.parse(doubleQuoted);
                    }

                    if (Array.isArray(parsedValue)) {
                      // Translate array of objects
                      const translatedArray = await Promise.all(parsedValue.map(async (item) => {
                        if (typeof item === 'object' && item !== null) {
                          const translatedItem = { ...item };
                          // Keys to translate
                          const keysToTranslate = ['heading', 'subHeading', 'description', 'title', 'text', 'content', 'buttonText'];
                          
                          for (const key of keysToTranslate) {
                            if (translatedItem[key] && typeof translatedItem[key] === 'string') {
                              translatedItem[key] = await translateText(translatedItem[key], targetLanguage);
                            }
                          }
                          return translatedItem;
                        } else if (typeof item === 'string') {
                          return await translateText(item, targetLanguage);
                        }
                        return item;
                      }));
                      return { ...field, value: JSON.stringify(translatedArray) };
                    } else if (typeof parsedValue === 'object' && parsedValue !== null) {
                      // Translate single object
                      const translatedObj = { ...parsedValue };
                      const keysToTranslate = ['heading', 'subHeading', 'description', 'title', 'text', 'content', 'buttonText'];
                      
                      for (const key of keysToTranslate) {
                        if (translatedObj[key] && typeof translatedObj[key] === 'string') {
                          translatedObj[key] = await translateText(translatedObj[key], targetLanguage);
                        }
                      }
                      return { ...field, value: JSON.stringify(translatedObj) };
                    }
                  } catch (e) {
                    // Not valid JSON, fall through to text translation
                    console.warn(`Failed to parse/translate JSON field ${field.name}`, e);
                  }
                }

                // Handle standard Text/Rich Text fields
                if (field.field_type === 'text' || field.field_type === 'rich_text') {
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
      } else {
        setContent(null);
        setError(null); // Don't show error if content doesn't exist yet
      }
    } catch (error: any) {
      // Handle 404 gracefully - content might not exist yet
      if (error.response?.status === 404) {
        setContent(null);
        setError(null);
      } else {
        setError(error.message || 'Failed to fetch content');
      }
    } finally {
      setLoading(false);
    }
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