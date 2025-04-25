import { useEffect, useState } from "react";
import Header from "../components/HeaderBlock/HeaderBlock";
import styles from "./OrderListView.module.css";
import { fetchOrders } from "../../api/ordersAPI";
import OrderFiltersBlock from "./components/FiltersBlock/OrderFiltersBlock";
import Table, { ColumnConfig } from "../components/Table/Table";
import { ListOrderFilters, ListOrderData } from "../../types/ordersTypes";
import { useNavigate } from "react-router-dom";
import ViewWrapper from "../components/ViewWrapper/ViewWrapper";
import ContentBlock from "../components/ContentBlock/ContentBlock";

const OrderListView = () => {
    const navigate = useNavigate();
    
    const [filters, setFilters] = useState<ListOrderFilters>({
        status: "",
        dateFrom: undefined,
        dateTo: undefined,
    });
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);

    const loadOrders = async () => {
        const data = await fetchOrders(filters, page);
        setOrders(data);
    };

    const clearFilters = () => {
        setFilters({ status: "", dateFrom: undefined, dateTo: undefined });
    };

    useEffect(() => {
        loadOrders();
    }, [page]);

    const orderColumns: ColumnConfig<ListOrderData>[] = [
        { key: "id", label: "ID" },
        { key: "status", label: "Status" },
        { key: "exchange", label: "Exchange" },
        { key: "fiatAmount", label: "Fiat" },
        { key: "price", label: "Price" },
        { key: "coinAmount", label: "Coins" },
    ];

    const handleRowClick = (order: ListOrderData) => {
        navigate(`/orders/${order.id}`)
    };

    return (
        <ViewWrapper>
            <Header text="Orders"/>
            <ContentBlock disableScroll>
                <OrderFiltersBlock
                    filters={filters}
                    setFilters={setFilters}
                    onClear={clearFilters}
                    onApply={loadOrders}
                />
                <Table data={orders} columns={orderColumns} onRowClick={handleRowClick} />
            </ContentBlock>
            <div className={styles.footer}>
                <button onClick={() => setPage((p) => p - 1)} disabled={page <= 1}>Prev</button>
                {page}
                <button onClick={() => setPage((p) => p + 1)} disabled={orders.length < 10}>Next</button>
            </div>
        </ViewWrapper>
    );
};

export default OrderListView;