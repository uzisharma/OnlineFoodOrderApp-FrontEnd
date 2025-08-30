import { useLocation } from "react-router";
import "./style/BillingDetails.css";

export default function BillingDetails() {
  const location = useLocation();

  const { data } = location.state || {};

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
