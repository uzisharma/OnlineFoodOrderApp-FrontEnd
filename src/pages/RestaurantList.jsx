import { useState } from "react";
import { useNavigate } from "react-router";
import Table from "../components/Table";
import Search from "../components/Search";
import "./style/RestaurantList.css";
import UnifiedModal from "../components/UnifiedModal"; // <-- use UnifiedModal instead

export default function RestaurantList() {
  const [resList, setResList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedOption, setSelectedOption] = useState("id");
  const [searchText, setSearchText] = useState("");

  // Unified Modal control (for both select & status modes)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("select"); // "select" | "status"
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState([]);
  const [modalUrl, setModalUrl] = useState("");
  const [modalType, setModalType] = useState("success"); // for status mode
  const [modalMessage, setModalMessage] = useState("");
  const [updateUrl, setUpdateUrl] = useState("");

  const navigate = useNavigate();

  const editResUrl = "http://localhost:8080/api/restaurant/update?id=";
  const resBaseUrl = "http://localhost:8080/api/restaurant";
  const baseUrl = "http://localhost:8080/api";

  const handleSearch = () => {
    if (!searchText) {
      setFilteredList([]);
      return;
    }
    const filtered = resList.filter((item) =>
      item[selectedOption]?.toString().toLowerCase().includes(searchText)
    );
    setFilteredList(filtered);
  };

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
          setResList((prev) => prev.filter((item) => item.id !== row.id));
          setFilteredList((prev) => prev.filter((item) => item.id !== row.id));
          // open status modal
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
        // ✅ Immediately refresh the restaurant list from backend
        return fetch(resBaseUrl, {
          headers: { "Content-Type": "application/json" },
        });
      })
      .then((res) => res.json())
      .then((data) => {
        const updatedList = data?.data?.content || [];
        setResList(updatedList);
        setFilteredList(updatedList); // also update filtered list so modal gets fresh data

        // ✅ Show success status modal
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
        handleSearch={handleSearch}
      />
      <Table
        title={"Restaurants"}
        resList={filteredList.length > 0 || searchText ? filteredList : resList}
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
