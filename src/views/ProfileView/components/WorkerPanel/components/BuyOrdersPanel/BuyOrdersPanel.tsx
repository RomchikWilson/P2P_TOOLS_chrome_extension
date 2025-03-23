import React, { useRef } from "react";
import styles from "./BuyOrdersPanel.module.css";
import CreateIcon from "../../../../../../assets/icons/create.png";
import BuyOrderCard from "./components/BuyOrderCard/BuyOrderCard.tsx";
import { CRYPTO_EXCHANGES } from "../../../../../../constants.ts";

const BuyOrdersPanel: React.FC = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleScroll = (event: React.WheelEvent) => {
        if (scrollContainerRef.current) {
            event.preventDefault();
            scrollContainerRef.current.scrollLeft -= event.deltaY * 3;
        }
    };

    const exchanges = Object.values(CRYPTO_EXCHANGES);
    const items = Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        cryptoExchange: exchanges[Math.floor(Math.random() * exchanges.length)],
        currentProgress: 456856.24,
        totalProgress: 923203.89,
    }));

    return (
        <div className={styles.buyOrdersPanel}>
            <div className={styles.panelHeader}>
                <button className={styles.addBtn}>
                    <img src={CreateIcon} alt={'Create new order'} className={styles.btnIcon} />
                </button>
                <div className={styles.title}>Active orders</div>
                <button className={styles.showAllBtn}>Show all</button>
            </div>
            {items.length === 0 ? (
                <div className={styles.emptyCardsContainer}>No orders</div>
            ) : (
                <div
                    className={styles.cardsContainer}
                    ref={scrollContainerRef}
                    onWheel={handleScroll}
                >
                    {items.map((item) => (
                        <BuyOrderCard key={item.id} {...item} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BuyOrdersPanel;