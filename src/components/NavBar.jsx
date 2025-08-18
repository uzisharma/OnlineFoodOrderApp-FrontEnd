import { Link } from "react-router";
import "./style/NavBar.css";
import logo from "../assets/logo.png";
import { useRole } from "../context/RoleContext";

export default function NavBar() {
  const { role } = useRole();
  return (
    <nav>
      <div className="left-container">
        <img src={logo} alt="logo" />
        <Link className="header-link-element" to={"/"}>
          <h1>Online Food Order Application</h1>
        </Link>
      </div>
      <div className="right-container">
        {role === "admin" && (
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
        )}
        {role === "user" && (
          <>
            <Link className="link-element" to="/listRestaurant">
              View Restaurants
            </Link>
            <Link className="link-element" to="/listFood">
              View Food
            </Link>
          </>
        )}
        <Link className="link-element" to="/login">
          Login/SignUp
        </Link>
      </div>
    </nav>
  );
}
