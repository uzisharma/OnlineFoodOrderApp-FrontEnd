import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import AddRestaurant from "./pages/AddRestaurant";
import RestaurantList from "./pages/RestaurantList";
import EditRestaurant from "./pages/EditRestaurant";
import FoodList from "./pages/FoodList";
import LoginOrRegister from "./pages/LoginOrRegister";
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/addRestaurant" element={<AddRestaurant />}></Route>
        <Route path="/listRestaurant" element={<RestaurantList />}></Route>
        <Route path="/listFood" element={<FoodList />}></Route>
        <Route path="/restaurant-details/:id" element={<EditRestaurant />} />
        <Route path="/login" element={<LoginOrRegister />} />
      </Routes>
    </>
  );
}

export default App;
