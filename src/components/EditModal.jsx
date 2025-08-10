import { useEffect } from "react";
import Form from "./Form";
import "./style/EditModal.css";

export default function EditModal({
  title,
  row,
  baseUrl,
  onClose,
  updateRowInList,
}) {
  useEffect(() => {
    console.log("received data", row);
  }, [row]);

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch(`${baseUrl}/update?id=${row?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Updated:", data);

      updateRowInList(); // ✅ trigger Table refetch
      onClose();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="edit-modal-container">
      <div className="edit-modal">
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
        <Form heading={title} onSubmit={handleSubmit} initialData={row} />
      </div>
    </div>
  );
}
