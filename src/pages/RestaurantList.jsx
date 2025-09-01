import { useNavigate } from "react-router";
import Table from "../components/Table";
import "./style/RestaurantList.css";
import {
  getAllRestaurant,
  deleteRestaurantById,
} from "../service/restaurantService";

export default function RestaurantList() {
  const navigate = useNavigate();

  const handleNavigate = (data) => {
    navigate(`/admin/restaurant/update/${data.id}`, { state: { data } });
  };

  return (
    <div className="restaurant-list-container">
      <title>Restaurants List</title>
      <Table
        title={"Restaurants"}
        handleNavigate={handleNavigate}
        fetchDataFn={getAllRestaurant}
        deleteDataFn={deleteRestaurantById}
      />
    </div>
  );
}
