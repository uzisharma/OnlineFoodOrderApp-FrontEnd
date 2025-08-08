import { useLocation, useParams } from "react-router";
import Form from "../components/Form";
import "./style/EditRestaurant.css";

export default function EditRestaurant() {
  const { id } = useParams();
  const location = useLocation();
  const row = location.state?.row;
  const url = location.state?.editResUrl;
  console.log(url);

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
      })
      .catch((error) => {
        console.error("Update error", error);
      });
  };

  return (
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
  );
}
