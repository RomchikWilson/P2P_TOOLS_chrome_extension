import React, { useState, useRef } from "react";
import styles from "./OrderCard.module.css";
import { CRYPTO_EXCHANGES, FIAT_CURRENCY } from "../../../../../../../../constants";
import CreateIcon from "../../../../../../../../assets/icons/create.png";
import { ActiveOrderData } from "../../../../../../../../types/profileTypes";
import { roundToHundredths } from "../../../../../../../../utils";

const OrderCard: React.FC<ActiveOrderData> = ({ id, exchangeType, currentProgress, totalProgress }) => {
    const exchange = CRYPTO_EXCHANGES[exchangeType];
    const due = roundToHundredths(totalProgress - currentProgress);

    const [isHovered, setIsHovered] = useState(false);
    const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleMouseEnter = () => {
        if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
        hoverTimeout.current = setTimeout(() => {
            setIsHovered(true);
        }, 1500);
    };

    const handleMouseLeave = () => {
        if (hoverTimeout.current) {
            clearTimeout(hoverTimeout.current);
            hoverTimeout.current = null;
        }
        setIsHovered(false);
    };

    return (
        <div className={styles.card} >
            <div
                className={`${styles.imageOverlay} ${isHovered ? styles.visible : ""}`}
                style={{ backgroundImage: `url(${exchange.icon})` }}
            />
            <div className={styles.overlay} />
            <div className={`${styles.content} ${isHovered ? styles.moveDown : ""}`}>
                <div className={styles.topBlock}>
                    <button className={styles.addBtn}>
                        <img src={CreateIcon} alt={'Create new order'} className={styles.btnIcon} />
                    </button>
                    <div className={styles.progressBar}>
                        <div className={styles.progressFill} style={{ width: `${(currentProgress / totalProgress) * 100}%` }} />
                    </div>
                </div>
                <div className={styles.infoBlock} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <div className={styles.parametersBlock}>
                        <div className={styles.parameterDue}>
                            Due: {due}{FIAT_CURRENCY.uah}
                        </div>
                        <div className={styles.parameterTotal}>
                            Total: {totalProgress}{FIAT_CURRENCY.uah}
                        </div>
                    </div>
                    <div className={styles.id}>ID: {id}</div>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;