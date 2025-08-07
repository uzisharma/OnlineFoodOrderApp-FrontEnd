import { useLocation, useParams } from "react-router";
import Form from "../components/Form";

export default function EditRestaurant() {
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

  return (
    <>
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
    </>
  );
}
