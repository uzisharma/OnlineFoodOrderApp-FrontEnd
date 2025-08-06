import { useState } from "react";
import Input from "./Input";
import { useNavigate } from "react-router";

export default function Form({ heading, onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState(initialData);
  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  const cancelHandler = () => {
    navigate("/listRestaurant");
  };

  return (
    <>
      <div className="wrapper">
        <div className="form-container">
          <h3>{heading}</h3>
          <form onSubmit={handleSubmit}>
            {Object.entries(formData).map(([key, value]) => {
              if (typeof value === "object") return null; // skip objects like `food`
              if (key === "id" || key === "createdAt" || key === "updatedAt")
                return null;

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
              <button onClick={cancelHandler}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
