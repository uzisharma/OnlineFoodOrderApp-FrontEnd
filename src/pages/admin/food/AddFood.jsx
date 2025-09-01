import Form from "../../../components/Form";
import { saveFood } from "../../../service/foodService";
import UnifiedModal from "../../../components/UnifiedModal";

import { useState } from "react";

export default function AddFood() {
  // UnifiedModal Control
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalMsg, setModalMsg] = useState("");
  const [modalType, setModalType] = useState("success"); // success | error
  const [resetFormKey, setResetFromKey] = useState(0);

  const handleOnClose = () => {
    setIsModalOpen(false);
  };

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
      if (response.status >= 200 && response.status < 300) {
        setModalMsg("Food Added successfully!");
        setModalType("success");
        setIsModalOpen(true);
        setResetFromKey((prev) => prev + 1);
        console.log("Food saved:", response.data);
      } else {
        setModalMsg("Failed!");
        setModalType("error");
        setIsModalOpen(true);
      }
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
      <Form
        heading={"Food"}
        formType={"Add"}
        onSubmit={addFood}
        initialData={initialData}
        resetKey={resetFormKey}
      />
      <UnifiedModal
        isOpen={isModalOpen}
        onClose={handleOnClose}
        mode="status"
        type={modalType}
        title={modalType === "success" ? "Success" : "Error"}
        message={modalMsg}
      />
    </div>
  );
}
