import { useState } from "react";
import Table from "../components/Table";
import EditModal from "../components/EditModal";
import StatusModal from "../components/StatusModal";
import "./style/FoodList.css";

export default function FoodList() {
  const [resList, setResList] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // ✅ trigger for Table
  const [statusIsOpen, setStatusIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const baseUrl = "http://localhost:8080/api/food";

  const updateRowInList = () => {
    // Instead of manually updating state, just trigger a refetch in Table
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleNavigate = (row) => {
    setRowData(row);
    setIsEditOpen(true);
  };
  const handleDelete = (row) => {
    const delUrl = `${baseUrl}/${row?.id}/delete`;
    fetch(delUrl, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unable to delete");
        if (res.status === 204) {
          console.log("Deleted");
          setStatusIsOpen(true);
          setTitle("Food");
          setMessage(`${row?.foodName} got deleted`);
          setRefreshTrigger((prev) => prev + 1);
        }
      })
      .catch((error) => {
        setStatusIsOpen(true);
        setTitle("Food");
        setMessage(`${row?.foodName} failed to deleted`);
        console.error("Failed to delete", error);
      });
  };

  return (
    <div className="foodAll-list">
      <title>Food List</title>
      <Table
        title={"Food"}
        resList={resList}
        setResList={setResList}
        url={`${baseUrl}/getAll`}
        handleNavigate={handleNavigate}
        handleDelete={handleDelete}
        onClick={() => {}}
        refreshTrigger={refreshTrigger} // ✅ pass trigger to Table
      />

      {isEditOpen && (
        <EditModal
          title={"Food"}
          row={rowData}
          baseUrl={baseUrl}
          onClose={() => setIsEditOpen(false)}
          updateRowInList={updateRowInList} // ✅ tell parent to refresh after edit
        />
      )}

      {statusIsOpen && (
        <StatusModal
          title={title}
          setIsOpen={setStatusIsOpen}
          message={message}
        />
      )}
    </div>
  );
}
