import { useEffect, useState } from "react";
import "./style/Table.style.css";
import PageNavigation from "./PageNavigation";
import { Button } from "./Input";
import editIcon from "../assets/editIcon.png";
import deleteIcon from "../assets/deleteIcon.png";

export default function Table({
  resList,
  setResList,
  title,
  url,
  handleNavigate,
  handleDelete,
  onClick,
  refreshTrigger,
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
  }, [setResList, baseUrl, refreshTrigger]);

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
                      <Button
                        // label={colName}
                        onClick={() => onClick(row, colName)}
                      >
                        {colName}
                      </Button>
                    </td>
                  );
                }

                return <td key={colName}>{cell ?? "N/A"}</td>;
              })}
              <td key={index}>
                <Button type="edit" onClick={() => handleNavigate(row)}>
                  {<img src={editIcon} alt="Edit" width={30} height={30} />}
                </Button>
              </td>
              <td key={index + 1}>
                <Button
                  type="delete"
                  label={deleteIcon}
                  onClick={() => handleDelete(row)}
                >
                  {<img src={deleteIcon} alt="delete" width={30} height={30} />}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="page-nav-container">
        <PageNavigation
          totalPages={received.totalPages}
          url={url}
          setBaseUrl={setBaseUrl}
        />
      </div>
    </div>
  );
}
