import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  deleteUserById,
  getAllPlacedOrder,
  getCartByUserId,
  getUserById,
} from "../../../service/userService";
import AssignedDetails from "../../../components/AssignedDetail";
import { Button } from "../../../components/Input";
import CartDetails from "../../../components/CartDetails";
import Header from "../../../components/Header";

export default function UserPanel() {
  const location = useLocation();
  const data = location.state || {};

  const [userData, setUserData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [orderData, setOrderData] = useState([]);

  const [errorOrder, setErrorOrder] = useState(null);

  useEffect(() => {
    const fetchUser = async (id) => {
      try {
        const response = await getUserById(id);
        setUserData(response?.data?.data || {}); // ✅ store actual restaurant
      } catch (err) {
        console.error("Failed to fetch User:", err);
        setUserData({});
      }
    };

    if (data?.id) {
      fetchUser(data.id);
    }
  }, [data?.id]);

  useEffect(() => {
    const getUserCart = async (userId) => {
      try {
        const response = await getCartByUserId(userId);
        setCartData(response?.data?.data || []);
        // console.log(response?.data?.data);
      } catch (err) {
        if (err.response?.status === 404) {
          setCartData([]); // no food found
        }
      }
    };

    const getAllOrderPlaced = async (userId) => {
      try {
        const response = await getAllPlacedOrder(userId);
        setOrderData(response?.data?.data?.content || []);
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
      getUserCart(data.id);
      getAllOrderPlaced(data.id);
    }
  }, [data?.id]); // ✅ only depend on user id

  return (
    <div className="panel-detail">
      <Header heading={"User Panel"} />

      <BasicDetail data={userData} />
      <CartDetails receivedCart={cartData} />
      <AssignedDetails title={"order"} data={orderData} error={errorOrder} />
    </div>
  );
}

function BasicDetail({ data }) {
  const navigate = useNavigate();
  const goToEdit = (data) => {
    navigate(`/admin/user/update/${data.id}`, { state: { data } });
  };

  const deleteRes = (id) => {
    deleteUserById(id);
    navigate(-1);
  };

  return (
    <div className="basic-details">
      <header>{data?.userName}</header>
      <div className="detail-body">
        <div className="left-side">
          <img alt="image" />
          <span>Contact Number : {data?.contactNumber}</span>
          <span>Email : {data?.email}</span>
        </div>
        <div className="right-side">
          <span>Id : {data?.id}</span>
          <span>Gender : {data?.gender}</span>
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
