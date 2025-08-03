import Input, { Button } from "../components/Input";
import { useState } from "react";
import "./AddRestaurant.css";

export default function AddRestaurant() {
  const [name, setName] = useState();
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const restaurantData = {
      restaurantName: name,
      email,
      contactNumber: contact,
      address,
    };

    try {
      const response = await fetch(
        "http://localhost:8080/restaurant/api/save",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(restaurantData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Restaurant saved:", result);

        // Reset form state
        setName("");
        setEmail("");
        setContact("");
        setAddress("");
        e.target.reset(); // Reset the form inputs (good for uncontrolled components)
      } else {
        console.error("Error saving restaurant:", response.status);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <>
      <title>Add Restaurant</title>
      <div className="wrapper">
        <div className="form-container">
          <h1>Add Restaurant</h1>
          <form onSubmit={handleSubmit} method="post">
            <Input
              type="text"
              placeholder="Restaurant Name"
              name="restaurantName"
              changeFun={setName}
            />
            <Input
              type="text"
              placeholder="Email"
              name="email"
              changeFun={setEmail}
            />
            <Input
              type="number"
              placeholder="Contact"
              name="contactNumber"
              changeFun={setContact}
            />
            <Input
              type="text"
              placeholder="Address"
              name="address"
              changeFun={setAddress}
            />
            <div className="button-container">
              <Button label="Submit" />
              <Button type="reset" label="Reset" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
