import Table from "../../../components/Table";
import "./style/FoodList.css";
import { getAllFood, deleteFoodById } from "../../../service/foodService";
import { useNavigate } from "react-router";

export default function FoodList() {
  const navigate = useNavigate();

  const handleNavigate = (data) => {
    navigate(`/admin/food/update/${data.id}`, { state: { data } });
  };

  return (
    <div className="all-list">
      <title>Food List</title>
      <Table
        title={"food"}
        handleNavigate={handleNavigate}
        fetchDataFn={getAllFood}
        deleteDataFn={deleteFoodById}
      />
    </div>
  );
}
