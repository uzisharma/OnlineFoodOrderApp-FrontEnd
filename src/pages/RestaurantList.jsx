import { useState } from "react";
import { useNavigate } from "react-router";
import Table from "../components/Table";
import Search from "../components/Search";
import "./style/RestaurantList.css";
import UnifiedModal from "../components/UnifiedModal";

export default function RestaurantList() {
  const [resList, setResList] = useState([]); // single source of truth
  const [selectedOption, setSelectedOption] = useState("id");
  const [searchText, setSearchText] = useState("");

  // Unified Modal control
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("select"); // "select" | "status"
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState([]);
  const [modalUrl, setModalUrl] = useState("");
  const [modalType, setModalType] = useState("success");
  const [modalMessage, setModalMessage] = useState("");
  const [updateUrl, setUpdateUrl] = useState("");

  const navigate = useNavigate();

  const editResUrl = "http://localhost:8080/api/restaurant/update?id=";
  const resBaseUrl = "http://localhost:8080/api/restaurant";
  const baseUrl = "http://localhost:8080/api";

  // Filtered list is computed on the fly
  const displayedList = searchText
    ? resList.filter((item) =>
        item[selectedOption]?.toString().toLowerCase().includes(searchText)
      )
    : resList;

  const handleNavigate = (row) => {
    navigate(`/restaurant-details/${row.id}`, { state: { row, editResUrl } });
  };

  const handleDelete = (row) => {
    const delUrl = `${baseUrl}/restaurant/${row?.id}/delete`;
    fetch(delUrl, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unable to delete");
        if (res.status === 204) {
          // Update state instantly
          setResList((prev) => prev.filter((item) => item.id !== row.id));

          // Show success modal
          setModalMode("status");
          setModalMessage(
            `${row?.restaurantName} restaurant deleted Successfully`
          );
          setModalType("success");
          setIsModalOpen(true);
          return null;
        }
        return res.json();
      })
      .catch(() => {
        setModalMode("status");
        setModalMessage(
          `${row?.restaurantName} restaurant deletion Unsuccessful`
        );
        setModalType("error");
        setIsModalOpen(true);
      });
  };

  const handleClick = (row, colName) => {
    setModalContent(row[colName]);
    setModalTitle(colName);
    setUpdateUrl(`${resBaseUrl}/${row?.id}/assign`);
    setModalUrl(`${baseUrl}/${colName}/getAll`);
    setModalMode("select");
    setIsModalOpen(true);
  };

  const saveList = (selectedId) => {
    fetch(updateUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedId),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update");
        return res.json();
      })
      .then(() => {
        // Refresh restaurant list from backend
        const resUrl = `${resBaseUrl}/getAll`;
        return fetch(resUrl, {
          headers: { "Content-Type": "application/json" },
        });
      })
      .then((res) => res.json())
      .then((data) => {
        const updatedList = data?.data?.content || [];
        setResList(updatedList); // directly update full list

        // Show success modal
        setModalMode("status");
        setModalMessage(`${modalTitle} list updated Successfully`);
        setModalType("success");
        setIsModalOpen(true);
      })
      .catch(() => {
        setModalMode("status");
        setModalMessage(`Failed to update ${modalTitle} list`);
        setModalType("error");
        setIsModalOpen(true);
      });
  };

  const handleOnClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="restaurant-list-container">
      <title>Restaurants List</title>
      <Search
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        searchText={searchText}
        setSearchText={setSearchText}
        handleSearch={() => {}} // no-op now
      />
      <Table
        title={"Restaurants"}
        resList={displayedList}
        setResList={setResList}
        url={"http://localhost:8080/api/restaurant/getAll"}
        handleNavigate={handleNavigate}
        handleDelete={handleDelete}
        onClick={handleClick}
      />
      <UnifiedModal
        isOpen={isModalOpen}
        onClose={handleOnClose}
        mode={modalMode}
        title={modalTitle}
        saveList={saveList}
        content={modalContent}
        url={modalUrl}
        type={modalType}
        message={modalMessage}
      />
    </div>
  );
}
