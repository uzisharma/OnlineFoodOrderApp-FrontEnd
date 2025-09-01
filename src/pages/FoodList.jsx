import Table from "../components/Table";
import "./style/FoodList.css";
import { getAllFood, deleteFoodById } from "../service/foodService";

export default function FoodList() {
  // const [refreshTrigger, setRefreshTrigger] = useState(0); // ✅ trigger for Table

  const handleNavigate = () => {};

  return (
    <div className="foodAll-list">
      <title>Food List</title>
      <Table
        title={"Food"}
        handleNavigate={handleNavigate}
        fetchDataFn={getAllFood}
        deleteDataFn={deleteFoodById}
      />
    </div>
  );
}
