import Header from "../components/Header/Header";
import styles from "./OrderView.module.css";

const OrderView = () => {
    return (
        <div className={styles.base}>
            <Header text="New order" showBackBtn={true}/>
            <div className={styles.main_container}>
                lolololo
            </div>
        </div>
    );
};

export default OrderView;