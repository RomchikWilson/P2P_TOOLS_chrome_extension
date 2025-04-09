import React, { useRef } from "react";
import styles from "./BuyOrdersPanel.module.css";
import CreateIcon from "../../../../../../assets/icons/create.png";
import BuyOrderCard from "./components/BuyOrderCard/BuyOrderCard.tsx";
import { ActiveOrderData } from "../../../../../../types/profileTypes.ts";

interface Props {
    activeOrders: ActiveOrderData[];
}

const BuyOrdersPanel: React.FC<Props> = ({ activeOrders }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleScroll = (event: React.WheelEvent) => {
        if (scrollContainerRef.current) {
            event.preventDefault();
            scrollContainerRef.current.scrollLeft -= event.deltaY * 3;
        }
    };

    return (
        <div className={styles.buyOrdersPanel}>
            <div className={styles.panelHeader}>
                <button className={styles.addBtn}>
                    <img src={CreateIcon} alt={'Create new order'} className={styles.btnIcon} />
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
                        <BuyOrderCard {...order} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BuyOrdersPanel;