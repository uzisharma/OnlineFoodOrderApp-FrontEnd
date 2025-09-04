import { Outlet } from "react-router";
import Sidebar from "../../../components/SideBar";
import "./style/AdminPage.css";

export default function AdminPage() {
  return (
    <div className="admin-page">
      <Sidebar />
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}
