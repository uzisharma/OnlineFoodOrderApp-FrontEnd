import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import Layout from "./Layout";
import LoginOrRegister from "./pages/LoginOrRegister";

import UserPage from "./pages/user/UserPage";
import RestaurantPage from "./pages/user/RestaurantPage";
import UserCart from "./pages/user/UserCart";
import BillingDetails from "./pages/user/BillingDetails";
import PaymentPage from "./pages/user/PaymentPage";

import AddRestaurant from "./pages/admin/restaurant/AddRestaurant";
import RestaurantList from "./pages/admin/restaurant/RestaurantList";
import EditRestaurant from "./pages/admin/restaurant/EditRestaurant";

import AdminPage from "./pages/admin/admin/AdminPage";

import AddFood from "./pages/admin/food/AddFood";
import EditFood from "./pages/admin/food/EditFood";
import FoodList from "./pages/admin/food/FoodList";

import UserList from "./pages/admin/user/UserList";
import EditUser from "./pages/admin/user/EditUser";
import OrderList from "./pages/admin/order/OrderList";
import CartList from "./pages/admin/cart/CartList";
import CartDetails from "./components/CartDetails";
import AddUser from "./pages/admin/user/AddUser";
import RestaurantPanel from "./pages/admin/restaurant/RestaurantPannel";
import FoodPanel from "./pages/admin/food/FoodPanel";
import UserPanel from "./pages/admin/user/UserPanel";
import AdminList from "./pages/admin/admin/AdminList";
import OrderPanel from "./pages/admin/order/OrderPanel";
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
            <Route path="manage-admin" element={<AdminList />} />

            <Route path="restaurants" element={<RestaurantList />} />
            <Route path="restaurant/add" element={<AddRestaurant />} />
            <Route path="restaurant/update/:id" element={<EditRestaurant />} />
            <Route
              path="restaurants/restaurant-details"
              element={<RestaurantPanel />}
            />

            <Route path="food" element={<FoodList />} />
            <Route path="food/add" element={<AddFood />} />
            <Route path="food/update/:id" element={<EditFood />} />
            <Route path="food/food-details" element={<FoodPanel />} />

            <Route path="users" element={<UserList />} />
            <Route path="user/add" element={<AddUser />} />
            <Route path="user/update/:id" element={<EditUser />} />
            <Route path="users/user-details" element={<UserPanel />} />
            <Route
              path="cart/cart-details/userId/:id"
              element={<CartDetails />}
            />
            <Route path="orders" element={<OrderList />} />
            <Route path="orders/order-details" element={<OrderPanel />} />
            <Route path="/admin/cart" element={<CartList />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
