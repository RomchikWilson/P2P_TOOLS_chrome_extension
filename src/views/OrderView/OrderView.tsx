import { useEffect, useState } from "react";
import { CoinType, Exchange, FiatType, OperationStatus, OrderStatus, TransactionType } from "../../enums";
import Header from "../components/HeaderBlock/HeaderBlock";
import RoundedNumberInput from "../components/RoundedNumberInput/RoundedNumberInput";
import styles from "./OrderView.module.css";
import { AdjustmentData, ExecutionData, FetchOrderData, UpdateOrderPayload } from "../../types/ordersTypes";
import { createOrder, fetchOrder, updateOrder } from "../../api/ordersAPI";
import CustomSelect, { Option } from "../components/CustomSelect/CustomSelect";
import { ColumnConfig } from "../components/Table/Table";
import { useNavigate, useParams } from "react-router-dom";
import TableWithToolbar from "./components/TableWithToolbar/TableWithToolbar";
import ViewWrapper from "../components/ViewWrapper/ViewWrapper";
import ContentBlock from "../components/ContentBlock/ContentBlock";
import { useLoadingData } from "../../utils/useLoadingData";
import Panel from "../components/Panel/Panel";
import { diffArrays } from "../../utils/diffArrays";
import { hasDifferences } from "../../utils/diffObjects";
import FooterBlock from "../components/FooterBlock/FooterBlock";
import NextStatusIcon from "../../assets/icons/nextStatus.png"
import Divider from "../components/Divider/Divider";
import { getNextOrderStatus } from "../../utils/ordersHelpers";

