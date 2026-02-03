import { useEffect, useRef } from 'react';

const ReCaptcha = ({ onVerify }) => {
  const recaptchaRef = useRef(null);
  const widgetIdRef = useRef(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    const renderRecaptcha = () => {
      if (window.grecaptcha && window.grecaptcha.render && recaptchaRef.current) {
        // Check if element already has reCAPTCHA rendered
        if (recaptchaRef.current.hasChildNodes()) {
          // Element already has content, skip rendering
          return;
        }

        try {
          widgetIdRef.current = window.grecaptcha.render(recaptchaRef.current, {
            sitekey: '6LfDMI8sAAAAAGKSvlMFBQA7HlCrD05H-c2Qgg8Z',
            callback: (token) => {
              onVerify(true);
            },
            'expired-callback': () => {
              onVerify(false);
            },
            'error-callback': () => {
              onVerify(false);
            },
          });
        } catch (error) {
          console.error('Error rendering reCAPTCHA:', error);
        }
      }
    };

    // Check if script is already loaded
    if (window.grecaptcha && window.grecaptcha.render) {
      renderRecaptcha();
      return;
    }

    // Load reCAPTCHA script if not already loaded
    if (!scriptLoadedRef.current) {
      const existingScript = document.querySelector('script[src*="recaptcha/api.js"]');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        scriptLoadedRef.current = true;

        script.onload = () => {
          renderRecaptcha();
        };
      } else {
        scriptLoadedRef.current = true;
        // Script already exists, wait for it to be ready
        const checkReady = setInterval(() => {
          if (window.grecaptcha && window.grecaptcha.render) {
            clearInterval(checkReady);
            renderRecaptcha();
          }
        }, 100);

        // Clear interval after 5 seconds to prevent infinite loop
        setTimeout(() => clearInterval(checkReady), 5000);
      }
    }

    return () => {
      // Cleanup - reset the widget ID reference when component unmounts
      if (widgetIdRef.current !== null && window.grecaptcha) {
        try {
          window.grecaptcha.reset(widgetIdRef.current);
        } catch (e) {
          console.error('Error resetting reCAPTCHA:', e);
        }
      }
      widgetIdRef.current = null;
    };
  }, [onVerify]);

  return <div ref={recaptchaRef}></div>;
};

export default ReCaptcha;

