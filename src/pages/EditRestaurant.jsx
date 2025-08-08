import { useLocation, useNavigate, useParams } from "react-router";
import { useState } from "react";
import Form from "../components/Form";
import "./style/EditRestaurant.css";
import StatusModal from "../components/StatusModal";

export default function EditRestaurant() {
  const { id } = useParams();
  const location = useLocation();
  const row = location.state?.row;
  const url = location.state?.editResUrl;
  const navigate = useNavigate();

  //Status Modal Control
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [statusModalMsg, setStatusModalMsg] = useState("");
  const [statusModalType, setStatusModalType] = useState("success");

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
        setStatusModalMsg("Restaurant updated successfully!");
        setStatusModalType("success");
        setIsStatusModalOpen(true);
      })
      .catch((error) => {
        console.error("Update error", error);
        setStatusModalMsg("Failed to update restaurant.");
        setStatusModalType("error");
        setIsStatusModalOpen(true);
      });
  };

  const handleOnClose = () => {
    console.log(statusModalType);
    if (statusModalType === "success") {
      navigate(-1);
    }
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
        isOpen={isStatusModalOpen}
        type={statusModalType}
        message={statusModalMsg}
        onClose={handleOnClose}
      />
    </>
  );
}
