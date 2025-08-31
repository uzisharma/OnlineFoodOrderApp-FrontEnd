import { useEffect, useState } from "react";
import { Button, SelectInput } from "../components/Input";
import { useLocation, useNavigate } from "react-router";
import { useRole } from "../context/RoleContext";
import axios from "axios";

export default function PaymentPage() {
  const [status, setStatus] = useState("");
  const options = ["COMPLETED", "FAILED"];
  const { setCartItemCount } = useRole();

  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state || {};
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!data) {
      navigate("/billing-details", { replace: true });
    }
  }, [data, navigate]);

  const placeOrder = async (cartId) => {
    try {
      const response = await axios.post(`${API_URL}/place-order/place`, {
        cartId,
        paymentStatus: status,
      });
      console.log(response);
      if (status === "COMPLETED") {
        setCartItemCount(0);
      }
    } catch (err) {
      if (err.response) {
        console.error("Backend error : ", err.response.data);
      } else {
        console.error("Unexpected error : ", err.message);
      }
    }
  };

  const confirmPayment = () => {
    if (!status) return alert("Please select a payment status.");

    placeOrder(data?.cartId);

    navigate("/billing-details", {
      state: { data, paymentStatus: status },
      replace: true,
    });
  };

  if (!data) return null;

  return (
    <div className="payment-page-card">
      <SelectInput
        label="Payment Status"
        options={options}
        value={status}
        onChange={setStatus}
      />
      <Button onClick={confirmPayment}>Confirm Payment</Button>
    </div>
  );
}
