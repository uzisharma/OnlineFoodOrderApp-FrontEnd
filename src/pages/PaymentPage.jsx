import { useEffect, useState } from "react";
import { Button, SelectInput } from "../components/Input";
import { useLocation, useNavigate } from "react-router";

export default function PaymentPage({ setPaymentStatus }) {
  const [status, setStatus] = useState("");
  const options = ["COMPLETED", "FAILED"];
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state || {};

  useEffect(() => {
    if (!data) {
      navigate("/billing-details", { replace: true });
    }
  }, [data, navigate]);

  const confirmPayment = () => {
    if (!status) return alert("Please select a payment status.");
    navigate("/billing-details", {
      state: { data, paymentStatus: status },
      replace: true,
    });
    setPaymentStatus(status);
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
