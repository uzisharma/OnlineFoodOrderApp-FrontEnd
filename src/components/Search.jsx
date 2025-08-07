import React from "react";
import "./style/Search.style.css";

export default function Search({
  selectedOption,
  setSelectedOption,
  searchText,
  setSearchText,
  handleSearch,
}) {
  return (
    <div className="search-container">
      <select
        id="selectedOption"
        name="selectedOption"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="id">Id</option>
        <option value="name">Name</option>
        <option value="email">Email</option>
        <option value="contact">Contact</option>
      </select>
      <input
        name="inputText"
        className="input-text"
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
