import { useAuth } from "../../context/AuthContext";
import Header from "../components/HeaderBlock/HeaderBlock";
import ViewWrapper from "../components/ViewWrapper/ViewWrapper";
import styles from "./LoginView.module.css";
import { useState } from "react";

const LoginView = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const success = await login(username, password);
        if (!success) alert("Неверный логин/пароль");
    };

    return (
        <ViewWrapper>
            <Header text="Sign Up" disableBackBtn/>
            <div className={styles.contentBlock}>
                <div className={styles.inputContainer}>
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
                    >Login</button>
                </div>
            </div>
        </ViewWrapper>
    );
};

export default LoginView;