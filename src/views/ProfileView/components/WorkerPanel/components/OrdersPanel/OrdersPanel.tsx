import React, { useRef } from "react";
import styles from "./OrdersPanel.module.css";
import CreateIcon from "../../../../../../assets/icons/create.png";
import OrderCard from "./components/OrderCard/OrderCard.tsx";
import { ActiveOrderData } from "../../../../../../types/profileTypes.ts";
import { useNavigate } from "react-router-dom";

interface Props {
    activeOrders: ActiveOrderData[];
}

const OrdersPanel: React.FC<Props> = ({ activeOrders }) => {
    const navigate = useNavigate();
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleScroll = (event: React.WheelEvent) => {
        if (scrollContainerRef.current) {
            event.preventDefault();
            scrollContainerRef.current.scrollLeft -= event.deltaY * 3;
        }
    };
    
    const handleCreateOrder = () => {
        navigate('/new-order');
    };

    return (
        <div className={styles.buyOrdersPanel}>
            <div className={styles.panelHeader}>
                <button className={styles.addBtn} onClick={handleCreateOrder}>
                    <img src={CreateIcon} alt={'Create new order'} className={styles.btnIcon}/>
                </button>
                <div className={styles.title}>Active orders</div>
                <button className={styles.showAllBtn}>Show all</button>
            </div>
            {activeOrders.length === 0 ? (
                <div className={styles.emptyCardsContainer}>No orders</div>
            ) : (
                <div
                    className={styles.cardsContainer}
                    ref={scrollContainerRef}
                    onWheel={handleScroll}
                >
                    {activeOrders.map((order) => (
                        <OrderCard {...order} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrdersPanel;