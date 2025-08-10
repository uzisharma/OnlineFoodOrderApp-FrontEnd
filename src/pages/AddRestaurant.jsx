import Form from "../components/Form";
import { useNavigate } from "react-router";

export default function AddRestaurant() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    const restaurantData = {
      restaurantName: formData.restaurantName,
      email: formData.email,
      contactNumber: formData.contactNumber,
      address: formData.address,
    };

    try {
      const response = await fetch(
        "http://localhost:8080/restaurant/api/save",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(restaurantData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Restaurant saved:", result);
        navigate("/listRestaurant"); // redirect to list page after successful add
      } else {
        console.error("Error saving restaurant:", response.status);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const initialData = {
    restaurantName: "",
    email: "",
    contactNumber: "",
    address: "",
  };

  return (
    <>
      <title>Add Restaurant</title>
      <Form
        heading="Restaurant"
        onSubmit={handleSubmit}
        initialData={initialData}
      />
    </>
  );
}
