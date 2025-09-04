import { useLocation, useNavigate, useParams } from "react-router";
import { useState } from "react";
import Form from "../../../components/Form";
import "./style/EditRestaurant.css";
import UnifiedModal from "../../../components/UnifiedModal"; // ✅ use unified modal
import { updateRestaurantById } from "../../../service/restaurantService";

export default function EditRestaurant() {
  const { id } = useParams();
  const location = useLocation();
  const row = location.state?.data;
  const navigate = useNavigate();

  // UnifiedModal Control
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalType, setModalType] = useState("success"); // success | error

  const [updatedRow, setUpdatedRow] = useState({});

  const handleSubmit = (updatedData) => {
    // console.log(updatedData);
    updateRestaurantById(id, updatedData)
      .then((res) => {
        const updated = res.data;
        setModalMsg("Restaurant updated successfully!");
        setModalType("success");
        setIsModalOpen(true);

        setUpdatedRow(updated);
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
      navigate(-1, { state: { updated: updatedRow } }); // go back after success
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
            formType={"Edit"}
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
