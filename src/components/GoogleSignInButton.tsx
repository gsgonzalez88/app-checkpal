import { useEffect, useRef } from 'react';
import { config, isGoogleConfigured } from '../config';

interface GoogleSignInButtonProps {
  onSuccess: (credentialResponse: any) => void;
  onError?: (error: any) => void;
}

const GoogleSignInButton = ({ onSuccess, onError }: GoogleSignInButtonProps) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const googleInitialized = useRef(false);

  useEffect(() => {
    const initializeGoogle = () => {
      if (typeof window !== 'undefined' && window.google?.accounts?.id && !googleInitialized.current) {
        
        if (!isGoogleConfigured()) {
          onError?.('Google Client ID not configured');
          return;
        }
        
        try {
          window.google.accounts.id.initialize({
            client_id: config.google.clientId,
            callback: onSuccess,
          });
          
          if (buttonRef.current) {
            window.google.accounts.id.renderButton(buttonRef.current, {
              theme: 'outline',
              size: 'large',
              text: 'signin_with',
              shape: 'rectangular',
            });
          }
          
          googleInitialized.current = true;
        } catch (error) {
          onError?.(error);
        }
      } else if (!window.google?.accounts?.id) {
        setTimeout(initializeGoogle, 100);
      }
    };

    initializeGoogle();
  }, [onSuccess, onError]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div ref={buttonRef} className="google-signin-button"></div>
    </div>
  );
};

export default GoogleSignInButton;
