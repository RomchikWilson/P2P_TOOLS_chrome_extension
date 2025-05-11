import styles from "./OrderFiltersBlock.module.css";
import ReloadIcon from "../../../../assets/icons/reload.png";
import CustomSelect from "../../../components/CustomSelect/CustomSelect";
import { OrderStatus } from "../../../../enums";
import { ListOrderFilters } from "../../../../types/ordersTypes";

type OrderFiltersProps = {
    filters: ListOrderFilters;
    setFilters: (filters: ListOrderFilters) => void;
    onClear: () => void;
    onApply: () => void;
};

const OrderFiltersBlock = ({
    filters,
    setFilters,
    onClear,
    onApply,
}: OrderFiltersProps) => {
    const exchangeOptions = Object.keys(OrderStatus).map((key) => ({
        value: OrderStatus[key as keyof typeof OrderStatus],
        label: OrderStatus[key as keyof typeof OrderStatus],
    }));

    const getDate = (value: string) => {
        const dateNow = new Date().toISOString().split("T")[0];
        return value > dateNow ? dateNow : value;
    };

    const handlerOnChangeDateFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
        const date = getDate(e.target.value);
        setFilters({
            ...filters,
            dateFrom: date,
        });
    };

    const handlerOnChangeDateTo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const date = getDate(e.target.value);
        setFilters({
            ...filters,
            dateTo: date,
        });
    };
    
    return (
        <div className={styles.filterPanel}>
            <div className={styles.filterGroup}>
                <label>Дата от</label>
                <input type="date" value={filters.dateFrom || ""} onChange={handlerOnChangeDateFrom} />
            </div>

            <div className={styles.filterGroup}>
                <label>Дата до</label>
                <input type="date" value={filters.dateTo || ""} onChange={handlerOnChangeDateTo} />
            </div>

            <div className={styles.filterGroup}>
                <label>Status</label>
                <CustomSelect
                    options={exchangeOptions}
                    value={filters.status || ""}
                    needEmptyOption
                    emptyOptionLabel="All"
                    onChange={(value) => setFilters({ ...filters, status: value })}
                />
            </div>

            <div className={styles.filterControl}>
                <button className={styles.filterButton} onClick={onClear}>
                    <img src={ReloadIcon} alt="Clear filters" />
                </button>
                <button className={styles.filterButton} onClick={onApply}>
                    Apply
                </button>
            </div>
        </div>
    );
};

export default OrderFiltersBlock;