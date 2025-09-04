import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getOrderById } from "../../../service/orderService";
import { Button, GoBackButton } from "../../../components/Input";
import "./style/OrderPanel.css";
import Header from "../../../components/Header";

export default function OrderPanel() {
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

  const orderDetails = [
    { title: "Order Id", data: orderData?.id },
    { title: "Payment Status", data: orderData?.paymentStatus },
    { title: "User Id", data: orderData?.userId },
    { title: "User Name", data: orderData?.userName },
    { title: "Delivery Date", data: orderData?.deliveryDate },
    { title: "Delivery Time", data: orderData?.deliveryTime },
  ];

  return (
    <div className="panel-detail">
      <Header heading={"Order Panel"} />
      <div className="panel-body">
        {orderDetails.map((item, idx) => (
          <PannelDiv key={idx} title={item.title} data={item.data} />
        ))}

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

        <PannelDiv title={"Total Price"} data={orderData?.totalPrice} />
      </div>
    </div>
  );
}

function PannelDiv({ title, data }) {
  return (
    <div>
      <span>{title}</span>
      <span>:</span>
      <span>{data}</span>
    </div>
  );
}
