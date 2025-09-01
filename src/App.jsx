import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import AddRestaurant from "./pages/AddRestaurant";
import RestaurantList from "./pages/RestaurantList";
import EditRestaurant from "./pages/EditRestaurant";
import FoodList from "./pages/FoodList";
import LoginOrRegister from "./pages/LoginOrRegister";
import UserPage from "./pages/UserPage";
import Layout from "./Layout";
import RestaurantPage from "./pages/RestaurantPage";
import UserCart from "./pages/UserCart";
import BillingDetails from "./pages/BillingDetails";
import PaymentPage from "./pages/PaymentPage";
import AdminPage from "./pages/AdminPage";
import AddFood from "./pages/AddFood";
import UserList from "./pages/UserList";
import EditFood from "./pages/EditFood";
import EditUser from "./pages/EditUser";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          {/* <Route path="/restaurant-details/:id" element={<EditRestaurant />} /> */}
          <Route path="/login" element={<LoginOrRegister />} />
          <Route path="/user-page" element={<UserPage />} />
          <Route path="/res-details" element={<RestaurantPage />} />
          <Route path="/user-cart-details" element={<UserCart />} />
          <Route path="/billing-details" element={<BillingDetails />} />
          <Route path="/payment" element={<PaymentPage />} />

          {/* Admin Layout */}
          <Route path="admin" element={<AdminPage />}>
            <Route path="/admin/restaurants" element={<RestaurantList />} />
            <Route path="/admin/restaurant/add" element={<AddRestaurant />} />
            <Route
              path="/admin/restaurant/update/:id"
              element={<EditRestaurant />}
            />
            <Route path="/admin/food" element={<FoodList />} />
            <Route path="/admin/food/add" element={<AddFood />} />
            <Route path="/admin/food/update/:id" element={<EditFood />} />
            <Route path="/admin/users" element={<UserList />} />
            <Route path="/admin/user/update/:id" element={<EditUser />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
