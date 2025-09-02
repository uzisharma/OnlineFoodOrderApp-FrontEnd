import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import { Button } from "../components/Input";
import "./style/CartDetails.css";

export default function CartDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state || {};

  const userCart = cart?.userCartItem;

  useEffect(() => {
    console.log(cart);
  }, []);

  return (
    <div className="cart-container">
      <header className="cart-heading">
        User Cart
        <div className="header-back-btn">
          <Button type="reset" onClick={() => navigate(-1)}>
            👈 Go Back
          </Button>
        </div>
      </header>
      <div className="cart-card">
        <div className="cart-header">
          <h3>Cart #{cart?.cartId}</h3>
          <span>Total Price: ₹{userCart?.cartPrice}</span>
        </div>

        <div className="cart-info">
          <p>
            <b>User Name</b> {cart?.userName}
          </p>
          <p>
            <b>RestaurantId:</b> {userCart?.restaurantId}
          </p>
          <p>
            <b>Total Items:</b> {userCart?.totalCartItem}
          </p>
        </div>

        <table className="food-table">
          <thead>
            <tr>
              <th>Food</th>
              <th>Description</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {userCart?.cartRestaurant?.map((item) => (
              <tr key={item?.id}>
                <td>{item?.food?.foodName}</td>
                <td>{item?.food?.description}</td>
                <td>{item?.quantity}</td>
                <td>₹{item?.quantityPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