const OrderView: React.FC = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    const isNew = !id;

    const orderId = Number(id);
    const [nextOrderStatus, setNextOrderStatus] = useState<OrderStatus | null>(null);
    const { data, loading, hasError, setData } = useLoadingData(
        () => orderId ? fetchOrder(orderId) : null, `order-${orderId}`
    )
    
    const [formData, setFormData] = useState<FetchOrderData>({
        generalData: {
            status: isNew ? OrderStatus.ACTIVE : "" as keyof typeof OrderStatus,
            price: 0,
            fiatType: isNew ? FiatType.UAH : "" as keyof typeof FiatType,
            fiatAmount: 0,
            coinType: isNew ? CoinType.USDT : "" as keyof typeof CoinType,
            coinAmount: 0,
            exchange: "" as keyof typeof Exchange,
        },
        executions: [],
        adjustments: [],
    });

    // Prepare select options
    const coinOptions: Option[] = Object.entries(CoinType).map(([key]) => ({ value: key, label: key }));
    const fiatOptions: Option[] = Object.entries(FiatType).map(([key]) => ({ value: key, label: key }));
    const exchangeOptions: Option[] = Object.keys(Exchange).map((key) => ({ value: key, label: key }));
    const orderStatusOptions: Option[] = Object.keys(OrderStatus).map((key) => ({ value: key, label: key }));
    const operationStatusOptions: Option[] = Object.entries(OperationStatus).map(([key]) => ({ value: key, label: key }));
    const adjustmentTypeOptions: Option[] = Object.entries(TransactionType).map(([key]) => ({ value: key, label: key }));

    // Tables columns
    const executionTableColumns: ColumnConfig<ExecutionData>[] = [
        { key: "id", label: "ID" },
        { key: "status", label: "Status", options: operationStatusOptions },
        { key: "exchange", label: "Exchange", options: exchangeOptions },
        { key: "fiatAmount", label: "Fiat", type: "number", decimalPlaces: 2 },
        { key: "coinAmount", label: "Coins", type: "number", decimalPlaces: 3 },
        { key: "price", label: "Price", type: "number", decimalPlaces: 2 },
    ];

    const adjustmentTableColumns: ColumnConfig<AdjustmentData>[] = [
        { key: "id", label: "ID" },
        { key: "type", label: "Type", options: adjustmentTypeOptions },
        { key: "status", label: "Status", options: operationStatusOptions },
        { key: "coinAmount", label: "Coins", type: "number", decimalPlaces: 3 },
        { key: "comment", label: "Comment", type: "text" },
    ];

    // Handle form general data editing
    const handleOrderDataChange = <K extends keyof FetchOrderData["generalData"]>(key: K, value: FetchOrderData["generalData"][K]) => {
        setFormData((prev) => ({
          ...prev,
          generalData: {
            ...prev.generalData,
            [key]: value,
          }
        }));
    };
    
    // Handle table editing
    const handleExecutionCellEdit = (
        rowId: string | number,
        key: keyof ExecutionData,
        value: ExecutionData[keyof ExecutionData]
        ) => {
            setFormData((prev) => {
                const updatedExecutions = prev.executions!.map((item) =>
                    item.id === rowId ? { ...item, [key]: value } : item
                );
                return { ...prev, executions: updatedExecutions };
            });
        };

    const handleAdjustmentCellEdit = (
        rowId: string | number,
        key: keyof AdjustmentData,
        value: AdjustmentData[keyof AdjustmentData]
        ) => {
            setFormData((prev) => {
                const updatedAdjustments = prev.adjustments!.map((item) =>
                    item.id === rowId ? { ...item, [key]: value } : item
                );
                return { ...prev, adjustments: updatedAdjustments };
            });
        };
    
    // Handle execution and adjustment creating
    const onAddNewExecution = () => {
        navigate(`/orders/${id}/new-execution`);
    } 

    const onAddNewAdjustment = () => {
        navigate(`/orders/${id}/new-adjustment`);
    } 

    // Has updates
    const orderDataHasDiff = data ? hasDifferences(data.generalData, formData.generalData) : false;
    const executionsDiff = data ? diffArrays(data.executions, formData.executions) : [];
    const adjustmentsDiff = data ? diffArrays(data.adjustments, formData.adjustments) : [];

    // Handle footer button click
    const handleCreateClick = async () => {
        const { exchange, price, fiatType, fiatAmount, coinType, coinAmount } = formData.generalData;
    
        if (!exchange || !price || !fiatType || !fiatAmount || !coinType || !coinAmount) {
            alert("Пожалуйста, заполните все поля.");
            return;
        }

        if ( await createOrder(formData.generalData) ) {
            navigate("/");
        } else {
            alert("Failed to create order.");
        }
    };

    const handleSaveClick = async () => {
        const payload: UpdateOrderPayload = {
            generalData: orderDataHasDiff ? formData.generalData : undefined,
            executions: executionsDiff,
            adjustments: adjustmentsDiff,
        };

        if ( await updateOrder(id!, payload) ) {
            setData(formData);
        } else {
            alert("Not saved!");
        }
    };

    // Handle next order status changing
    const handleChangeStatusClick = async () => {
        if (nextOrderStatus) {
            setFormData((prev) => ({
                ...prev,
                generalData: {
                  ...prev.generalData,
                  ['status']: nextOrderStatus,
                }
            }));
        };
    };

    useEffect(() => {
        if (data) {
            setFormData(data);
            setNextOrderStatus(getNextOrderStatus(OrderStatus[data.generalData.status]));
        }
    }, [data]);

    return (
        <ViewWrapper loading={loading} hasError={hasError}>
            { (data || isNew) && (
                <>
                    <Header text={isNew ? "New order" : `Order: ${id}`} />
                    <ContentBlock>
                        <Panel>
                            <div className={styles.formGrid}>
                                <div className={styles.formField}>
                                    <label>Status</label>
                                    <div className={styles.statusBtns}>
                                        <CustomSelect
                                            initialValue={data?.generalData.status}
                                            value={formData.generalData.status}
                                            options={orderStatusOptions}
                                            required
                                            onChange={(val) => handleOrderDataChange("status", val as keyof typeof OrderStatus)} />
                                        <button 
                                            className={styles.nextStatus} 
                                            disabled={
                                                nextOrderStatus === null || !data  || (
                                                    formData.generalData.status !== data.generalData.status
                                                )}
                                            onClick={handleChangeStatusClick}>
                                                <img src={NextStatusIcon} alt="Next status" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <Divider type='horizontal'/>

                            <div className={styles.formGrid}>
                                <div className={styles.formField}>
                                    <label>Exchange</label>
                                    <CustomSelect
                                        initialValue={data?.generalData.exchange}
                                        value={formData.generalData.exchange}
                                        options={exchangeOptions}
                                        needEmptyOption
                                        isEmptyOptionHidden
                                        required
                                        onChange={(val) => handleOrderDataChange("exchange", val as keyof typeof Exchange)} />
                                </div>
                
                                <div className={styles.formField}>
                                    <label>Price</label>
                                    <RoundedNumberInput
                                        initialValue={data?.generalData.price}
                                        value={formData.generalData.price}
                                        decimalPlaces={2}
                                        required
                                        onChange={(val) => handleOrderDataChange("price", val)} />
                                </div>
                    
                                <div className={styles.formField}>
                                    <label>Fiat</label>
                                    <CustomSelect
                                        initialValue={data?.generalData.fiatType}
                                        value={formData.generalData.fiatType}
                                        options={fiatOptions}
                                        needEmptyOption
                                        isEmptyOptionHidden
                                        required
                                        onChange={(val) => handleOrderDataChange("fiatType", val as keyof typeof FiatType)} />
                                </div>
                    
                                <div className={styles.formField}>
                                    <label>Fiat amount</label>
                                    <RoundedNumberInput
                                        initialValue={data?.generalData.fiatAmount}
                                        value={formData.generalData.fiatAmount}
                                        decimalPlaces={2}
                                        required
                                        onChange={(val) => handleOrderDataChange("fiatAmount", val)} />
                                </div>
                    
                                <div className={styles.formField}>
                                    <label>Coin</label>
                                    <CustomSelect
                                        initialValue={data?.generalData.coinType}
                                        value={formData.generalData.coinType}
                                        options={coinOptions}
                                        needEmptyOption
                                        isEmptyOptionHidden
                                        required
                                        onChange={(val) => handleOrderDataChange("coinType", val as keyof typeof CoinType)} />
                                </div>
                    
                                <div className={styles.formField}>
                                    <label>Coin amount</label>
                                    <RoundedNumberInput
                                        initialValue={data?.generalData.coinAmount}
                                        value={formData.generalData.coinAmount}
                                        decimalPlaces={3}
                                        required
                                        onChange={(val) => handleOrderDataChange("coinAmount", val)} />
                                </div>
                            </div>
                        </Panel>

                        <TableWithToolbar
                            title="Executions"
                            initialData={data?.executions}
                            data={formData.executions}
                            columns={executionTableColumns}
                            disableControlPanel={isNew}
                            tableMaxHeight={230}
                            onAdd={onAddNewExecution}
                            onCellEdit={handleExecutionCellEdit} />

                        <TableWithToolbar
                            title="Adjustments"
                            initialData={data?.adjustments}
                            data={formData.adjustments}
                            columns={adjustmentTableColumns}
                            disableControlPanel={isNew}
                            tableMaxHeight={150} 
                            onAdd={onAddNewAdjustment}
                            onCellEdit={handleAdjustmentCellEdit} />

                    </ContentBlock>
                    <FooterBlock>
                        {data ? (
                            <button 
                                className={styles.saveBtn} 
                                disabled={
                                    !orderDataHasDiff &&
                                    executionsDiff.length === 0 &&
                                    adjustmentsDiff.length === 0
                                }
                                onClick={handleSaveClick}
                            >Save</button>
                        ) : (
                            <button className={styles.createBtn} onClick={handleCreateClick}>Create</button>
                        )}
                    </FooterBlock>
                </>
            )}
        </ViewWrapper>
    );
};

export default OrderView;