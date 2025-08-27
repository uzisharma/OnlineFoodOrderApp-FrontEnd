import { useEffect, useState } from "react";
import { useRole } from "../context/RoleContext";
import "./style/UserCart.css";
import axios from "axios";

export default function UserCart() {
  const [cart, setCart] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;
  const { userDetails } = useRole();

  useEffect(() => {
    if (!userDetails?.id) return;
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/cart/get/${userDetails?.id}`
        );
        setCart(response?.data?.data?.cartItem);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCart();
  }, [userDetails, API_URL]);

  useEffect(() => {
    console.log(cart);
  }, [cart]);
  return (
    <>
      <h2>user cart</h2>
      <div className="user-cart">
        {cart?.cartRestaurant?.length > 0 ? (
          cart?.cartRestaurant.map((cartLine) => (
            <UserCartList key={cartLine?.id} cartLine={cartLine} />
          ))
        ) : (
          <p>No Item in cart</p>
        )}
      </div>
    </>
  );
}

export function UserCartList({ cartLine }) {
  return (
    <>
      <div className="food-cart" key={cartLine.id}>
        <div className="left-container">
          <div className="food-name">{cartLine?.food?.foodName}</div>
        </div>

        <div className="right-container">
          <div>{cartLine?.quantity}</div>
          <div>X</div>
          <div>{cartLine?.food?.price}</div>
          <div>=</div>
          <div>{cartLine?.quantityPrice}</div>
        </div>
      </div>
    </>
  );
}
