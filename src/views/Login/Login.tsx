import { useState, useEffect, useRef } from "react";
import { loginUser } from "../../api.ts";
import styles from "./Login.module.css"
import Header from "../components/Header/Header.tsx";

interface LoginProps {
    onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [buttonPos, setButtonPos] = useState({ top: "50%", left: "50%" });
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!username || !password) {
            setButtonPos({ top: "50%", left: "50%" }); // Сброс кнопки в центр
        }
    }, [username, password]);

    const handleMouseEnter = () => {
        if (!username || !password) {
            const newX = Math.random() * (window.innerWidth - 100);
            const newY = Math.random() * (window.innerHeight - 50);
            setButtonPos({ top: `${newY}px`, left: `${newX}px` });
        }
    };

    const handleLogin = async () => {
        const success = await loginUser(username, password);
        if (success) {
            onLoginSuccess();
        } else {
            alert("Ошибка входа");
        }
    };

    return (
        <div className={styles.base}>
            <Header text={"Sign Up"}/>
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
                </div>
                <div className={styles.btn_container}>
                    <button
                        ref={buttonRef}
                        onMouseEnter={handleMouseEnter}
                        onClick={handleLogin}
                        className={styles.login_btn}
                        style={{top: buttonPos.top, left: buttonPos.left}}
                        disabled={!username || !password}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;