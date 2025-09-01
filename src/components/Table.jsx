import { useEffect, useState } from "react";
import "./style/Table.style.css";
import PageNavigation from "./PageNavigation";
import { Button } from "./Input";
import editIcon from "../assets/editIcon.png";
import deleteIcon from "../assets/deleteIcon.png";


export default function Table({
  title,
  fetchDataFn,
  deleteDataFn,
  handleNavigate,
  refreshTrigger,
  setRefreshTrigger,
}) {
  const [received, setReceived] = useState([]);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const size = 10;

  // sorting state only
  const [sortBy, setSortBy] = useState("id");
  const [sortDir, setSortDir] = useState("asc");

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchDataFn({
          page,
          size,
          sortBy,
          sortDir,
        });
        setReceived(data.data.content || []);
        setTotalPages(data?.data?.totalPages || 0);
        console.log(data.data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    loadData();
  }, [page, sortBy, sortDir, refreshTrigger, fetchDataFn, totalPages]);

  const columnHeader = received.length > 0 ? Object.keys(received[0]) : [];

  const formatHeader = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const handleSort = (col) => {
    if (sortBy === col) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortBy(col);
      setSortDir("asc");
    }
  };

  return (
    <div className="table-container">
      <header>
        <h1>{title}</h1>
      </header>

      <table>
        <thead>
          <tr>
            {columnHeader.map((colName) => (
              <th key={colName} onClick={() => handleSort(colName)}>
                {formatHeader(colName)}
                {sortBy === colName && (sortDir === "asc" ? " 🔼" : " 🔽")}
              </th>
            ))}
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {received.map((row, index) => (
            <tr key={index}>
              {columnHeader.map((colName) => {
                const cell = row[colName];
                return <td key={colName}>{cell ?? "N/A"}</td>;
              })}
              <td>
                <Button type="edit" onClick={() => handleNavigate(row)}>
                  <img src={editIcon} alt="Edit" width={24} height={24} />
                </Button>
              </td>
              <td>
                <Button
                  type="delete"
                  onClick={() => {
                    setRefreshTrigger((prev) => prev + 1);
                    deleteDataFn(row?.id);
                  }}
                >
                  <img src={deleteIcon} alt="delete" width={24} height={24} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="page-nav-container">
        <PageNavigation
          totalPages={received.totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
