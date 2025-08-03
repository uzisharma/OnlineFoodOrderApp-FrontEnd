import { useState } from "react";
import Table from "../components/Table";
import Search from "../components/Search";
import "./RestaurantList.css";

export default function RestaurantList() {
  const [resList, setResList] = useState([]); //full list from api
  const [filteredList, setFilteredList] = useState([]); //filtered list to display
  const [selectedOption, setSelectedOption] = useState("id");
  const [searchText, setSearchText] = useState("");

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

  return (
    <div className="restaurant-list-container">
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
      />
    </div>
  );
}
