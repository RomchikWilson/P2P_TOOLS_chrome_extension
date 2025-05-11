import React from "react";
import styles from "./OrdersPanel.module.css";
import CreateIcon from "../../../../assets/icons/create.png";
import OrderCard from "./components/OrderCard/OrderCard.tsx";
import { ActiveOrderData } from "../../../../types/profileTypes.ts";
import { useNavigate } from "react-router-dom";
import Panel from "../../../components/Panel/Panel.tsx";
import { useScrollControl } from "../../../components/ContentBlock/ContentBlock.tsx";

interface Props {
    activeOrders: ActiveOrderData[];
}

const OrdersPanel: React.FC<Props> = ({ activeOrders }) => {
    const navigate = useNavigate();
    const { setBlockedScroll } = useScrollControl();
    
    const handleCreateOrder = () => {
        navigate('/orders/new');
    };

    const handleAllOrders = () => {
        navigate('/orders');
    };

    return (
        <Panel>
            <div className={styles.ordersPanel}>
                <div className={styles.panelHeader}>
                    <button className={styles.addBtn} onClick={handleCreateOrder}>
                        <img src={CreateIcon} alt={'Create new order'} className={styles.btnIcon}/>
                    </button>
                    <div className={styles.title}>Active orders</div>
                    <button className={styles.showAllBtn} onClick={handleAllOrders}>Show all</button>
                </div>
                {activeOrders.length === 0 ? (
                    <div className={styles.emptyCardsContainer}>No orders</div>
                ) : (
                    <div
                        className={styles.cardsContainer}
                        onTouchMove={(e) => e.preventDefault()}
                        onMouseEnter={() => setBlockedScroll(true)}
                        onMouseLeave={() => setBlockedScroll(false)}
                    >
                        {activeOrders.map((order) => (
                            <OrderCard {...order} />
                        ))}
                    </div>
                )}
            </div>
        </Panel>
    );
};

export default OrdersPanel;