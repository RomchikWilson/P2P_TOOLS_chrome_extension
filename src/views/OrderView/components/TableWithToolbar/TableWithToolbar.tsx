import Table, { ColumnConfig } from "../../../components/Table/Table";
import styles from "./TableWithToolbar.module.css";
import CreateIcon from "../../../../assets/icons/create.png";

interface Props<T> {
  title: string;
  initialData?: T[];
  data: T[];
  columns: ColumnConfig<T>[];
  tableMaxHeight?: number;
  onAdd?: () => void;
  onCellEdit?: (rowId: number, key: keyof T, value: T[keyof T]) => void;
}

const TableWithToolbar = <T extends { id: number }>({
  title,
  initialData = [],
  data,
  columns,
  tableMaxHeight,
  onAdd,
  onCellEdit,
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
            <Table 
                initialData={initialData} data={data} 
                columns={columns} 
                maxHeight={tableMaxHeight} 
                onCellEdit={onCellEdit} />
        </div>
    );
};

export default TableWithToolbar;
