import { useState } from "react";
import { useNavigate } from "react-router";
import Table from "../components/Table";
import Search from "../components/Search";
import "./style/RestaurantList.css";
import Modal from "../components/Modal";

export default function RestaurantList() {
  const [resList, setResList] = useState([]); //full list from api
  const [filteredList, setFilteredList] = useState([]); //filtered list to display
  const [selectedOption, setSelectedOption] = useState("id");
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsMoalOpen] = useState(false);
  const [content, setContent] = useState([]);
  const [updateUrl, setUpdateUrl] = useState("");

  const navigate = useNavigate();

  const editResUrl = "http://localhost:8080/api/restaurant/update?id=";
  const editFoodListUrl = "http://localhost:8080/api/restaurant";

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

  const handleClick = (row, colName) => {
    console.log(row?.id);
    console.log(colName);
    setContent(row[colName]);
    setUpdateUrl(`${editFoodListUrl}/${row?.id}/assign`);
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
      })
      .catch((error) => {
        console.error("Failed", error);
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
        onClick={handleClick}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsMoalOpen(false)}
        title={"Edit Restaurant"}
        saveList={saveList}
        content={content}
        url={"http://localhost:8080/api/food/getAll"}
      />
    </div>
  );
}
