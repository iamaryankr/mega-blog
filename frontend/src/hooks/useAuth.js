import { useState, useEffect } from 'react';

export default function useAuth() {
  // initialize from localStorage
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'));

  // listen for changes (e.g. after login or logout)
  useEffect(() => {
    const onStorage = () => {
      setIsAuth(!!localStorage.getItem('token'));
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return isAuth;
}
