import React from "react";
import styles from "./Table.module.css";

export type ColumnConfig<T> = {
    key: keyof T;
    label: string;
    render?: (value: T[keyof T], row: T) => React.ReactNode;
};

type Props<T extends { id: string | number }> = {
    data: T[];
    columns: ColumnConfig<T>[];
    maxHeight?: number;
    onRowClick?: (row: T) => void;
};

function Table<T extends { id: string | number }>({ 
    data, 
    columns,
    maxHeight,
    onRowClick,
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
                            <td colSpan={columns.length} style={{ textAlign: "center", padding: "1rem", background: "#2c2c2c" }}>
                            No data
                            </td>
                        </tr>
                    ) : (
                        data.map((row) => (
                            <tr key={row.id} onClick={onRowClick ? () => onRowClick(row) : undefined}>
                                {columns.map((col) => (
                                    <td key={col.key as string}>
                                        { col.render ? col.render(row[col.key], row) : String(row[col.key]) }
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
