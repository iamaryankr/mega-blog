import { useEffect, useState } from 'react';

export default function useAuth() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const handleStorage = () => {
      setIsAuth(!!localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return isAuth;
}
