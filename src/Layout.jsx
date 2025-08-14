import { Outlet } from "react-router";
import NavBar from "./components/NavBar";
import "./Layout.css";
export default function Layout({ role }) {
  return (
    <div className="app-content">
      <div className="nav-content">
        <NavBar role={role} />
      </div>
      <div className="body-content">
        <Outlet />
      </div>
    </div>
  );
}
