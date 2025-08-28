import { useEffect, useState } from "react";
import { useRole } from "../context/RoleContext";
import { Button } from "../components/Input";
import "./style/UserCart.css";
import axios from "axios";

export default function UserCart() {
  const [cart, setCart] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;
  const { cartItemCount, setCartItemCount, userDetails } = useRole();

  useEffect(() => {
    if (!userDetails?.id || cartItemCount < 1) return;
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/cart/get/${userDetails?.id}`
        );
        setCart(response?.data?.data?.userCartItem);
      } catch (err) {
        if (err.response) {
          // 👇 Access your backend ResponseStructure
          console.error("Backend Error:", err.response.data);
          alert(err.response.data.data);
        } else {
          console.error("Unexpected Error:", err.message);
        }
      }
    };
    fetchCart();
  }, [userDetails, cartItemCount, API_URL]);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const checkOutHandler = () => {};
  const clearCartHandler = async () => {
    if (cartItemCount < 1) return;
    try {
      await axios.delete(`${API_URL}/cart/${userDetails?.id}/delete`);
      setCart({ cartRestaurant: [], cartPrice: 0 });
      setCartItemCount(0);
    } catch (err) {
      if (err.response) {
        // 👇 Access your backend ResponseStructure
        console.error("Backend Error:", err.response.data);
        alert(err.response.data.data);
      } else {
        console.error("Unexpected Error:", err.message);
      }
    }
  };
  return (
    <>
      {/* <h2>user cart</h2> */}
      <div className="user-cart">
        {cart?.cartRestaurant?.length > 0 ? (
          cart?.cartRestaurant.map((cartLine) => (
            <UserCartList key={cartLine?.id} cartLine={cartLine} />
          ))
        ) : (
          <p>No Item in cart</p>
        )}
        <div className="bottom-container">
          <div className="total-price">
            <span>Total Price = </span>
            {cart?.cartPrice}
          </div>
          <div className="btn-container">
            <Button type="reset" onClick={clearCartHandler}>
              Clear Cart{" "}
            </Button>
            <Button onClick={checkOutHandler}>Checkout </Button>
          </div>
        </div>
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
