import Form from "../../../components/Form";
import UnifiedModal from "../../../components/UnifiedModal";
import { saveRestaurant } from "../../../service/restaurantService";
import { useState } from "react";

export default function AddRestaurant() {
  // UnifiedModal Control
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalType, setModalType] = useState("success"); // success | error
  const [resetFormKey, setResetFromKey] = useState(0);

  const handleSubmit = async (formData) => {
    const restaurantData = {
      restaurantName: formData.restaurantName,
      email: formData.email,
      contactNumber: formData.contactNumber,
      address: formData.address,
      rating: formData.rating,
      deliveryTime: formData.deliveryTime,
      deliveryCharges: formData.deliveryCharges,
    };

    try {
      const response = await saveRestaurant(restaurantData);

      if (response.status >= 200 && response.status < 300) {
        setModalMsg("Restaurant Added successfully!");
        setModalType("success");
        setIsModalOpen(true);
        setResetFromKey((prev) => prev + 1);
        console.log("Restaurant saved:", response.data);
      } else {
        setModalMsg("Failed!");
        setModalType("error");
        setIsModalOpen(true);
      }
    } catch (error) {
      setModalMsg("Failed! Something went wrong");
      setModalType("error");
      setIsModalOpen(true);
      console.error("Error saving restaurant:", error);
    }
  };

  const handleOnClose = () => {
    setIsModalOpen(false);
  };
  const initialData = {
    restaurantName: "",
    email: "",
    contactNumber: "",
    address: "",
    rating: "",
    deliveryTime: "",
    deliveryCharges: "",
  };

  return (
    <>
      <title>Add Restaurant</title>
      <Form
        heading="Restaurant"
        formType={"Add"}
        onSubmit={handleSubmit}
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
    </>
  );
}
