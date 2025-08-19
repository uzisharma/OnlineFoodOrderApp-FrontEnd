import { useLocation } from "react-router";
import { Button } from "../components/Input";

export default function RestaurantPage() {
  const location = useLocation();
  const data = location.state;
  console.log(data);
  return (
    <>
      <h1>Restaurant Page</h1>
    </>
  );
}
