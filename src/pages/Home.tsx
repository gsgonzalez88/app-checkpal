import { useEffect, useRef } from 'react';

const Home = () => {
  const googleInitialized = useRef(false);

  useEffect(() => {
    const initializeGoogle = () => {
      if (typeof window !== 'undefined' && window.google?.accounts?.id && !googleInitialized.current) {
        console.log('Initializing Google Identity Services');
        
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID ,
          callback: handleGoogleSuccess,
        });
        
        googleInitialized.current = true;
      } else if (!window.google?.accounts?.id) {
        setTimeout(initializeGoogle, 100);
      }
    };

    initializeGoogle();
  }, []);

  const handleGoogleSuccess = (credentialResponse: any) => {
    console.log('Login Success:', credentialResponse);
    
    try {
      const decoded = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
      console.log('User Info:', decoded);
      alert(`🔓 Welcome ${decoded.name}! You've unlocked Checkpal with ${decoded.email}`);
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  };

  const handleLockClick = () => {
    if (window.google?.accounts?.id) {
      console.log('Triggering Google login from lock icon');
      window.google.accounts.id.prompt();
    } else {
      alert('Google services not loaded. Please refresh the page and try again.');
    }
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
        
        <div className="text-green-400 text-sm opacity-75 mt-4">
          Click the lock to sign in with Google
        </div>
      </div>
    </div>
  );
};

export default Home;
