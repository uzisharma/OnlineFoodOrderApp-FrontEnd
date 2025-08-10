import { useLocation, useNavigate, useParams } from "react-router";
import { useState } from "react";
import Form from "../components/Form";
import "./style/EditRestaurant.css";
import UnifiedModal from "../components/UnifiedModal"; // ✅ use unified modal

export default function EditRestaurant() {
  const { id } = useParams();
  const location = useLocation();
  const row = location.state?.row;
  const url = location.state?.editResUrl;
  const navigate = useNavigate();

  // UnifiedModal Control
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalType, setModalType] = useState("success"); // success | error

  const handleSubmit = (updatedData) => {
    const updatedUrl = `${url}${id}`; // ensure slash in url if required

    fetch(updatedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Update Success", data);
        setModalMsg("Restaurant updated successfully!");
        setModalType("success");
        setIsModalOpen(true);
      })
      .catch((error) => {
        console.error("Update error", error);
        setModalMsg("Failed to update restaurant.");
        setModalType("error");
        setIsModalOpen(true);
      });
  };

  const handleOnClose = () => {
    if (modalType === "success") {
      navigate(-1); // go back after success
    }
    setIsModalOpen(false); // close modal
  };

  return (
    <>
      <div className="edit-container">
        <title>Edit Restaurant</title>
        {row ? (
          <Form
            heading={"Restaurant"}
            onSubmit={handleSubmit}
            initialData={row}
          />
        ) : (
          <p>No data found</p>
        )}
      </div>

      {/* ✅ Using UnifiedModal in status mode */}
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
