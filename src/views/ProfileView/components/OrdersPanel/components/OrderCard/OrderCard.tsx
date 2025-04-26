import React, { useState, useRef } from "react";
import styles from "./OrderCard.module.css";
import { CRYPTO_EXCHANGES, FIAT_CURRENCY } from "../../../../../../constants";
import CreateIcon from "../../../../../../assets/icons/create.png";
import { ActiveOrderData } from "../../../../../../types/profileTypes";
import { roundToHundredths } from "../../../../../../utils";
import { useNavigate } from "react-router-dom";

const OrderCard: React.FC<ActiveOrderData> = ({ id, exchange, currentProgress, totalProgress }) => {
    const navigate = useNavigate();
    
    const [isHovered, setIsHovered] = useState(false);
    const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const due = roundToHundredths(totalProgress - currentProgress);

    const handlePointerEnter = () => {
        if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
        hoverTimeout.current = setTimeout(() => {
            setIsHovered(true);
        }, 1500);
    };

    const handlePointerLeave = () => {
        if (hoverTimeout.current) {
            clearTimeout(hoverTimeout.current);
            hoverTimeout.current = null;
        }
        setIsHovered(false);
    };

    const onClickCard = () => {
        if (isHovered) navigate(`/orders/${id}`);
    };

    return (
        <div className={styles.card} 
            onClick={onClickCard}
            onPointerEnter={handlePointerEnter} 
            onPointerLeave={handlePointerLeave}
            >
            <div
                className={`${styles.imageOverlay} ${isHovered ? styles.visible : ""}`}
                style={{ backgroundImage: `url(${CRYPTO_EXCHANGES[exchange].icon})` }}
            />
            <div className={styles.overlay}/>
            <div className={`${styles.content} ${isHovered ? styles.moveDown : ""}`}>
                <div className={styles.topBlock}>
                    <button className={styles.addBtn}>
                        <img src={CreateIcon} alt={'Create new order'} className={styles.btnIcon} />
                    </button>
                    <div className={styles.progressBar}>
                        <div className={styles.progressFill} style={{ width: `${(currentProgress / totalProgress) * 100}%` }} />
                    </div>
                </div>
                <div className={styles.infoBlock} >
                    <div className={styles.parametersBlock}>
                        <div className={styles.parameterDue}>
                            <span>Due:</span>
                            <span>{due}{FIAT_CURRENCY.UAH}</span>
                        </div>
                        <div className={styles.parameterTotal}>
                            <span>Total:</span>
                            <span>{totalProgress}{FIAT_CURRENCY.UAH}</span>
                        </div>
                    </div>
                    <div className={styles.id}>ID: {id}</div>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;