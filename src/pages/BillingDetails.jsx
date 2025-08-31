import { useLocation, useNavigate } from "react-router";
import "./style/BillingDetails.css";
import { Button } from "../components/Input";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRole } from "../context/RoleContext";

export default function BillingDetails() {
  const [placed, setPlaced] = useState(false);
  const location = useLocation();
  const API_URL = import.meta.env.VITE_API_URL;
  const { data, paymentStatus } = location.state || {};
  const { setCartItemCount } = useRole();
  const navigate = useNavigate();

  const placeOrder = async (cartId, paymentStatus) => {
    try {
      const response = await axios.post(`${API_URL}/place-order/place`, {
        cartId,
        paymentStatus,
      });
      console.log(response);
      setCartItemCount(0);
      setPlaced(true);
    } catch (err) {
      if (err.response) {
        console.error("Backend error : ", err.response.data);
      } else {
        console.error("Unexpected error : ", err.message);
      }
    }
  };

  useEffect(() => {
    if (paymentStatus && data?.cartId) {
      placeOrder(data.cartId, paymentStatus);
    }
  }, [paymentStatus, data.cartId]);

  return (
    <div className="billing-details">
      <div className="bill-card">
        <h1>Order Summary</h1>
        <div className="top">
          <h2>{data?.restaurantName}</h2>
          <div className="order-summary">
            <h3>Order : </h3>
            {data?.orderSummary.map((ord) => (
              <Order key={ord.foodName} ord={ord} />
            ))}
          </div>
        </div>
        <div className="bottom">
          <div>
            <span>Amount</span>
            <span> = </span>
            <span>{data?.originalAmount}</span>
          </div>
          <div>
            <span>GST % </span>
            <span> = </span>
            <span>
              {data?.gstPercent}
              {" %"}
            </span>
          </div>
          <div>
            <span>GST Charge</span>
            <span> = </span>
            <span>{data?.gstAmount}</span>
          </div>
          <div>
            <span>Total Amount</span>
            <span> = </span>
            <span>{data?.totalAmount}</span>
          </div>
        </div>
      </div>
      <div className="footer">
        {placed ? (
          <span>Order Placed Successfully</span>
        ) : (
          <Button
            onClick={() =>
              navigate("/payment", {
                state: { data },
              })
            }
          >
            Pay and Place
          </Button>
        )}
      </div>
    </div>
  );
}

function Order({ ord }) {
  return (
    <div>
      <span>{ord?.foodName}</span>
      <span> X </span>
      <span>{ord?.quantity}</span>
      <span> = </span>
      <span>{ord?.quantityPrice}</span>
    </div>
  );
}
