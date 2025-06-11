import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function Layout({ children }) {
  const { isAuth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-text">
      <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-extrabold text-brand-400">
            My Blog
          </Link>
          <nav className="space-x-4">
            {isAuth ? (
              <>
                <Link to="/create" className="btn btn-primary">
                  New Post
                </Link>
                <button onClick={handleLogout} className="btn btn-secondary">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-primary">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-secondary">
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="relative z-10 flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-background/80 text-sm text-gray-400">
        <div className="container mx-auto px-6 py-4 text-center">
          © {new Date().getFullYear()} My Blog
        </div>
      </footer>
    </div>
  );
}
