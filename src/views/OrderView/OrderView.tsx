import { useState } from "react";
import { COIN_CURRENCY, CRYPTO_EXCHANGES, FIAT_CURRENCY } from "../../constants";
import Header from "../components/Header/Header";
import RoundedNumberInput from "../components/RoundedNumberInput/RoundedNumberInput";
import styles from "./OrderView.module.css";
import { NewOrder } from "../../types/ordersTypes";
import { createOrder } from "../../api/ordersAPI";
import { useNavigate } from "react-router-dom";
import CustomSelect from "../components/CustomSelect/CustomSelect";

const OrderView = () => {
    const navigate = useNavigate();

    const [exchange, setExchange] = useState("");
    const [price, setPrice] = useState("");
    const [fiat, setFiat] = useState("");
    const [fiatAmount, setFiatAmount] = useState("");
    const [coin, setCoin] = useState("");
    const [coinAmount, setCoinAmount] = useState("");

    const exchangeOptions = Object.keys(CRYPTO_EXCHANGES).map((key) => ({
        value: key,
        label: key.toUpperCase(),
    }));

    const coinOptions = Object.entries(COIN_CURRENCY).map(([key, value]) => ({
        value: key,
        label: `${value}`,
    }));

    const fiatOptions = Object.entries(FIAT_CURRENCY).map(([key, symbol]) => ({
        value: key,
        label: `${key.toUpperCase()} (${symbol})`,
    }));

    const handleSubmit = async () => {
        console.log(exchange, price, fiat, fiatAmount, coin, coinAmount);
        if (!exchange || !price || !fiat || !fiatAmount || !coin || !coinAmount) {
            alert("Пожалуйста, заполните все поля.");
            return;
        }

        const payload: NewOrder = {
            exchangeType: exchange as keyof typeof CRYPTO_EXCHANGES,
            price: parseFloat(price),
            fiatAmount: parseFloat(fiatAmount),
            coinAmount: parseFloat(coinAmount),
        };
      
        const createdOrder = await createOrder(
            payload
        );
        
        console.log(createdOrder);

        if (createdOrder) {
            navigate('/');
            alert("Order created successfully!");
        } else {
            alert("Failed to create order.");
        }
    };

    return (
        <div className={styles.orderView}>
            <Header text="New order" showBackBtn={true}/>
            <div className={styles.mainContainer}>
                <div className={styles.formGrid}>
                    <div className={styles.formField}>
                        <label>Exchange</label>
                        <CustomSelect value={exchange} options={exchangeOptions} needEmptyOption isEmptyOptionHidden required onChange={setExchange}/>
                    </div>

                    <div className={styles.formField}>
                        <label>Price</label>
                        <RoundedNumberInput decimalPlaces={2} required onChange={setPrice}/>
                    </div>

                    <div className={styles.formField}>
                        <label>Fiat</label>
                        <CustomSelect value={fiat} options={fiatOptions} needEmptyOption isEmptyOptionHidden required onChange={setFiat}/>
                    </div>

                    <div className={styles.formField}>
                        <label>Fiat amount</label>
                        <RoundedNumberInput decimalPlaces={2} required onChange={setFiatAmount}/>
                    </div>

                    <div className={styles.formField}>
                        <label>Coin</label>
                        <CustomSelect value={coin} options={coinOptions} needEmptyOption isEmptyOptionHidden required onChange={setCoin}/>
                    </div>

                    <div className={styles.formField}>
                        <label>Coin amount</label>
                        <RoundedNumberInput decimalPlaces={5} required onChange={setCoinAmount}/>
                    </div>
                </div>
            </div>
            <div className={styles.footer}>
                <button className={styles.createBtn} onClick={handleSubmit}>Create</button>
            </div>
        </div>
    );
};

export default OrderView;