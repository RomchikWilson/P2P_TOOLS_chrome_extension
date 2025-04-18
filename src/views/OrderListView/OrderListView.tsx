import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import styles from "./OrderListView.module.css";
import { fetchOrders } from "../../api/ordersAPI";
import OrderFiltersBlock from "./components/FiltersBlock/OrderFiltersBlock";
import Table from "../components/Table/Table";
import { OrderFilters } from "../../types/ordersTypes";

const OrderListView = () => {
    const [filters, setFilters] = useState<OrderFilters>({
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

    const orderColumns = [
        { key: "id", label: "ID" },
        { key: "status", label: "Status" },
        { key: "exchange", label: "Exchange" },
        { key: "fiatAmount", label: "Fiat" },
        { key: "price", label: "Price" },
        { key: "coinAmount", label: "Coins" },
    ];

    return (
        <div className={styles.orderView}>
            <Header text="Orders" showBackBtn={true}/>
            <OrderFiltersBlock
                filters={filters}
                setFilters={setFilters}
                onClear={clearFilters}
                onApply={loadOrders}
            />
            <Table data={orders} columns={orderColumns} />
            <div className={styles.footer}>
                <button onClick={() => setPage((p) => p - 1)} disabled={page <= 1}>Prev</button>
                {page}
                <button onClick={() => setPage((p) => p + 1)} disabled={orders.length < 10}>Next</button>
            </div>
        </div>
    );
};

export default OrderListView;