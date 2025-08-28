import { useNavigate } from "react-router";
import "./style/HomePage.css";

export default function HomePage() {
  const navigate = useNavigate();
  const goToUserPage = () => {
    navigate("/user-page");
  };

  return (
    <>
      <title>Home Page</title>
      <div className="homepage-container">
        <h1>Welcome to Online Food Order</h1>
        <h2>Order your favorite meals quickly and easily!</h2>
        <button onClick={goToUserPage} className="start-order-btn">
          Start Ordering
        </button>
      </div>
    </>
  );
}
