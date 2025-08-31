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
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/addRestaurant" element={<AddRestaurant />} />
          <Route path="/listRestaurant" element={<RestaurantList />} />
          <Route path="/listFood" element={<FoodList />} />
          <Route path="/restaurant-details/:id" element={<EditRestaurant />} />
          <Route path="/login" element={<LoginOrRegister />} />
          <Route path="/user-page" element={<UserPage />} />
          <Route path="/admin-page" element={<AdminPage />} />
          <Route path="/res-details" element={<RestaurantPage />} />
          <Route path="/user-cart-details" element={<UserCart />} />
          <Route path="/billing-details" element={<BillingDetails />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
