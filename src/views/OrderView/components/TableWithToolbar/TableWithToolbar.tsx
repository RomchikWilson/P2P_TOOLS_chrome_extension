import Table, { ColumnConfig } from "../../../components/Table/Table";
import styles from "./TableWithToolbar.module.css";
import CreateIcon from "../../../../assets/icons/create.png";

interface Props<T> {
  title: string;
  data: T[];
  columns: ColumnConfig<T>[];
  tableMaxHeight?: number;
  onAdd?: () => void;
}

const TableWithToolbar = <T extends { id: string | number }>({
  title,
  data,
  columns,
  tableMaxHeight,
  onAdd,
}: Props<T>) => {
    return (
        <div className={styles.tableSection}>
            <div className={styles.tableControlPanel}>
                <div className={styles.tableTitle}>{title}</div>
                <div className={styles.tableActions}>
                    <button onClick={onAdd} title="Add">
                        <img src={CreateIcon} alt="Add" />
                    </button>
                </div>
            </div>
            <Table data={data} columns={columns} maxHeight={tableMaxHeight}/>
        </div>
    );
};

export default TableWithToolbar;
