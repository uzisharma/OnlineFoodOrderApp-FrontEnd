// src/pages/EditFood.jsx
import { updateFoodById } from "../service/foodService";
import GenericEditPage from "./GenericEditPage";

export default function EditFood() {
  return <GenericEditPage title="Food" updateFn={updateFoodById} />;
}
