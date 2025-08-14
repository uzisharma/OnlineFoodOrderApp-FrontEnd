import { Outlet } from "react-router";
import NavBar from "./components/NavBar";
import "./Layout.css";
export default function Layout({ role }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ height: "80px", flexShrink: 0 }}>
        <NavBar role={role} />
      </div>
      <div style={{ flex: "1", overflowY: "auto" }}>
        <Outlet />
      </div>
    </div>
  );
}
