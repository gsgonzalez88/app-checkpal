import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { config, isGoogleConfigured, getErrorMessage } from '../config';
import GoogleSignInButton from '../components/GoogleSignInButton';

const Home = () => {
  const googleInitialized = useRef(false);
  const navigate = useNavigate();
  const [showAlternativeButton, setShowAlternativeButton] = useState(false);

  const handleGoogleSuccess = (credentialResponse: any) => {
    console.log('=== GOOGLE LOGIN SUCCESS ===');
    console.log('Full response:', credentialResponse);
    
    try {
      if (!credentialResponse.credential) {
        console.error('❌ No credential received in response');
        console.log('Response keys:', Object.keys(credentialResponse));
        alert('Authentication failed: No credential received. Please try again.');
        return;
      }

      console.log('✅ Credential received, decoding...');
      const decoded = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
      console.log('✅ Decoded user info:', decoded);
      
      // Verificar que tenemos la información necesaria
      if (!decoded.name || !decoded.email) {
        console.error('❌ Missing user information in decoded token');
        console.log('Available fields:', Object.keys(decoded));
        alert('Authentication failed: Missing user information.');
        return;
      }
      
      console.log('✅ User info validated, saving to localStorage...');
      // Guardar información del usuario en localStorage
      const userInfo = {
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture
      };
      localStorage.setItem('checkpal_user', JSON.stringify(userInfo));
      console.log('✅ User info saved to localStorage');
      
      console.log('✅ Redirecting to /start...');
      // Redirigir a la página de bienvenida
      navigate('/start');
    } catch (error) {
      console.error('❌ Error during login process:', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : 'No stack trace'
      });
      alert(`Error during login: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
    }
  };

  useEffect(() => {
    const initializeGoogle = () => {
      console.log('🔄 Attempting to initialize Google...');
      console.log('Window object:', typeof window !== 'undefined');
      console.log('Google object:', window.google);
      console.log('Google accounts:', window.google?.accounts);
      console.log('Google accounts id:', window.google?.accounts?.id);
      console.log('Already initialized:', googleInitialized.current);
      
      if (typeof window !== 'undefined' && window.google?.accounts?.id && !googleInitialized.current) {
        console.log('✅ Google Identity Services found, initializing...');
        
        if (!isGoogleConfigured()) {
          console.error('❌ Google Client ID not configured');
          alert(getErrorMessage());
          return;
        }
        
        console.log('✅ Client ID configured, initializing Google...');
        console.log('Client ID:', config.google.clientId);
        
        try {
          window.google.accounts.id.initialize({
            client_id: config.google.clientId,
            callback: handleGoogleSuccess,
          });
          
          googleInitialized.current = true;
          console.log('✅ Google Identity Services initialized successfully');
        } catch (error) {
          console.error('❌ Error initializing Google:', error);
          alert('Error initializing Google services. Please refresh the page.');
        }
      } else if (!window.google?.accounts?.id) {
        console.log('⏳ Google services not loaded yet, retrying in 100ms...');
        setTimeout(initializeGoogle, 100);
      } else if (googleInitialized.current) {
        console.log('✅ Google already initialized');
      }
    };

    initializeGoogle();
  }, []);

  const handleLockClick = () => {
    setShowAlternativeButton(!showAlternativeButton);
  };

  const handleGoogleError = (error: any) => {
    console.error('❌ Google Sign-In error:', error);
    alert('Error con Google Sign-In. Por favor, intenta de nuevo.');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <div className="flex items-center gap-3">
          <h1 className="text-green-500 text-4xl font-bold">Checkpal</h1>
          <div 
            onClick={handleLockClick}
            className="group cursor-pointer transform transition-transform duration-300 hover:scale-125"
            title="Click to unlock with Google"
          >
            {/* Locked icon (default) */}
            <svg 
              className="w-10 h-10 text-green-500 group-hover:hidden transition-all duration-300" 
              fill="currentColor" 
              viewBox="0 0 20 20" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                fillRule="evenodd" 
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" 
                clipRule="evenodd" 
              />
            </svg>
            {/* Unlocked icon (on hover) */}
            <svg 
              className="w-10 h-10 text-green-500 hidden group-hover:block transition-all duration-300" 
              fill="currentColor" 
              viewBox="0 0 20 20" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z"
              />
            </svg>
          </div>
        </div>
                
        {/* Google Sign-In Button */}
        {showAlternativeButton && (
          <div className="mt-8">
            <GoogleSignInButton 
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
