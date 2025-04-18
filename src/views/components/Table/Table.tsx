import React from "react";
import styles from "./Table.module.css";

type ColumnConfig<T> = {
    key: keyof T;
    label: string;
    render?: (value: T[keyof T], row: T) => React.ReactNode;
};

type GenericTableProps<T extends { id: string | number }> = {
    data: T[];
    columns: ColumnConfig<T>[];
};


function Table<T extends { id: string | number }>({ data, columns }: GenericTableProps<T>) {
    return (
        <div className={styles.tableWrapper}>
            <table style={{ width: "100%" }}>
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key as string}>{col.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.id}>
                            {columns.map((col) => (
                                <td key={col.key as string}>
                                    {col.render
                                        ? col.render(row[col.key], row)
                                        : String(row[col.key])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
