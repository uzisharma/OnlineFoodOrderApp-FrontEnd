import { useLocation, useParams } from "react-router";
import { useState } from "react";
import Form from "../components/Form";
import "./style/EditRestaurant.css";

export default function EditRestaurant() {
  const [isObject, setIsObject] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const row = location.state?.row;
  const url = location.state?.editResUrl;

  const handleSubmit = (updatedData) => {
    console.log("Updated restaurant data:", updatedData);
    const updatedUrl = url + id;
    // You can send this data to your backend via PUT here
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
      })
      .catch((error) => {
        console.error("Update error", error);
      });
  };

  const handleOnClick = (formData) => {
    const innerObj = formData?.food;
    const newOrd = [...innerObj];
    console.log(newOrd);
    setIsObject(true);
  };

  return (
    <div className="edit-container">
      <title>Edit Restaurant</title>
      {row ? (
        <Form
          heading={"Edit Restaurant"}
          onSubmit={handleSubmit}
          initialData={row}
          onClick={handleOnClick}
        />
      ) : (
        <p>No data found</p>
      )}
      {isObject && <div className="edit-obj">hello</div>}
    </div>
  );
}
