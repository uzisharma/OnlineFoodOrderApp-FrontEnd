import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import AddRestaurant from "./pages/AddRestaurant";
import RestaurantList from "./pages/RestaurantList";
import EditRestaurant from "./pages/EditRestaurant";
import FoodList from "./pages/FoodList";
import LoginOrRegister from "./pages/LoginOrRegister";
import { useState } from "react";
import UserPage from "./pages/UserPage";
import Layout from "./Layout";
function App() {
  const [role, setRole] = useState("user");
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout role={role} />}>
          <Route index element={<HomePage />} />
          <Route path="/addRestaurant" element={<AddRestaurant />} />
          <Route path="/listRestaurant" element={<RestaurantList />} />
          <Route path="/listFood" element={<FoodList />} />
          <Route path="/restaurant-details/:id" element={<EditRestaurant />} />
          <Route
            path="/login"
            element={<LoginOrRegister role={role} setRole={setRole} />}
          />
          <Route path="/user-page" element={<UserPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
