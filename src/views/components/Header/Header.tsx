import React from "react";
import styles from "./Header.module.css";
import LogoutIcon from "../../../assets/icons/logout.png"; // Иконка выхода

interface HeaderProps {
    text: string;
    showLogoutBtn?: boolean;  // Делаем опциональным
}

const Header: React.FC<HeaderProps> = ({ text, showLogoutBtn = false }) => {
    return (
        <div className={styles.base}>
            <h2 className={styles.title}>{text}</h2>
            {showLogoutBtn && (
                <button className={styles.logout_btn} title="Выйти">
                    <img src={LogoutIcon} alt="Logout" className={styles.logoutIcon} />
                </button>
            )}
        </div>
    );
};

export default Header;