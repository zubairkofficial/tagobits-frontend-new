import { useEffect, useRef } from 'react';

const ReCaptcha = ({ onVerify }) => {
  const recaptchaRef = useRef(null);
  const widgetIdRef = useRef(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Check if script is already loaded
    if (window.grecaptcha && recaptchaRef.current && !widgetIdRef.current) {
      widgetIdRef.current = window.grecaptcha.render(recaptchaRef.current, {
        sitekey: '6LeXF00rAAAAAPoXZnLmnr7qc_4G90m78hvfDbDv',
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
          if (window.grecaptcha && recaptchaRef.current && !widgetIdRef.current) {
            widgetIdRef.current = window.grecaptcha.render(recaptchaRef.current, {
              sitekey: '6LeXF00rAAAAAPoXZnLmnr7qc_4G90m78hvfDbDv',
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
          }
        };
      } else {
        scriptLoadedRef.current = true;
        // Script already exists, wait a bit and render
        setTimeout(() => {
          if (window.grecaptcha && recaptchaRef.current && !widgetIdRef.current) {
            widgetIdRef.current = window.grecaptcha.render(recaptchaRef.current, {
              sitekey: '6LeXF00rAAAAAPoXZnLmnr7qc_4G90m78hvfDbDv',
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
          }
        }, 100);
      }
    }

    return () => {
      // Cleanup
      if (widgetIdRef.current && window.grecaptcha) {
        try {
          window.grecaptcha.reset(widgetIdRef.current);
        } catch (e) {
          console.error('Error resetting reCAPTCHA:', e);
        }
      }
    };
  }, [onVerify]);

  return <div ref={recaptchaRef}></div>;
};

export default ReCaptcha;

