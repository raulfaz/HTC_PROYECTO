export const environment = {
    production: false,
    // Verifica si window está definido para evitar errores en SSR
    apiUrl: typeof window !== 'undefined' 
      ? `http://${window.location.hostname}:3001/api` 
      : 'http://localhost:3001/api'  // Valor por defecto para el entorno del servidor
  };
  