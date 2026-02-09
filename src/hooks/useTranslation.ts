import { useState, useEffect, useCallback } from 'react';
import { DEFAULT_LANGUAGE, getLanguageByCode, Language } from '../constants/languages';
import { translateText, translateBatch } from '../services/translationService';

const STORAGE_KEY = 'selectedLanguage';

export const useTranslation = () => {
  const [currentLanguage, setCurrentLanguageState] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return (saved && getLanguageByCode(saved)) ? saved : DEFAULT_LANGUAGE;
  });
  const [isTranslating, setIsTranslating] = useState(false);

  // Set language and save to localStorage
  const setLanguage = useCallback(async (languageCode: string) => {
    const language = getLanguageByCode(languageCode);
    if (!language) {
      console.warn(`Invalid language code: ${languageCode}`);
      return;
    }

    // Update state immediately for instant UI update
    setCurrentLanguageState(languageCode);
    localStorage.setItem(STORAGE_KEY, languageCode);

    // Dispatch event FIRST so components can react immediately
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: languageCode } }));

    // Trigger translation of all elements on page (for non-React managed elements)
    setIsTranslating(true);
    try {
      await translatePageElements(languageCode);
    } catch (error) {
      console.error('Error translating page elements:', error);
    } finally {
      setIsTranslating(false);
    }
  }, []);

  // Sync state across all components using this hook
  useEffect(() => {
    // IP detection logic disabled by request.
    // Default language is English (from DEFAULT_LANGUAGE).
    // Language can still be changed manually via setLanguage.

    const handleLanguageChange = (event: any) => {
      const newLang = event.detail.language;
      if (newLang && newLang !== currentLanguage) {
        setCurrentLanguageState(newLang);
      }
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, [currentLanguage, setLanguage]);

  // Translate a single text
  const translate = useCallback(async (key: string, fallback: string): Promise<string> => {
    if (currentLanguage === DEFAULT_LANGUAGE) {
      return fallback;
    }

    try {
      return await translateText(fallback, currentLanguage);
    } catch (error) {
      console.error(`Translation error for key ${key}:`, error);
      return fallback;
    }
  }, [currentLanguage]);

  // Get current language object
  const getCurrentLanguage = useCallback((): Language | undefined => {
    return getLanguageByCode(currentLanguage);
  }, [currentLanguage]);

  return {
    currentLanguage,
    setLanguage,
    translate,
    getCurrentLanguage,
    isTranslating,
  };
};

/**
 * Translate all elements with data-translate-key attribute (optimized with batch translation)
 */
const translatePageElements = async (targetLanguage: string): Promise<void> => {
  const elements = document.querySelectorAll('[data-translate-key]');

  if (elements.length === 0) {
    return;
  }

  // If English, restore all original texts immediately (synchronous)
  if (targetLanguage === DEFAULT_LANGUAGE) {
    elements.forEach((element) => {
      const originalText = element.getAttribute('data-original-text');
      if (originalText) {
        element.textContent = originalText;
      } else {
        // If no original text stored, try to get it from a data attribute or keep current
        // This handles cases where original text wasn't stored initially
        const currentText = element.textContent;
        if (currentText) {
          element.setAttribute('data-original-text', currentText.trim());
        }
      }
    });
    return;
  }

  // Collect all texts to translate
  const textsToTranslate: string[] = [];
  const elementMap: Array<{ element: Element; originalText: string }> = [];

  Array.from(elements).forEach((element) => {
    let originalText = element.getAttribute('data-original-text') || '';

    if (!originalText) {
      // Store original text if not already stored
      if (element.textContent) {
        originalText = element.textContent.trim();
        element.setAttribute('data-original-text', originalText);
      }
    }

    if (!originalText) {
      return;
    }

    textsToTranslate.push(originalText);
    elementMap.push({ element, originalText });
  });

  if (textsToTranslate.length === 0) {
    return;
  }

  try {
    // Use batch translation for better performance
    const translatedTexts = await translateBatch(textsToTranslate, targetLanguage);

    // Update all elements with translated texts
    translatedTexts.forEach((translated, idx) => {
      if (elementMap[idx]) {
        elementMap[idx].element.textContent = translated;
      }
    });
  } catch (error) {
    console.error('Error in batch translation:', error);
    // Fallback to individual translations
    const fallbackPromises = elementMap.map(async ({ element, originalText }) => {
      try {
        const translated = await translateText(originalText, targetLanguage);
        element.textContent = translated;
      } catch (err) {
        console.error(`Error translating element:`, err);
      }
    });
    await Promise.all(fallbackPromises);
  }
};

