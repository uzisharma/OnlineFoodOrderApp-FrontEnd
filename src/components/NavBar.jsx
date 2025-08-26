import { Link, useNavigate } from "react-router";
import "./style/NavBar.css";
import logo from "../assets/logo.png";
import cartIcon from "../assets/cartIcon.png";
import { useRole } from "../context/RoleContext";
import { Button } from "./Input";
import SearchBar from "./SearchBar";

export default function NavBar() {
  const { cartItemCount, role, isLogged, setIsLogged, setUserDetails } =
    useRole();
  const navigate = useNavigate();

  const handleLogOut = () => {
    setIsLogged(false);
    setUserDetails(null);
    navigate("/");
  };

  const cartDetailsHandleClick = () => {
    navigate("/user-cart-details");
  };

  return (
    <nav>
      <div className="left-container">
        <img src={logo} alt="logo" />
        <Link className="header-link-element" to={"/"}>
          <h1>Online Food Order Application</h1>
        </Link>
      </div>
      <div className="right-container">
        {role === "admin" ? (
          <>
            <Link className="link-element" to="/">
              HomePage
            </Link>
            <Link className="link-element" to="/addRestaurant">
              Add Restaurant
            </Link>
            <Link className="link-element" to="/listRestaurant">
              View Restaurants
            </Link>
            <Link className="link-element" to="/listFood">
              View Food
            </Link>
          </>
        ) : (
          <>
            <SearchBar />
          </>
        )}
        {isLogged ? (
          <>
            <Button type="submit" onClick={handleLogOut}>
              Log-Out
            </Button>
            <div className="cart-btn" onClick={cartDetailsHandleClick}>
              <img src={cartIcon} alt={"cartImg"} width={"60"} height={"60"} />
              <span>{cartItemCount}</span>
            </div>
          </>
        ) : (
          <Link className="link-element" to="/login">
            Login/SignUp
          </Link>
        )}
      </div>
    </nav>
  );
}
