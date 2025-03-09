import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./views/Login/Login";
import Dashboard from "./views/Dashboard/Dashboard";

const API_URL = "http://localhost:8000";

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(`${API_URL}/auth-status/`, {
                    withCredentials: true,
                });

                if (response.data.authenticated) {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error("Ошибка проверки токена:", error);
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    return (
        <div>
            {isAuthenticated ? <Dashboard /> : <Login onLoginSuccess={() => setIsAuthenticated(true)} />}
        </div>
    );
};

export default App;