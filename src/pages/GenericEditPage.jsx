// src/pages/GenericEditPage.jsx
import { useLocation, useNavigate, useParams } from "react-router";
import { useState } from "react";
import Form from "../components/Form";
import UnifiedModal from "../components/UnifiedModal";

export default function GenericEditPage({ title, updateFn }) {
  const { id } = useParams();
  const location = useLocation();
  const row = location.state?.data;
  const navigate = useNavigate();

  // UnifiedModal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalType, setModalType] = useState("success");

  const handleSubmit = async (updatedData) => {
    try {
      const res = await updateFn(id, updatedData);
      console.log(`${title} updated`, res.data);

      setModalMsg(`${title} updated successfully!`);
      setModalType("success");
      setIsModalOpen(true);
    } catch (error) {
      console.error(`${title} update error`, error);
      setModalMsg(`Failed to update ${title.toLowerCase()}.`);
      setModalType("error");
      setIsModalOpen(true);
    }
  };

  const handleOnClose = () => {
    if (modalType === "success") navigate(-1); // go back after success
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="edit-container">
        <title>Edit {title}</title>
        {row ? (
          <Form
            heading={title}
            formType="Edit"
            onSubmit={handleSubmit}
            initialData={row}
          />
        ) : (
          <p>No data found</p>
        )}
      </div>

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
