import { useEffect, useState } from "react";
import { useRole } from "../context/RoleContext";
import { Button } from "../components/Input";
import "./style/UserCart.css";
import axios from "axios";
import { useNavigate } from "react-router";

export default function UserCart() {
  const [cartItem, setCartItem] = useState(null);
  const [cart, setCart] = useState();
  const API_URL = import.meta.env.VITE_API_URL;
  const { cartItemCount, setCartItemCount, userDetails } = useRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userDetails?.id || cartItemCount < 1) return;
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/cart/get/${userDetails?.id}`
        );
        setCart(response?.data?.data);
        setCartItem(response?.data?.data?.userCartItem);
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
    // console.log(cartItem);
  }, [cart]);

  const checkOutHandler = async (cartId) => {
    try {
      const response = await axios.post(`${API_URL}/checkout/add/${cartId}`);
      navigate("/billing-details", { state: { data: response?.data?.data } });
    } catch (err) {
      if (err.response) {
        console.error("Backend error : ", err.response.data);
      } else {
        console.error("Unexpected error : ", err.message);
      }
    }
  };

  const clearCartHandler = async () => {
    if (cartItemCount < 1) return;
    try {
      await axios.delete(`${API_URL}/cart-item/${userDetails?.id}/delete`);
      setCartItem({ cartRestaurant: [], cartPrice: 0 });
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
        {cartItem?.cartRestaurant?.length > 0 ? (
          cartItem?.cartRestaurant.map((cartLine) => (
            <UserCartList key={cartLine?.id} cartLine={cartLine} />
          ))
        ) : (
          <p>No Item in cart</p>
        )}
        <div className="bottom-container">
          <div className="total-price">
            <span>Total Price = </span>
            {cartItem?.cartPrice}
          </div>
          <div className="btn-container">
            <Button type="reset" onClick={clearCartHandler}>
              Clear Cart{" "}
            </Button>
            <Button onClick={() => checkOutHandler(cart?.id)}>Checkout </Button>
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
