import React, { useState, useRef } from "react";
import styles from "./BuyOrderCard.module.css";
import {ExchangeProps, FIAT_CURRENCY} from "../../../../../../../../constants";
import CreateIcon from "../../../../../../../../assets/icons/create.png";

interface BuyOrderCardProps {
    id: number;
    exchangeType: ExchangeProps;
    currentProgress: number;
    totalProgress: number;
}

const BuyOrderCard: React.FC<BuyOrderCardProps> = ({ id, exchangeType, currentProgress, totalProgress }) => {
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
                style={{ backgroundImage: `url(${exchangeType.icon})` }}
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
                            <div className={styles.parameterName}>Due:</div>
                            <div className={styles.parameterValue}>{currentProgress}{FIAT_CURRENCY.uah}</div>
                        </div>
                        <div className={styles.parameterTotal}>
                            <div className={styles.parameterName}>Total:</div>
                            <div className={styles.parameterValue}>{totalProgress}{FIAT_CURRENCY.uah}</div>
                        </div>
                    </div>
                    <div className={styles.id}>ID: {id}</div>
                </div>
            </div>
        </div>
    );
};

export default BuyOrderCard;