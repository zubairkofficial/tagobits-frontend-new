import { useState, useEffect } from 'react';
import { 
  CookieType, 
  CookieSettings, 
  getCookieSettings, 
  saveCookieSettings, 
  isCookieEnabled, 
  hasMadeCookieChoice 
} from '../utils/cookieManager';

interface UseCookieConsentResult {
  // Settings and status
  settings: CookieSettings;
  hasConsented: boolean;
  
  // Methods
  updateSettings: (newSettings: Partial<CookieSettings>) => void;
  resetConsent: () => void;
  isEnabled: (type: CookieType) => boolean;
  
  // Show consent modal 
  openConsentModal: () => void;
}

// Event names for cookie settings changes
const COOKIE_SETTINGS_CHANGE = 'cookie-settings-change';
const COOKIE_MODAL_OPEN = 'cookie-modal-open';

export const useCookieConsent = (): UseCookieConsentResult => {
  const [settings, setSettings] = useState<CookieSettings>(getCookieSettings());
  const [hasConsented, setHasConsented] = useState<boolean>(hasMadeCookieChoice());

  // Listen for settings changes (for multiple components using this hook)
  useEffect(() => {
    const handleSettingsChange = () => {
      setSettings(getCookieSettings());
      setHasConsented(hasMadeCookieChoice());
    };

    window.addEventListener(COOKIE_SETTINGS_CHANGE, handleSettingsChange);
    return () => {
      window.removeEventListener(COOKIE_SETTINGS_CHANGE, handleSettingsChange);
    };
  }, []);

  // Update cookie settings
  const updateSettings = (newSettings: Partial<CookieSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    saveCookieSettings(updatedSettings);
    setSettings(updatedSettings);
    setHasConsented(true);
    
    // Dispatch event to update other components using this hook
    window.dispatchEvent(new Event(COOKIE_SETTINGS_CHANGE));
  };

  // Reset cookie consent (will show the banner again)
  const resetConsent = () => {
    localStorage.removeItem('cookiesAccepted');
    localStorage.removeItem('cookieSettings');
    setHasConsented(false);
    setSettings(getCookieSettings());
    
    // Dispatch event to update other components using this hook
    window.dispatchEvent(new Event(COOKIE_SETTINGS_CHANGE));
  };

  // Check if a specific cookie type is enabled
  const isEnabled = (type: CookieType): boolean => {
    return isCookieEnabled(type);
  };

  // Open the cookie consent modal
  const openConsentModal = () => {
    window.dispatchEvent(new Event(COOKIE_MODAL_OPEN));
  };

  return {
    settings,
    hasConsented,
    updateSettings,
    resetConsent,
    isEnabled,
    openConsentModal
  };
};

// Export the event name for the CookieConsent component to listen to
export const COOKIE_CONSENT_EVENTS = {
  SETTINGS_CHANGE: COOKIE_SETTINGS_CHANGE,
  MODAL_OPEN: COOKIE_MODAL_OPEN
}; 