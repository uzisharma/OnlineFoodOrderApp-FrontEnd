import { Link } from "react-router";
import "./NavBar.css";
import logo from "../assets/logo.png";

export default function NavBar() {
  return (
    <nav>
      <div className="left-container">
        <img src={logo} alt="logo" />
        <h1>Online Food Order Application</h1>
      </div>
      <div className="right-container">
        <Link className="link-element" to="/">
          HomePage
        </Link>
        <Link className="link-element" to="/addRestaurant">
          Add Restaurant
        </Link>
        <Link className="link-element" to="/listRestaurant">
          View Restaurants
        </Link>
      </div>
    </nav>
  );
}
