import "./style/Card.css";
import { Button } from "./Input";
import pizzaImg from "../assets/pizza.jpg";
import { useState } from "react";
import { useNavigate } from "react-router";

export function FoodCard({ food, foodMenu, addToCart, resId }) {
  const [expanded, setExpanded] = useState(false);
  const [foodQunatity, setFoodQuantity] = useState(0);
  // console.log("FoodCard Food : ", food);
  // console.log("ResId : ", resId);
  return (
    <>
      {/* <title>User Page</title> */}
      <div className={`card-container ${foodMenu === "foodMenu" && foodMenu}`}>
        <div className="card-body">
          <div className="card-left">
            <div className="food-symbol veg" />
            <header>
              <h3>{food.foodName}</h3>
              <div className="price-ratting">
                <div>{`₹${food.price}`}</div>
                <div>{`⭐4.3`}</div>
              </div>
            </header>
            <div className="card-description">
              <p>
                {expanded
                  ? food?.description
                  : food?.description?.length > 25
                  ? food?.description?.slice(0, 25) + "..."
                  : food?.description}
              </p>
              {food?.description?.length > 25 && (
                <span
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? " Show less" : " More"}
                </span>
              )}
            </div>
          </div>
          <div className="card-right">
            <img src={pizzaImg} alt="food img" />
          </div>
        </div>
        <div className="card-footer">
          {foodMenu === "foodMenu" ? (
            <>
              <button
                className="btn-count"
                onClick={() =>
                  setFoodQuantity(
                    foodQunatity != 0 ? foodQunatity - 1 : foodQunatity
                  )
                }
              >
                -
              </button>
              {foodQunatity}
              <button
                className="btn-count"
                onClick={() => setFoodQuantity(foodQunatity + 1)}
              >
                +
              </button>
              <button onClick={() => addToCart(resId, food?.id, foodQunatity)}>
                Add to Cart
              </button>
            </>
          ) : (
            <>
              <Button
                className="add-to-card"
                onClick={() => addToCart(food?.restaurantId, food?.id)}
              >
                ADD
              </Button>
              <span> Customization</span>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export function RestaurantCard({ restaurant }) {
  const navigate = useNavigate();
  const handleClick = (restaurantDetails) => {
    navigate("/res-details", {
      state: restaurantDetails,
    });
  };
  return (
    <div
      className="card-container res-card"
      onClick={() => handleClick(restaurant)}
    >
      <img src="#" alt="restaurant" />
      <div className="card-mid">
        <header>
          <span>{restaurant.restaurantName}</span>
          <span>{`⭐4.5`}</span>
        </header>
        <p>{restaurant.address}</p>

        <h5>{restaurant.contactNumber}</h5>
        <h5>{restaurant.email}</h5>
      </div>
      <footer>
        <div className="delivery-time">30-40 min</div>
        <div className="delivery-charges">Delivery: ₹50 </div>
      </footer>
    </div>
  );
}
