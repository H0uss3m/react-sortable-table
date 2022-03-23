import "./styles.css";
import { useEffect, useState } from "react";
import dataToSend from "./data";
import TooltipIcon from "./Tooltip.svg";
var _ = require("lodash");

const App = () => {
  const [data, setData] = useState(dataToSend);
  const [columns, setColumns] = useState([]);
  const [totalPages, setTotalPages] = useState(dataToSend.totalPages);
  const [totalItems, setTotalItems] = useState(dataToSend.totalItems);
  const [sortOrder, setSortOrder] = useState("asc");
  const headers = [
    { id: 0, value: "name", width: "328px", sortBy: "name" },
    { id: 1, value: "provider", width: "344px", sortBy: "provider['name']" },
    { id: 2, value: "type", width: "196px", sortBy: "type['name']" },
    { id: 3, value: "exp date", width: "196px", sortBy: "expirationDate" },
    { id: 4, value: "status", width: "123px", sortBy: "status['label']" }
  ];
  // interface ITableColumn : {
  //   id: string,
  //   name:string,
  //   provider: string,
  //   type: string,
  //   expirationDate:string,
  //   status:string
  // }
  useEffect(() => {
    const ColumnToSet = [];
    data.data.forEach((column) => {
      ColumnToSet.push({
        id: column.id,
        name: column.id,
        provider: column.provider,
        type: column.type,
        expirationDate: column.expirationDate,
        status: column.status
      });
    });
    setColumns(ColumnToSet);
  }, []);
  console.log(columns);
  const sortByType = (type: string) => {
    sortOrder === "asc" ? setSortOrder("desc") : setSortOrder("asc");
    const sortedData = _.sortByOrder(columns, [type], [sortOrder]);

    setColumns(sortedData);
  };
  return (
    <>
      <p>total pages : {totalPages}</p>
      <p>total items : {totalItems}</p>

      <table>
        <thead>
          <tr className="thead-item">
            {headers.map((header) => (
              <th
                onClick={() => sortByType(header.sortBy)}
                style={{ width: header?.width }}
                key={header?.id}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center"
                  }}
                >
                  <span style={{ marginRight: "13px" }}>{header?.value}</span>
                  <span className="dropdown_icon"></span>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {columns.map((column) => (
            <tr className="tbody_item" key={column?.id}>
              <td> #{column?.name}</td>
              <td> {column?.provider?.name}</td>
              <td style={{ display: "flex", justifyContent: "space-between" }}>
                {column?.type?.name}{" "}
                <img
                  width="12px"
                  height="12px"
                  src={TooltipIcon}
                  alt="tooltip_icon"
                />
              </td>
              <td> {column?.expirationDate}</td>
              <td className={`status-${column?.status?.id}`}>
                {" "}
                {column?.status?.label}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default App;
