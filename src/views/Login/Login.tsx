import { useAuth } from "../../context/AuthContext";
import Header from "../components/Header/Header";
import styles from "./Login.module.css";
import { useState } from "react";

const Login = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const success = await login(username, password);
        if (!success) alert("Неверный логин/пароль");
    };

    return (
        <div className={styles.base}>
            <Header text="Sign Up" />
            <div className={styles.main_container}>
                <div className={styles.input_container}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                    />
                    <button 
                        className={styles.login_btn} 
                        onClick={handleLogin} disabled={!username || !password}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;