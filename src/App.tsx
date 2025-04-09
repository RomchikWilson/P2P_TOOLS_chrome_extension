import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import ProfileView from "./views/ProfileView/ProfileView";
import LoginView from "./views/LoginView/LoginView";
import LoadingView from "./views/LoadingView/LoadingView";

const App = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <LoadingView />;

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? <ProfileView /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/" replace /> : <LoginView />
        }
      />
      <Route
        path="*"
        element={<div style={{ padding: 40 }}>404 – путь не найден</div>}
      />
    </Routes>
  );
};

export default App;