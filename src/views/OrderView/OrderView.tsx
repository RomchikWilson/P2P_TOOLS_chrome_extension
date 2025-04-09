// import { useAuth } from "../../context/AuthContext";
import Header from "../components/Header/Header";
import styles from "./Login.module.css";
// import { useState } from "react";

const OrderView = () => {
    // const { login } = useAuth();
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");

    // const handleLogin = async () => {
    //     const success = await login(username, password);
    //     if (!success) alert("Неверный логин/пароль");
    // };

    return (
        <div className={styles.base}>
            <Header text="New order" />
            <div className={styles.main_container}>
                lolololo
            </div>
        </div>
    );
};

export default OrderView;