import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./views/Login/Login";
import Dashboard from "./views/Dashboard/Dashboard";
import Loading from "./views/Loading/Loading";

const API_URL = "http://localhost:8000";

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(`${API_URL}/auth-status/`, {
                    withCredentials: true,
                });

                setIsAuthenticated(response.data.authenticated);
            } catch (error) {
                console.error("Ошибка проверки токена:", error);
                setIsAuthenticated(false);
            }
        };
        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return <Loading />;
    }

    return (
        <div>
            {isAuthenticated ? <Dashboard /> : <Login onLoginSuccess={() => setIsAuthenticated(true)} />}
        </div>
    );
    // return <Dashboard />;
};

export default App;