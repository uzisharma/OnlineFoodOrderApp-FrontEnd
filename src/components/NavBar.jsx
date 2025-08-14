import { Link } from "react-router";
import "./style/NavBar.css";
import logo from "../assets/logo.png";

export default function NavBar({ role }) {
  return (
    <nav>
      <div className="left-container">
        <img src={logo} alt="logo" />
        <Link className="header-link-element" to={"/"}>
          <h1>Online Food Order Application</h1>
        </Link>
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
        <Link className="link-element" to="/listFood">
          View Food
        </Link>
        <Link className="link-element" to="/login">
          {role} LoginForm
        </Link>
      </div>
    </nav>
  );
}
