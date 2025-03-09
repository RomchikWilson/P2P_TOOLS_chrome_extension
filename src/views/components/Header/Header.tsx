import React from "react";
import styles from "./Header.module.css";

interface HeaderProps {
    text: string;
}

const Header: React.FC<HeaderProps> = ({ text }) => {
    return (
        <div className={styles.base}>
            <h2>{text}</h2>
        </div>
    );
};

export default Header;