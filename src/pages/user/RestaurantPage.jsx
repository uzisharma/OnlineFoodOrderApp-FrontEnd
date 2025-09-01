import { useLocation } from "react-router";
import "./style/RestaurantPage.css";
import { FoodCard } from "../../components/Card";
import { useRole } from "../../context/RoleContext";
import { addToCart } from "../../service/cartService";

export default function RestaurantPage() {
  const location = useLocation();
  const { setCartItemCount, userDetails } = useRole();
  const data = location.state;

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
        <h1>{data.restaurantName}</h1>
        <span className="rating">{`⭐4.5`}</span>
        <span>{data.address}</span>
        <span>{data.contactNumber}</span>
        <span>{data.email}</span>
        <div className="res-sub-details">
          <SubDetails top={"Delivery Time"} bottom={"30-40 min"} />
          <SubDetails top={"Delivery Time"} bottom={"30-40 min"} />
          <SubDetails top={"Delivery Time"} bottom={"30-40 min"} />
        </div>
      </div>
      <div className="res-menu">
        <header>Menu</header>
        <div className="menu-list">
          {data?.food.map((foodDetails) => (
            <FoodCard
              foodMenu={"foodMenu"}
              key={foodDetails?.id}
              food={foodDetails}
              addToCart={handleAddToCart}
              resId={data?.id}
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
