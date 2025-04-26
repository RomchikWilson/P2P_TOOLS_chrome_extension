import styles from "./Table.module.css";
import RoundedNumberInput from "../RoundedNumberInput/RoundedNumberInput";
import CustomSelect, { Option } from "../../components/CustomSelect/CustomSelect"
import TextInput from "../TextInput/TextInput";

export type ColumnConfig<T> = {
    key: keyof T;
    label: string;
    type?: "number" | "text";
    decimalPlaces?: number;
    options?: Option[];
};

type Props<T extends { id: number }> = {
    initialData?: T[];
    data: T[];
    columns: ColumnConfig<T>[];
    maxHeight?: number;
    onRowClick?: (row: T) => void;
    onCellEdit?: <K extends keyof T>(rowId: number, key: K, value: T[keyof T]) => void;
};

function Table<T extends { id: number }>({
    initialData = [],
    data, 
    columns,
    maxHeight,
    onRowClick,
    onCellEdit,
}: Props<T>) {
    return (
        <div className={styles.tableWrapper} style={{ maxHeight: maxHeight && `${maxHeight}px` }}>
            <table style={{ width: "100%" }}>
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key as string}>{col.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} style={{ padding: "1rem", background: "#2c2c2c" }}>
                            No data
                            </td>
                        </tr>
                    ) : (
                        data.map((row, index) => (
                            <tr key={row.id} onClick={onRowClick ? () => onRowClick(row) : undefined}>
                                {columns.map((col) => (
                                    <td key={col.key as string}>
                                        { initialData.length ? (
                                            col.options ? (
                                                <CustomSelect
                                                    initialValue={String(initialData[index][col.key] ?? null)}
                                                    value={String(row[col.key] ?? null)}
                                                    options={col.options}
                                                    required
                                                    onChange={(val) => onCellEdit?.(row.id, col.key, val as T[keyof T])} />
                                            ) : (
                                                col.type === "number" ? (
                                                    <RoundedNumberInput
                                                        initialValue={Number(initialData[index][col.key])}
                                                        value={Number(row[col.key])}
                                                        decimalPlaces={col.decimalPlaces ? col.decimalPlaces : 0}
                                                        required
                                                        onChange={(val) => onCellEdit?.(row.id, col.key, val as T[keyof T])} />
                                                ) : (
                                                    col.type === "text" ? (
                                                        <TextInput 
                                                            initialValue={String(initialData[index][col.key])}
                                                            value={String(row[col.key])}
                                                            required
                                                            onChange={(val) => onCellEdit?.(row.id, col.key, val as T[keyof T])} />
                                                    ) : (
                                                        String(row[col.key])
                                                    )
                                                )
                                            )
                                        ) : (
                                            String(row[col.key])
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
