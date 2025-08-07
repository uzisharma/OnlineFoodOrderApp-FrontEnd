import { useEffect, useState } from "react";
import "./Table.style.css";
import PageNavigation from "./PageNavigation";
import { Button } from "./Input";

export default function Table({
  resList,
  setResList,
  title,
  url,
  handleClick,
}) {
  const [received, setReceived] = useState({});
  const [baseUrl, setBaseUrl] = useState(url);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);
        const data = await response.json();
        setReceived(data.data);
        setResList(data.data.content);
        console.log(data);
      } catch (error) {
        console.log(
          "Failed to fetch data, please start the SpringBootApplication",
          error
        );
      }
    };
    fetchData();
  }, [setResList, baseUrl]);

  const safeResList = Array.isArray(resList) ? resList : [];
  const columnHeader = resList.length > 0 ? Object.keys(safeResList[0]) : [];

  // Utility function to capitalize first letter
  const formatHeader = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="table-container">
      <header>
        <h1>{title}</h1>
      </header>
      <table>
        <thead>
          <tr>
            {columnHeader.map((colName) => (
              <th key={colName}>{formatHeader(colName)}</th>
            ))}
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {safeResList.map((row, index) => (
            <tr key={index}>
              {columnHeader.map((colName) => {
                const cell = row[colName];

                if (typeof cell === "object" && cell !== null) {
                  return (
                    <td key={colName}>
                      <Button label={colName} />
                    </td>
                  );
                }

                return <td key={colName}>{cell ?? "N/A"}</td>;
              })}
              <td key={index}>
                <Button label={"Edit"} onClick={() => handleClick(row)} />
              </td>
              <td key={index + 1}>
                <Button label={"Delete"} onClick={() => handleClick(row)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="page-nav-container">
        <PageNavigation
          totalPages={received.totalPages}
          setBaseUrl={setBaseUrl}
        />
      </div>
    </div>
  );
}
