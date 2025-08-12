import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserInfo {
  name: string;
  email: string;
  picture?: string;
}

const Welcome = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si hay información del usuario en localStorage
    const userData = localStorage.getItem('checkpal_user');
    
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setUserInfo(user);
        setIsLoading(false);
      } catch (error) {
        console.error('Error parsing user data:', error);
        // Si hay error, redirigir al home
        navigate('/');
      }
    } else {
      // Si no hay datos del usuario, redirigir al home
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    // Limpiar datos del usuario
    localStorage.removeItem('checkpal_user');
    // Redirigir al home
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-green-500 text-xl">Loading...</div>
      </div>
    );
  }

  if (!userInfo) {
    return null; // El useEffect manejará la redirección
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-gray-900 rounded-lg p-8 max-w-md w-full mx-4 border border-green-500/20">
        <div className="text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <h1 className="text-green-500 text-3xl font-bold">Checkpal</h1>
            <svg 
              className="w-8 h-8 text-green-500" 
              fill="currentColor" 
              viewBox="0 0 20 20" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z"
              />
            </svg>
          </div>

          {/* Mensaje de bienvenida */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              Welcome, {userInfo.name}! 👋
            </h2>
            <p className="text-green-400 text-sm">
              You've successfully unlocked Checkpal
            </p>
          </div>

          {/* Información del usuario */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              {userInfo.picture && (
                <img 
                  src={userInfo.picture} 
                  alt={userInfo.name}
                  className="w-12 h-12 rounded-full"
                />
              )}
              <div className="text-left">
                <p className="text-white font-medium">{userInfo.name}</p>
                <p className="text-gray-400 text-sm">{userInfo.email}</p>
              </div>
            </div>
          </div>

          {/* Botón de logout */}
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2 mx-auto"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
