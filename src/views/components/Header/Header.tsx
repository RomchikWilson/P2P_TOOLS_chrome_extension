import React from "react";
import styles from "./Header.module.css";
import LogoutIcon from "../../../assets/icons/logout.png";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

interface HeaderProps {
    text: string;
    showLogoutBtn?: boolean;  // Делаем опциональным
}

const Header: React.FC<HeaderProps> = ({ text, showLogoutBtn = false }) => {
    const navigate = useNavigate(); // Для перенаправления

    const handleLogout = async () => {
        try {
            Cookies.remove("access_token", { path: "/" });
            await axios.post("https://localhost:8000/logout", {}, { withCredentials: true });
            navigate("/login");
        } catch (error) {
            console.error("Ошибка при выходе:", error);
        }
    };

    return (
        <div className={styles.header}>
            <h2 className={styles.title}>{text}</h2>
            {showLogoutBtn && (
                <button className={styles.logout_btn} title="Выйти" onClick={handleLogout}>
                    <img src={LogoutIcon} alt="Logout" className={styles.logoutIcon} />
                </button>
            )}
        </div>
    );
};

export default Header;