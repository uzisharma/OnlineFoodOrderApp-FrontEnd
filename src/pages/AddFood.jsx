import Form from "../components/Form";
import { saveFood } from "../service/foodService";

export default function AddFood() {
  const initialData = {
    foodName: "",
    description: "",
    price: "",
  };

  const addFood = async (formData) => {
    const foodData = {
      foodName: formData.foodName,
      description: formData.description,
      price: formData.price,
    };

    try {
      const response = await saveFood(foodData);
      console.log("Food Saved :", response.data);
    } catch (error) {
      if (error.response) {
        console.error(
          "Error saving food:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div>
      <title>Add Food</title>
      <Form heading={"Food"} onSubmit={addFood} initialData={initialData} />
    </div>
  );
}
