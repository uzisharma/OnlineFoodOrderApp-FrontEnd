import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import "./style/RestaurantPanel.css";
import { Button } from "../../../components/Input";
import {
  getAssignedFood,
  getAllOrders,
  deleteRestaurantById,
  getRestaurantById,
} from "../../../service/restaurantService";
import AssignedDetails from "../../../components/AssignedDetail";
import Header from "../../../components/Header";

export default function RestaurantPanel() {
  const [resData, setResData] = useState([]);
  const [foodData, setFoodData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [error, setError] = useState(null);
  const [errorOrder, setErrorOrder] = useState(null);

  const location = useLocation();
  const data = location.state || {};

  useEffect(() => {
    const fetchRestaurant = async (id) => {
      try {
        const response = await getRestaurantById(id);
        setResData(response?.data?.data || {}); // ✅ store actual restaurant
      } catch (err) {
        console.error("Failed to fetch restaurant:", err);
        setResData({});
      }
    };

    if (data?.id) {
      fetchRestaurant(data.id);
    }
  }, [data?.id]);

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
      <Header heading={"Restaurant Panel"} />
      <BasicDetail data={resData} />
      <AssignedDetails title={"food"} data={foodData} error={error} />
      <AssignedDetails title={"order"} data={orderData} error={errorOrder} />
    </div>
  );
}

function BasicDetail({ data }) {
  const navigate = useNavigate();
  const goToEdit = (data) => {
    navigate(`/admin/restaurant/update/${data.id}`, { state: { data } });
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
