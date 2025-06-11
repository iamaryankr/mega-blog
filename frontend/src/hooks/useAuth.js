// web/src/hooks/useAuth.js
import { useState, useEffect, useCallback } from 'react';

export default function useAuth() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'));

  // update state when localStorage changes elsewhere
  useEffect(() => {
    const onStorage = () => setIsAuth(!!localStorage.getItem('token'));
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setIsAuth(false);
  }, []);

  return { isAuth, logout };
}
