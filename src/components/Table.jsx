import React, { useEffect } from "react";
import "./Table.style.css";

export default function Table({ resList, setResList, title }) {
  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/restaurant/api/getAll"
      );
      const data = await response.json();
      setResList(data.data);
      console.log(data);
    } catch (error) {
      console.log(
        "Failed to fetch data, please start the SpringBootApplication",
        error
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columnHeader = resList.length > 0 ? Object.keys(resList[0]) : [];

  // Utility function to capitalize first letter
  const formatHeader = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="table-container">
      <div className="header-container">
        <h1>{title}</h1>
      </div>
      <table>
        <thead>
          <tr>
            {columnHeader.map((colName) => (
              <th key={colName}>{formatHeader(colName)}</th>
            ))}
            {}
          </tr>
        </thead>
        <tbody>
          {resList.map((row, index) => (
            <tr key={index}>
              {columnHeader.map((colName) => (
                <td key={colName}>{row[colName]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
