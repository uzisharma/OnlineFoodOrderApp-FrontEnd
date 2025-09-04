import { useState } from "react";
import { saveUser } from "../../../service/userService";
import Form from "../../../components/Form";
import UnifiedModal from "../../../components/UnifiedModal";

export default function AddUser() {
  // UnifiedModal Control
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalMsg, setModalMsg] = useState("");
  const [modalType, setModalType] = useState("success"); // success | error
  const [resetFormKey, setResetFromKey] = useState(0);

  const handleOnClose = () => {
    setIsModalOpen(false);
  };

  const initialData = {
    userName: "",
    password: "",
    email: "",
    contactNumber: "",
    address: "",
    gender: "",
  };

  const addUser = async (formData) => {
    const userData = {
      userName: formData.userName,
      password: formData.password,
      email: formData.email,
      contactNumber: formData.contactNumber,
      address: formData.address,
      gender: formData.gender,
    };

    try {
      const response = await saveUser(userData);
      console.log("User Saved :", response.data);
      if (response.status >= 200 && response.status < 300) {
        setModalMsg("User Added successfully!");
        setModalType("success");
        setIsModalOpen(true);
        setResetFromKey((prev) => prev + 1);
        console.log("User saved:", response.data);
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
    <>
      <title>Add User</title>
      <Form
        heading={"User"}
        formType={"Add"}
        onSubmit={addUser}
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
