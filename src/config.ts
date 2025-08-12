// Configuración de la aplicación
export const config = {
  google: {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
  }
};

// Verificar configuración
export const isGoogleConfigured = () => {
  const clientId = config.google.clientId;
  const isConfigured = clientId && clientId !== 'your_google_client_id_here' && clientId.length > 0;
  return isConfigured;
};

// Mensajes de error
export const getErrorMessage = () => {
  if (!config.google.clientId) {
    return 'Google Client ID no está configurado. Por favor, crea un archivo .env con VITE_GOOGLE_CLIENT_ID=tu_client_id';
  }
  
  if (config.google.clientId === 'your_google_client_id_here') {
    return 'Google Client ID no está configurado correctamente. Por favor, reemplaza "your_google_client_id_here" con tu Client ID real.';
  }
  
  return 'Error desconocido en la configuración de Google.';
};
