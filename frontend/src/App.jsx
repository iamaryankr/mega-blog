// web/src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout     from './components/Layout';
import HomePage   from './pages/HomePage';
import PostPage   from './pages/PostPage';
import CreatePage from './pages/CreatePage';
import EditPage   from './pages/EditPage';
import LoginPage  from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import useAuth from './hooks/useAuth';


export default function App() {
  const isAuth = useAuth();


  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/login"
          element={isAuth ? <Navigate to="/" replace /> : <LoginPage />}
        />

        <Route path="/signup" element={<SignupPage />} />


        <Route path="/posts/:slug" element={<PostPage />} />

        <Route
          path="/create"
          element={isAuth ? <CreatePage /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/edit/:slug"
          element={isAuth ? <EditPage /> : <Navigate to="/login" replace />}
        />

        {/* Fallback for any unknown route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
