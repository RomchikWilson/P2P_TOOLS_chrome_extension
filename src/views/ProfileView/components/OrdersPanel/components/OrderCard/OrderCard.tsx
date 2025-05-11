import React, { useState, useRef } from "react";
import styles from "./OrderCard.module.css";
import { FiatType, OrderStatus } from "../../../../../../enums";
import CreateIcon from "../../../../../../assets/icons/create.png";
import { ActiveOrderData } from "../../../../../../types/profileTypes";
import { roundToHundredths } from "../../../../../../utils";
import { useNavigate } from "react-router-dom";
import { EXCHANGE_CONFIG } from "../../../../../../configs/exchanges";
import CopyableBlock from "../../../../../components/CopyableBlock/CopyableBlock";

const OrderCard: React.FC<ActiveOrderData> = ({ 
    id, 
    exchange, 
    currentProgress, 
    totalProgress, 
    status 
}) => {
    const navigate = useNavigate();
    
    const [isHovered, setIsHovered] = useState(false);
    const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const due = roundToHundredths(totalProgress - currentProgress);

    // @ts-ignore
    const handlePointerEnter = () => {
        if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
        hoverTimeout.current = setTimeout(() => {
            setIsHovered(true);
        }, 1300);
    };

    // @ts-ignore
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

    const onAddNewExecution = () => {
        navigate(`/orders/${id}/new-execution`);
    }

    return (
        <div className={styles.card} 
            onClick={onClickCard}
            // onPointerEnter={handlePointerEnter} 
            // onPointerLeave={handlePointerLeave}
            >
            <div
                className={`${styles.imageOverlay} ${isHovered ? styles.visible : ""}`}
                style={{ backgroundImage: `url(${EXCHANGE_CONFIG[exchange].icon})` }}
            />
            <div className={styles.overlay}/>
            <div className={`${styles.content} ${isHovered ? styles.moveDown : ""}`}>
                <div className={styles.topBlock}>
                    <button className={styles.addBtn} disabled={status === OrderStatus.PENDING}>
                        <img src={CreateIcon} alt={'Add new execution'} className={styles.btnIcon} onClick={onAddNewExecution} />
                    </button>
                    <div className={styles.progressBar}>
                        <div className={styles.progressFill} style={{ width: `${(currentProgress / totalProgress) * 100}%` }} />
                    </div>
                </div>
                <div className={styles.infoBlock} >
                    <div className={styles.parametersBlock}>
                        <div className={styles.parameter}>
                            <CopyableBlock copyableValue={due}>
                                <div className={styles.due}>
                                    <span>Due:</span>
                                    <span>{due}{FiatType.UAH}</span>
                                </div>
                            </CopyableBlock>
                        </div>
                        
                        <div className={styles.parameter}>
                            <CopyableBlock copyableValue={totalProgress}>
                                <div className={styles.total}>
                                    <span>Total:</span>
                                    <span>{totalProgress}{FiatType.UAH}</span>
                                </div>
                            </CopyableBlock>
                        </div>
                    </div>
                    <div className={styles.id}>ID: {id}</div>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;