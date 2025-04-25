import styles from "./OrderFiltersBlock.module.css";
import ReloadIcon from "../../../../assets/icons/reload.png";
import CustomSelect from "../../../components/CustomSelect/CustomSelect";
import { ORDER_STATUSES } from "../../../../constants";
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
    const exchangeOptions = Object.keys(ORDER_STATUSES).map((key) => ({
        value: ORDER_STATUSES[key as keyof typeof ORDER_STATUSES],
        label: ORDER_STATUSES[key as keyof typeof ORDER_STATUSES],
    }));

    return (
        <div className={styles.filterPanel}>
            <div className={styles.filterGroup}>
                <label>Дата от</label>
                <input type="date" value={filters.dateFrom || ""} onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })} />
            </div>

            <div className={styles.filterGroup}>
                <label>Дата до</label>
                <input type="date" value={filters.dateTo || ""} onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })} />
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