import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./views/Login/Login";
import ProfileView from "./views/ProfileView/ProfileView";
import Loading from "./views/Loading/Loading";
import {useNavigate} from "react-router-dom";

const API_URL = "https://localhost:8000";

const App: React.FC = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(`${API_URL}/auth-status/`, {
                    withCredentials: true,
                });
                setIsAuthenticated(response.data.authenticated);
                if (!response.data.authenticated) navigate("/login");
            } catch (error) {
                console.error("Ошибка проверки токена:", error);
                setIsAuthenticated(false);
                navigate("/login");
            }
        };

        checkAuth();
    }, [navigate]);

    if (isAuthenticated === null) return <Loading />;

    return <div>{isAuthenticated ? <ProfileView /> : <Login onLoginSuccess={() => setIsAuthenticated(true)} />}</div>;
};

export default App;