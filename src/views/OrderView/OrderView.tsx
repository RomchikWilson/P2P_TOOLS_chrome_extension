import { useEffect, useState } from "react";
import { COIN_CURRENCY, CRYPTO_EXCHANGES, FIAT_CURRENCY, OPERATION_STATUSES, TRANSACTION_TYPES } from "../../constants";
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
import { deepCompare } from "../../utils/deepCompare";

const OrderView: React.FC = () => {
    const { id } = useParams();
    const [isNew, setIsNew] = useState(false);

    const [initialData, setInitialData] = useState<OrderData>({
        price: 0,
        fiatType: "" as keyof typeof FIAT_CURRENCY,
        fiatAmount: 0,
        coinType: "" as keyof typeof COIN_CURRENCY,
        coinAmount: 0,
        exchange: "" as keyof typeof CRYPTO_EXCHANGES,
        executions: [],
        adjustments: [],
    });

    const [formData, setFormData] = useState<OrderData>({
        price: 0,
        fiatType: "" as keyof typeof FIAT_CURRENCY,
        fiatAmount: 0,
        coinType: "" as keyof typeof COIN_CURRENCY,
        coinAmount: 0,
        exchange: "" as keyof typeof CRYPTO_EXCHANGES,
        executions: [],
        adjustments: [],
    });

    const coinOptions: Option[] = Object.entries(COIN_CURRENCY).map(([key, value]) => ({
        value: key,
        label: `${value}`,
    }));

    const fiatOptions: Option[] = Object.entries(FIAT_CURRENCY).map(([key, symbol]) => ({
        value: key,
        label: `${key.toUpperCase()} (${symbol})`,
    }));

    const exchangeOptions: Option[] = Object.keys(CRYPTO_EXCHANGES).map((key) => ({
        value: key,
        label: key.toUpperCase(),
    }));

    const statusOptions: Option[] = Object.entries(OPERATION_STATUSES).map(([key, value]) => ({
        value: key,
        label: `${value}`,
    }));

    const executionTableColumns: ColumnConfig<ExecutionData>[] = [
        { key: "id", label: "ID" },
        { key: "status", label: "Status", options: statusOptions },
        { key: "exchange", label: "Exchange", options: exchangeOptions },
        { key: "fiatAmount", label: "Fiat", type: "number", decimalPlaces: 2 },
        { key: "coinAmount", label: "Coins", type: "number", decimalPlaces: 3 },
        { key: "price", label: "Price", type: "number", decimalPlaces: 2 },
    ];

    const adjustmentTypeOptions: Option[] = Object.entries(TRANSACTION_TYPES).map(([key, value]) => ({
        value: key,
        label: `${key.toUpperCase()} (${value})`,
    }));

    const adjustmentTableColumns: ColumnConfig<AdjustmentData>[] = [
        { key: "id", label: "ID" },
        { key: "type", label: "Type", options: adjustmentTypeOptions },
        { key: "status", label: "Status", options: statusOptions },
        { key: "coinAmount", label: "Coins", type: "number" },
        { key: "comment", label: "Comment", type: "text" },
    ];

    const handleChange = <K extends keyof OrderData>(key: K, value: OrderData[K]) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleCellEdit = (
        rowId: string | number,
        key: keyof ExecutionData,
        value: ExecutionData[keyof ExecutionData]
        ) => {
            setFormData((prev) => {
                const updatedExecutions = prev.executions.map((item) =>
                    item.id === rowId ? { ...item, [key]: value } : item
                );
                return { ...prev, executions: updatedExecutions };
            });
        };
      
    useEffect(() => {
        console.log("formData: ", formData);
    }, [formData]);

    useEffect(() => {
        const fetchOrder = async (numericId: number) => {    
            const data = await fetchOrderData(numericId);
            console.log("initialData: ", data);
            if (data) { 
                setIsNew(false);
                setInitialData(data);
                setFormData(data);
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
                                initialValue={initialData.exchange}
                                value={formData.exchange}
                                options={exchangeOptions}
                                needEmptyOption
                                isEmptyOptionHidden
                                required
                                onChange={(val) => handleChange("exchange", val as keyof typeof CRYPTO_EXCHANGES)} />
                        </div>
        
                        <div className={styles.formField}>
                            <label>Price</label>
                            <RoundedNumberInput
                                initialValue={initialData.price}
                                value={formData.price}
                                decimalPlaces={2}
                                required
                                onChange={(val) => handleChange("price", val)} />
                        </div>
            
                        <div className={styles.formField}>
                            <label>Fiat</label>
                            <CustomSelect
                                initialValue={initialData.fiatType}
                                value={formData.fiatType}
                                options={fiatOptions}
                                needEmptyOption
                                isEmptyOptionHidden
                                required
                                onChange={(val) => handleChange("fiatType", val as keyof typeof FIAT_CURRENCY)} />
                        </div>
            
                        <div className={styles.formField}>
                            <label>Fiat amount</label>
                            <RoundedNumberInput
                                initialValue={initialData.fiatAmount}
                                value={formData.fiatAmount}
                                decimalPlaces={2}
                                required
                                onChange={(val) => handleChange("fiatAmount", val)} />
                        </div>
            
                        <div className={styles.formField}>
                            <label>Coin</label>
                            <CustomSelect
                                initialValue={initialData.coinType}
                                value={formData.coinType}
                                options={coinOptions}
                                needEmptyOption
                                isEmptyOptionHidden
                                required
                                onChange={(val) => handleChange("coinType", val as keyof typeof COIN_CURRENCY)} />
                        </div>
            
                        <div className={styles.formField}>
                            <label>Coin amount</label>
                            <RoundedNumberInput
                                initialValue={initialData.coinAmount}
                                value={formData.coinAmount}
                                decimalPlaces={5}
                                required
                                onChange={(val) => handleChange("coinAmount", val)} />
                        </div>
                    </div>
                </div>
                <TableWithToolbar
                    title="Executions"
                    initialData={initialData.executions}
                    data={formData.executions}
                    columns={executionTableColumns}
                    onCellEdit={handleCellEdit}
                    tableMaxHeight={230} />
                <TableWithToolbar
                    title="Adjustments"
                    initialData={initialData.adjustments}
                    data={formData.adjustments}
                    columns={adjustmentTableColumns}
                    tableMaxHeight={150} />
            </ContentBlock>
            <FooterBlock orderData={formData} isNew={isNew} isDataChanged={!deepCompare(initialData, formData)} />
        </ViewWrapper>
    );
};

export default OrderView;