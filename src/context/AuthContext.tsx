import { createContext, useContext, useState, useEffect } from "react";
import { checkAuth, loginUser, logout } from "../api";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      const result = await checkAuth();
      setIsAuthenticated(result);
      setLoading(false);
    };
    verify();
  }, []);

  const login = async (username: string, password: string) => {
    const success = await loginUser(username, password);
    if (success) setIsAuthenticated(true);
    return success;
  };

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, login, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
