import React from "react";
import styles from "./InfoBlock.module.css";

const InfoBlock: React.FC = () => {
    const userData = {
        name: "Иван Иванов",
        email: "ivan@example.com",
        balance: "15 000 ₽",
    };

    const details = [
        { label: "For today", value: "200 UDST" },
        { label: "For current month", value: "1432 UDST" },
    ];

    return (
        <div className={styles.infoBlock}>
            <div className={styles.details}>
                {details.map((item, index) => (
                    <div key={index} className={styles.detailItem}>
                        <span>{item.label}:</span> <span>{item.value}</span>
                    </div>
                ))}
            </div>
            <div className={styles.actions}>
                <div className={styles.inputField}>{userData.name}</div>
                <div className={styles.inputField}>{userData.email}</div>
                <div className={styles.inputField}>{userData.balance}</div>
            </div>
        </div>
    );
};

export default InfoBlock;