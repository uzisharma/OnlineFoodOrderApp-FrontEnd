import { useState } from "react";
import Table from "../components/Table";

export default function FoodList() {
  const [resList, setResList] = useState([]);

  const baseUrl = "http://localhost:8080/api/food";

  const handleNavigate = () => {};
  const handleDelete = () => {};

  const handleClick = () => {};

  return (
    <>
      <title>Food List</title>
      <Table
        title={"Food"}
        resList={resList}
        setResList={setResList}
        url={`${baseUrl}/getAll`}
        handleNavigate={handleNavigate}
        handleDelete={handleDelete}
        onClick={handleClick}
      />
    </>
  );
}
