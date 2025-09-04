import { NavLink } from "react-router-dom";
import "./style/SideBar.css";

export default function Sidebar() {
  const sideComponent = {
    restaurant: [
      { label: "List Restaurant", path: "/admin/restaurants" },
      { label: "Add Restaurant", path: "/admin/restaurant/add" },
    ],
    food: [
      { label: "List Food", path: "/admin/food" },
      { label: "Add Food", path: "/admin/food/add" },
    ],
    admin: [{ label: "Manage Admins", path: "/admin/manage-admin" }],
    user: [
      { label: "List Users", path: "/admin/users" },
      { label: "Add User", path: "/admin/user/add" },
    ],
    cart: [{ label: "View Cart", path: "/admin/cart" }],
    // checkout: [{ label: "Checkout Details", path: "/admin/checkout" }],
    order: [{ label: "All Orders", path: "/admin/orders" }],
  };

  return (
    <aside className="sidebar">
      {Object.entries(sideComponent).map(([section, items]) => (
        <div key={section} className="sidebar-section">
          <h3 className="sidebar-title">{section.toUpperCase()}</h3>
          <ul>
            {items.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path} activeclassname="active">
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}
