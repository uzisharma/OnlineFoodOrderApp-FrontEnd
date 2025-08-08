import { useLocation, useParams } from "react-router";
import { useState } from "react";
import Form from "../components/Form";
import "./style/EditRestaurant.css";
import NestedObj from "../components/NestedObj";

export default function EditRestaurant() {
  const [isObject, setIsObject] = useState(false);
  const [nestedObj, setNestedObj] = useState([]);
  const { id } = useParams();
  const location = useLocation();
  const row = location.state?.row;
  const url = location.state?.editResUrl;
  // console.log(url);

  const handleSubmit = (updatedData) => {
    // Merge old + new food items
    const mergedFood = [...(row.food || []), ...nestedObj];

    updatedData.food = mergedFood;

    console.log("Final food list being sent:", mergedFood);

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

        // Update local state so UI refreshes instantly
        setNestedObj(data.data.food); // fresh data from backend
      })
      .catch((error) => {
        console.error("Update error", error);
      });
  };

  const handleOnClick = (formData) => {
    setNestedObj([...formData]);
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
      {isObject && (
        <div className="edit-obj">
          <NestedObj nestedObj={nestedObj} setNestedObj={setNestedObj} />
        </div>
      )}
    </div>
  );
}
