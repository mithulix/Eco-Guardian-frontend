import React, { ReactNode } from "react";

interface ITableProbs {
  rowItems: string[];
  tableData: ReactNode[];
}

export default function Table({ rowItems, tableData }: ITableProbs) {
  return (
    <div className="overflow-x-auto">
      <table className="table border">
        <thead>
          <tr>
            {rowItems?.map((item) => (
              <th key={item}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
    </div>
  );
}