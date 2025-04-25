import { useEffect, useState } from "react";
import { COIN_CURRENCY, CRYPTO_EXCHANGES, FIAT_CURRENCY } from "../../constants";
import Header from "../components/HeaderBlock/HeaderBlock";
import RoundedNumberInput from "../components/RoundedNumberInput/RoundedNumberInput";
import styles from "./OrderView.module.css";
import { AdjustmentData, ExecutionData, OrderData } from "../../types/ordersTypes";
import { fetchOrderData } from "../../api/ordersAPI";
import CustomSelect, { Option } from "../components/CustomSelect/CustomSelect";
import { ColumnConfig } from "../components/Table/Table";
import FooterBlock from "./components/Footer/FooterBlock";
import { useParams } from "react-router-dom";
import TableWithToolbar from "./components/TableWithToolbar/TableWithToolbar";
import ViewWrapper from "../components/ViewWrapper/ViewWrapper";
import ContentBlock from "../components/ContentBlock/ContentBlock";

const OrderView: React.FC = () => {
    const { id } = useParams();
    const [isNew, setIsNew] = useState(false);
    const [orderData, setOrderData] = useState<OrderData>({
        price: 0,
        fiatType: "" as keyof typeof FIAT_CURRENCY,
        fiatAmount: 0,
        coinType: "" as keyof typeof COIN_CURRENCY,
        coinAmount: 0,
        exchange: "" as keyof typeof CRYPTO_EXCHANGES,
        executions: [],
        adjustments: [],
    });

    const handleChange = <K extends keyof OrderData>(key: K, value: OrderData[K]) => {
        setOrderData((prev) => ({ ...prev, [key]: value }));
    };

    const exchangeOptions: Option[] = Object.keys(CRYPTO_EXCHANGES).map((key) => ({
        value: key,
        label: key.toUpperCase(),
    }));

    const coinOptions: Option[] = Object.entries(COIN_CURRENCY).map(([key, value]) => ({
        value: key,
        label: `${value}`,
    }));

    const fiatOptions: Option[] = Object.entries(FIAT_CURRENCY).map(([key, symbol]) => ({
        value: key,
        label: `${key.toUpperCase()} (${symbol})`,
    }));

    const executionTableColumns: ColumnConfig<ExecutionData>[] = [
        { key: "id", label: "ID" },
        { key: "status", label: "Status" },
        { key: "exchange", label: "Exchange" },
        { key: "fiatAmount", label: "Fiat" },
        { key: "coinAmount", label: "Coins" },
        { key: "price", label: "Price" },
    ];

    const adjustmentTableColumns: ColumnConfig<AdjustmentData>[] = [
        { key: "id", label: "ID" },
        { key: "type", label: "Type" },
        { key: "status", label: "Status" },
        { key: "coinAmount", label: "Coins" },
        { key: "comment", label: "Comment" },
    ];

    useEffect(() => {
        const fetchOrder = async (numericId: number) => {    
            const data = await fetchOrderData(numericId);
            console.log(data);
            if (data) { 
                setIsNew(false);
                setOrderData(data);
                return;
            }
            setIsNew(true);
        };
    
        if (id) {
            const numericId = parseInt(id!, 10);
            if (isNaN(numericId)) {
                console.error("Invalid order ID");
                setIsNew(true);
                return;
            }

            fetchOrder(numericId);
        } else {
            setIsNew(true);
        }
    }, [id]);

    return (
        <ViewWrapper>
            <Header text={isNew ? "New order" : `Order: ${id}`} />
            <ContentBlock>
                <div className={styles.mainContainer}>
                    <div className={styles.formGrid}>
                        <div className={styles.formField}>
                            <label>Exchange</label>
                            <CustomSelect
                                value={orderData.exchange}
                                options={exchangeOptions}
                                needEmptyOption
                                isEmptyOptionHidden
                                required
                                onChange={(val) =>
                                    handleChange("exchange", val as keyof typeof CRYPTO_EXCHANGES)
                                }
                            />
                        </div>
        
                        <div className={styles.formField}>
                            <label>Price</label>
                            <RoundedNumberInput
                                value={orderData.price}
                                decimalPlaces={2}
                                required
                                onChange={(val) => handleChange("price", val)}
                            />
                        </div>
            
                        <div className={styles.formField}>
                            <label>Fiat</label>
                            <CustomSelect
                                value={orderData.fiatType}
                                options={fiatOptions}
                                needEmptyOption
                                isEmptyOptionHidden
                                required
                                onChange={(val) =>
                                    handleChange("fiatType", val as keyof typeof FIAT_CURRENCY)
                                }
                            />
                        </div>
            
                        <div className={styles.formField}>
                            <label>Fiat amount</label>
                            <RoundedNumberInput
                                value={orderData.fiatAmount}
                                decimalPlaces={2}
                                required
                                onChange={(val) => handleChange("fiatAmount", val)}
                            />
                        </div>
            
                        <div className={styles.formField}>
                            <label>Coin</label>
                            <CustomSelect
                                value={orderData.coinType}
                                options={coinOptions}
                                needEmptyOption
                                isEmptyOptionHidden
                                required
                                onChange={(val) =>
                                    handleChange("coinType", val as keyof typeof COIN_CURRENCY)
                                }
                            />
                        </div>
            
                        <div className={styles.formField}>
                            <label>Coin amount</label>
                            <RoundedNumberInput
                                value={orderData.coinAmount}
                                decimalPlaces={5}
                                required
                                onChange={(val) => handleChange("coinAmount", val)}
                            />
                        </div>
                    </div>
                </div>
                <TableWithToolbar
                    title="Executions"
                    data={orderData.executions}
                    columns={executionTableColumns}
                    tableMaxHeight={230}
                />
                <TableWithToolbar
                    title="Adjustments"
                    data={orderData.adjustments}
                    columns={adjustmentTableColumns}
                    tableMaxHeight={150}
                />
            </ContentBlock>
            <FooterBlock orderData={orderData} isNew={isNew} />
        </ViewWrapper>
    );
      
};

export default OrderView;