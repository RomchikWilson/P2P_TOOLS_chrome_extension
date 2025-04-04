import React, { useEffect, useRef, useState } from "react";
import styles from "./BuyOrdersPanel.module.css";
import CreateIcon from "../../../../../../assets/icons/create.png";
import BuyOrderCard from "./components/BuyOrderCard/BuyOrderCard.tsx";
import { ActiveOrder, getProfileData } from "../../../../../../api.ts";
import { CRYPTO_EXCHANGES } from "../../../../../../constants.ts";

const BuyOrdersPanel: React.FC = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleScroll = (event: React.WheelEvent) => {
        if (scrollContainerRef.current) {
            event.preventDefault();
            scrollContainerRef.current.scrollLeft -= event.deltaY * 3;
        }
    };

    const [userInfo, setUserInfo] = useState<{ full_name: string } | null>(null);
    const [lastMonth, setLastMonth] = useState<{ income: number; loss: number } | null>(null);
    const [activeOrders, setActiveOrders] = useState<ActiveOrder[]>([]);

    useEffect(() => {
        const fetchProfile = async () => {
          const data = await getProfileData();
          if (data) {
            setUserInfo(data.userInfo);
            setLastMonth(data.lastMonthResult);
            setActiveOrders(data.activeOrders);
          }
        };
    
        fetchProfile();
      }, []);

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
                        <BuyOrderCard 
                            id={order.id}
                            exchangeType={CRYPTO_EXCHANGES[order.exchangeType]}
                            currentProgress={order.currentProgress}
                            totalProgress={order.totalProgress}
                         />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BuyOrdersPanel;