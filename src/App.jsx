import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import AddRestaurant from "./pages/AddRestaurant";
import RestaurantList from "./pages/RestaurantList";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/addRestaurant" element={<AddRestaurant />}></Route>
        <Route path="/listRestaurant" element={<RestaurantList />}></Route>
      </Routes>
    </>
  );
}

export default App;
