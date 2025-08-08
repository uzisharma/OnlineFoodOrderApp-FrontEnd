import { useLocation, useParams } from "react-router";
import { useState } from "react";
import Form from "../components/Form";
import "./style/EditRestaurant.css";
import StatusModal from "../components/StatusModal";

export default function EditRestaurant() {
  const { id } = useParams();
  const location = useLocation();
  const row = location.state?.row;
  const url = location.state?.editResUrl;

  // Modal control state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("success"); // success | error

  const handleSubmit = (updatedData) => {
    const updatedUrl = `${url}${id}`; // make sure there's a slash if needed

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
        setModalMessage("Restaurant updated successfully!");
        setModalType("success");
        setIsModalOpen(true);
      })
      .catch((error) => {
        console.error("Update error", error);
        setModalMessage("Failed to update restaurant.");
        setModalType("error");
        setIsModalOpen(true);
      });
  };

  return (
    <>
      <div className="edit-container">
        <title>Edit Restaurant</title>
        {row ? (
          <Form
            heading={"Edit Restaurant"}
            onSubmit={handleSubmit}
            initialData={row}
          />
        ) : (
          <p>No data found</p>
        )}
      </div>
      <StatusModal
        isOpen={isModalOpen}
        type={modalType}
        message={modalMessage}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
