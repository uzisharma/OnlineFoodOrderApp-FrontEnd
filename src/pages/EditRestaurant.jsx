import { useLocation } from "react-router";
import Form from "../components/Form";

export default function EditRestaurant() {
  // const { id } = useParams();
  const location = useLocation();
  const row = location.state?.row;

  const handleSubmit = (updatedData) => {
    console.log("Updated restaurant data:", updatedData);

    // You can send this data to your backend via PUT here
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
