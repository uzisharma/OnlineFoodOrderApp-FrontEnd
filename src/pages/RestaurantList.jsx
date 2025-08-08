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

  const navigate = useNavigate();

  const editResUrl = "http://localhost:8080/api/restaurant/update?id=";

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
    setIsMoalOpen(true);
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
        content={content}
        url={"http://localhost:8080/api/food/getAll"}
      />
    </div>
  );
}
