import { useEffect, useState } from "react";
import { FoodCard, RestaurantCard } from "../../components/Card";
import "./style/UserPage.css";
import { useRole } from "../../context/RoleContext";
import { addToCart } from "../../service/cartService";

export default function UserPage() {
  const [foodList, setFoodList] = useState([]);
  const [resList, setResList] = useState([]);
  const { setCartItemCount, userDetails } = useRole();

  useEffect(() => {
    const url = "http://localhost:8080/api";
    const foodUrl = `${url}/food/getAll`;
    const fetchFood = async () => {
      const response = await fetch(foodUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setFoodList(data.data.content);
    };

    const resUrl = `${url}/restaurant/getAll`;
    const fetchRestaurant = async () => {
      const response = await fetch(resUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setResList(data.data.content);
    };

    fetchFood();
    fetchRestaurant();
  }, []);

  const handleAddToCart = async (restaurantId, foodId, quantity) => {
    let resId;
    if (restaurantId.length === 0) {
      resId = 1;
    } else {
      resId = restaurantId[0];
    }
    const response = await addToCart(userDetails?.id, resId, foodId, quantity);
    setCartItemCount(response?.data?.userCartItem?.totalCartItem);
  };

  return (
    <div className="userPage-container">
      <div className="food-container">
        <h1>Most Ordered</h1>
        <div className="food-list">
          {foodList.map((food) => (
            <FoodCard key={food.id} food={food} addToCart={handleAddToCart} />
          ))}
        </div>
      </div>
      <div className="restaurant-container">
        <h2>Popular Restaurant</h2>
        <div className="restaurant-list">
          {resList.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </div>
  );
}
