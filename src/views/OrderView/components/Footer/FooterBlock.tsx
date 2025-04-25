import React from "react";
import styles from "./FooterBlock.module.css";
import { NewOrder, OrderData } from "../../../../types/ordersTypes";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../../../api/ordersAPI";

interface Props {
    orderData: OrderData;
    isNew: boolean;
}

const FooterBlock: React.FC<Props> = ({ orderData, isNew }) => {
    const navigate = useNavigate();
  
    const handleCreate = async () => {
        const { exchange, price, fiatType, fiatAmount, coinType, coinAmount } = orderData;
    
        if (!exchange || !price || !fiatType || !fiatAmount || !coinType || !coinAmount) {
            alert("Пожалуйста, заполните все поля.");
            return;
        }
        
        const payload: NewOrder = {
            exchange,
            price,
            fiatAmount,
            coinAmount,
        };

        const createdOrder = await createOrder(payload);
    
        if (createdOrder) {
            navigate("/");
            alert("Order created!");
        } else {
            alert("Failed to create order.");
        }
    };
  
    const handleSave = async () => {
        alert("Order updated!");
    };
  
    return (
        <div className={styles.footer}>
            {isNew ? (
            <button className={styles.createBtn} onClick={handleCreate}>
                Create
            </button>
            ) : (
            <button className={styles.saveBtn} onClick={handleSave}>
                Save
            </button>
            )}
        </div>
    );
};
  
export default FooterBlock;