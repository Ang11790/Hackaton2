// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';

// Define el tipo de dato que devuelve el hook
interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
  logout: () => void;
}

export const useAuth = (): AuthState => {
  // Inicialmente, revisa si hay un token en localStorage
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem('token');
  });
  
  // En un proyecto real, el 'user' vendría del token decodificado
  const [user, setUser] = useState<string | null>(isAuthenticated ? 'admin' : null);

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    window.location.href = '/login'; // Redirecciona al login
  };

  useEffect(() => {
    // Aquí puedes añadir lógica para verificar la validez del token periódicamente
    // Por ahora, solo actualiza el estado si el token cambia
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    setUser(!!token ? 'admin' : null);
  }, []);

  return { isAuthenticated, user, logout };
};