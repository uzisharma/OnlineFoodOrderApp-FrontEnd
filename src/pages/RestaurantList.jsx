import { useState } from "react";
import { useNavigate } from "react-router";
import Table from "../components/Table";
import Search from "../components/Search";
import "./style/RestaurantList.css";
import Modal from "../components/Modal";
import StatusModal from "../components/StatusModal";

export default function RestaurantList() {
  const [resList, setResList] = useState([]); //full list from api
  const [filteredList, setFilteredList] = useState([]); //filtered list to display
  const [selectedOption, setSelectedOption] = useState("id");
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsMoalOpen] = useState(false);
  const [content, setContent] = useState([]);
  const [updateUrl, setUpdateUrl] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalUrl, setModalUrl] = useState("");

  //Status Modal Control
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [statusModalMsg, setStatusModalMsg] = useState("");
  const [statusModalType, setStatusModalType] = useState("success");

  const navigate = useNavigate();

  const editResUrl = "http://localhost:8080/api/restaurant/update?id=";
  const resBaseUrl = "http://localhost:8080/api/restaurant";
  // const foodBaseUrl = "http://localhost:8080/api/food";
  const baseUrl = "http://localhost:8080/api";

  const handleSearch = () => {
    const query = searchText;

    if (!query) {
      setFilteredList([]);
      return;
    }

    const filtered = resList.filter((item) => {
      const value = item[selectedOption];
      return value?.toString().toLowerCase().includes(query);
    });

    setFilteredList(filtered);
  };

  const handleNavigate = (row) => {
    navigate(`/restaurant-details/${row.id}`, { state: { row, editResUrl } });
  };
const handleDelete = (row) => {
  const delUrl = `${baseUrl}/restaurant/${row?.id}/delete`;
  fetch(delUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json", // fixed spelling
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Unable to delete");
      }
      if (res.status === 204) {
        // Remove the deleted item from the state immediately
        setResList((prev) => prev.filter((item) => item.id !== row.id));
        setFilteredList((prev) => prev.filter((item) => item.id !== row.id));

        setStatusModalMsg(`${row?.id} deleted Successfully`);
        setStatusModalType("success");
        setIsStatusModalOpen(true);
        return null;
      }
      return res.json();
    })
    .catch((error) => {
      setStatusModalMsg(`${row?.id} Unsuccessful`);
      setStatusModalType("error");
      setIsStatusModalOpen(true);
      console.error("Failed to delete", error);
    });
};

const handleOnClose = () => {
  setIsStatusModalOpen(false);
  if (statusModalType === "success") {
    // navigate(-1);
    setIsMoalOpen(false);
  }
};

const handleClick = (row, colName) => {
  setContent(row[colName]);
  setModalTitle(colName);
  setUpdateUrl(`${resBaseUrl}/${row?.id}/assign`);
  setModalUrl(`${baseUrl}/${colName}/getAll`);
  setIsMoalOpen(true);
};

const saveList = (selectedId) => {
  console.log(selectedId);
  console.log(updateUrl);
  fetch(updateUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(selectedId),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to update");
      }
      return res.json();
    })
    .then((data) => {
      console.log("Update Successfull", data);
      setStatusModalMsg(`${modalTitle} list updated Successfully`);
      setStatusModalType("success");
      setIsStatusModalOpen(true);
    })
    .catch((error) => {
      console.error("Failed", error);
      setStatusModalMsg(`Failed to updated ${modalTitle} list`);
      setStatusModalType("error");
      setIsStatusModalOpen(true);
    });
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
      url={"http://localhost:8080/api/restaurant/getByPage"}
      handleNavigate={handleNavigate}
      handleDelete={handleDelete}
      onClick={handleClick}
    />
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsMoalOpen(false)}
      title={modalTitle}
      saveList={saveList}
      content={content}
      url={modalUrl}
    />
    <StatusModal
      isOpen={isStatusModalOpen}
      type={statusModalType}
      message={statusModalMsg}
      onClose={handleOnClose}
    />
  </div>
);
}
