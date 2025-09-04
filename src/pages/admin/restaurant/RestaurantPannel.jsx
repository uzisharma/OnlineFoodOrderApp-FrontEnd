import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import "./style/RestaurantPanel.css";
import { Button } from "../../../components/Input";
import {
  getAssignedFood,
  getAllOrders,
  deleteRestaurantById,
} from "../../../service/restaurantService";
import AssignedDetails from "../../../components/AssignedDetail";

export default function RestaurantPanel() {
  const [foodData, setFoodData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [error, setError] = useState(null);
  const [errorOrder, setErrorOrder] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const navigate = useNavigate();

  const location = useLocation();
  const data = location.state || {};
  useEffect(() => {
    const getAllFood = async (restaurantId) => {
      try {
        const response = await getAssignedFood(restaurantId);
        setFoodData(response?.data?.data || []);
        setError(null); // reset error if successful
      } catch (err) {
        if (err.response?.status === 404) {
          setFoodData([]); // no food found
          setError("No food data available.");
        } else {
          setError("Something went wrong while fetching food.");
        }
      }
    };

    const getAllOrdersByRestaurantId = async (restaurantId) => {
      try {
        const response = await getAllOrders(restaurantId);
        setOrderData(response?.data?.data || []);
        setErrorOrder(null); // reset error if successful
      } catch (err) {
        if (err.response?.status === 404) {
          setOrderData([]); // no food found
          setErrorOrder("No food data available.");
        } else {
          setErrorOrder("Something went wrong while fetching food.");
        }
      }
    };

    if (data?.id) {
      getAllFood(data.id);
      getAllOrdersByRestaurantId(data.id);
    }
  }, [data?.id]); // ✅ only depend on restaurant id

  // useEffect(() => {
  //   console.log(orderData);
  // }, [orderData]);

  return (
    <div className="panel-detail">
      <header>
        <h1>Restaurant Panel</h1>
        <div className="header-back-btn">
          <Button type="reset" onClick={() => navigate(-1)}>
            👈 Go Back
          </Button>
        </div>
      </header>
      <BasicDetail data={data} setTrigger={setRefreshTrigger} />
      <AssignedDetails title={"food"} data={foodData} error={error} />
      <AssignedDetails title={"order"} data={orderData} error={errorOrder} />
    </div>
  );
}

function BasicDetail({ data, setTrigger }) {
  const navigate = useNavigate();
  const goToEdit = (data) => {
    navigate(`/admin/restaurant/update/${data.id}`, { state: { data } });
    setTrigger((prev) => prev + 1);
  };

  const deleteRes = (id) => {
    deleteRestaurantById(id);
    navigate(-1);
  };

  return (
    <div className="basic-details">
      <header>{data?.restaurantName}</header>
      <div className="detail-body">
        <div className="left-side">
          <img alt="image" />
          <span>{data?.rating}⭐</span>
          <span>{data?.contactNumber}</span>
          <span>{data?.email}</span>
        </div>
        <div className="right-side">
          <span>Id : {data?.id}</span>
          <span>Delivery Time : {data?.deliveryTime} min</span>
          <span>Delivery Charges : ₹{data?.deliveryCharges}</span>
          <span>Address : {data?.address}</span>
          <div className="btn-div">
            <Button onClick={() => goToEdit(data)}>Edit</Button>
            <Button onClick={() => deleteRes(data?.id)}>Delete</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
