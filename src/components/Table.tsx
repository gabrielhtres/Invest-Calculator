import { ReactNode } from "react";
import styles from "./Table.module.css";

export interface ColumnType<T extends object> {
  key: string;
  title: string;
  align?: "left" | "center" | "right";
  customRender?: (value: T) => ReactNode;
}

interface TableProps<T extends object> {
  data: T[];
  columns: ColumnType<T>[];
}

export default function Table<T extends object>({
  data,
  columns,
}: TableProps<T>) {
  if (!data.length) return null;

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th
              key={`th-${column.key}`}
              style={{
                borderTopLeftRadius: index === 0 ? 10 : 0,
                borderTopRightRadius: index === columns.length - 1 ? 10 : 0,
              }}
            >
              {column.title}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, dataIndex) => (
          <tr key={`tr-${dataIndex}`}>
            {columns.map((column, columnIndex) => (
              <td
                key={`td-${column.key}`}
                style={{
                  textAlign: column.align || "center",
                  borderBottomLeftRadius:
                    dataIndex === data.length - 1 && columnIndex === 0 ? 10 : 0,
                  borderBottomRightRadius:
                    dataIndex === data.length - 1 &&
                    columnIndex === columns.length - 1
                      ? 10
                      : 0,
                }}
              >
                {column.customRender
                  ? column.customRender(row)
                  : (row[column.key as keyof T] as ReactNode)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
