import { useLocation } from "react-router";
import "./style/RestaurantPage.css";
import { FoodCard } from "../../components/Card";
import { useRole } from "../../context/RoleContext";
import { addToCart } from "../../service/cartService";
import { useEffect, useState } from "react";
import { getRestaurantById } from "../../service/restaurantService";

export default function RestaurantPage() {
  const location = useLocation();
  const { setCartItemCount, userDetails } = useRole();
  const [resData, setResData] = useState();
  const data = location.state || {};

  useEffect(() => {
    const fetchRestaurant = async (id) => {
      try {
        const response = await getRestaurantById(id);
        setResData(response?.data?.data || {}); // ✅ store actual restaurant
      } catch (err) {
        console.error("Failed to fetch restaurant:", err);
        setResData({});
      }
    };

    if (data?.id) {
      fetchRestaurant(data.id);
    }
  }, [data?.id]);

  const handleAddToCart = async (restaurantId, foodId, quantity) => {
    const response = await addToCart(
      userDetails?.id,
      restaurantId,
      foodId,
      quantity
    );
    setCartItemCount(response?.data?.userCartItem?.totalCartItem);
  };

  return (
    <div className="restaurant-page">
      <div className="res-details">
        <h1>{resData?.restaurantName}</h1>
        <span className="rating">{`⭐4.5`}</span>
        <span>{resData?.address}</span>
        <span>{resData?.contactNumber}</span>
        <span>{resData?.email}</span>
        <div className="res-sub-details">
          <SubDetails top={"Delivery Time"} bottom={"30-40 min"} />
          <SubDetails top={"Delivery Time"} bottom={"30-40 min"} />
          <SubDetails top={"Delivery Time"} bottom={"30-40 min"} />
        </div>
      </div>
      <div className="res-menu">
        <header>Menu</header>
        <div className="menu-list">
          {resData?.foodList.map((foodDetails) => (
            <FoodCard
              foodMenu={"foodMenu"}
              key={foodDetails?.id}
              food={foodDetails}
              addToCart={handleAddToCart}
              resId={resData?.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SubDetails({ top, bottom }) {
  return (
    <div className="sub-details">
      <h6>{top}</h6>
      <h5>{bottom}</h5>
    </div>
  );
}
