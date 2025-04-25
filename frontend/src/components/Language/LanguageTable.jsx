import React from "react";
import "./LanguageTable.css";

/**
 * Renders a reusable data table.
 *
 * This component dynamically generates table columns and rows based on the
 * provided configuration and data. It includes handling for empty data states.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {ColumnDefinition[]} props.columns - Defines the table columns (header text and data accessor key).
 * @param {DataRow[]} [props.data=[]] - Array of data objects to display as rows. Keys must match column accessors.
 * @returns {React.ReactElement} The rendered table or a message if columns are missing/data is empty.
 * @example
 * const columns = [ { header: 'Name', accessor: 'name' } ];
 * const data = [ { id: 1, name: 'Alice' }, { id: 2, name: 'Bob' } ];
 * <LanguageTable columns={columns} data={data} />
 */
const LanguageTable = ({ columns = [], data = [] }) => {
  if (!columns.length) {
    return <p>No columns defined for the table</p>;
  }
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.accessor || col.header}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={row.id || rowIndex}>
                {columns.map((col) => (
                  <td key={col.accessor || col.header}>
                    {row[col.accessor] !== undefined
                      ? String(row[col.accessor])
                      : "N/A"}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: "center" }}>
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LanguageTable;
