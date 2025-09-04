import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { getOrderById } from "../../../service/orderService";
import { Button } from "../../../components/Input";
import "./style/OrderPanel.css";

export default function OrderPanel() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state || {};
  const [orderData, setOrderData] = useState();

  useEffect(() => {
    const fetchRestaurant = async (id) => {
      try {
        const response = await getOrderById(id);
        setOrderData(response?.data?.data || {}); // ✅ store actual restaurant
      } catch (err) {
        console.error("Failed to fetch Order By Id:", err);
        setOrderData({});
      }
    };

    if (data?.id) {
      fetchRestaurant(data.id);
    }
  }, [data?.id]);

  useEffect(() => {
    console.log(orderData);
  }, [orderData]);

  return (
    <div className="panel-detail">
      <header>
        <h1>Order Panel</h1>
        <div className="header-back-btn">
          <Button type="reset" onClick={() => navigate(-1)}>
            👈 Go Back
          </Button>
        </div>
      </header>
      <div className="panel-body">
        <div>
          <span>Order Id</span>
          <span>:</span>
          <span>{orderData?.id}</span>
        </div>
        <div>
          <span>Payment Status</span>
          <span>:</span>
          <span>{orderData?.paymentStatus}</span>
        </div>
        <div>
          <span>User Id</span>
          <span>:</span>
          <span>{orderData?.userId}</span>
        </div>
        <div>
          <span>User Name</span>
          <span>:</span>
          <span>{orderData?.userName}</span>
        </div>
        <div>
          <span>Delivery Date</span>
          <span>:</span>
          <span>{orderData?.deliveryDate}</span>
        </div>
        <div>
          <span>Delivery Time</span>
          <span>:</span>
          <span>{orderData?.deliveryTime}</span>
        </div>
        <div>
          <span>Restaurant Name</span>
          <span>:</span>
          <span>{orderData?.restaurantName}</span>
        </div>
        <div>
          <span>Order Item</span>
          <span>:</span>
          <table>
            <thead>
              <tr>
                <th>Food Name</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {orderData?.orderItem.map((food) => (
                <tr key={food?.id}>
                  <td>{food?.food?.foodName}</td>
                  <td>{food?.quantity}</td>
                  <td>{food?.quantityPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <span>Total Price</span>
          <span>:</span>
          <span>{orderData?.totalPrice}</span>
        </div>
      </div>
    </div>
  );
}
