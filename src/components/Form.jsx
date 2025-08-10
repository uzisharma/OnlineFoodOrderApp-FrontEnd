import { useState } from "react";
import Input, { Button } from "./Input";
import { useNavigate } from "react-router";
import "./style/Form.css";

export default function Form({ heading, onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState(initialData);
  // const [showFoodSelector, setShowFoodSelector] = useState(false);
  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const cancelHandler = () => {
    // navigate("/listRestaurant");
    console.log(`/list${heading}`);
    navigate(`/list${heading}`);
  };

  return (
    <div className="form-layout">
      <div className="wrapper">
        <div className="form-container">
          <h3>{`Edit ${heading}`}</h3>
          <form onSubmit={handleSubmit}>
            {Object.entries(formData).map(([key, value]) => {
              if (key === "id" || key === "createdAt" || key === "updatedAt")
                return null;

              if (typeof value === "object") {
                return;
              }

              return (
                <Input
                  key={key}
                  name={key}
                  value={value}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  type={typeof value === "number" ? "number" : "text"}
                  changeFun={(val) => handleChange(key, val)}
                />
              );
            })}
            <div className="button-container">
              <button type="submit">Submit</button>
              <button type="button" onClick={cancelHandler}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
