import { useEffect, useState } from "react";
import Input from "./Input";
import { useNavigate } from "react-router";
import "./style/Form.css";

export default function Form({
  heading,
  formType,
  onSubmit,
  initialData = {},
  resetKey,
}) {
  const [formData, setFormData] = useState(initialData);
  const navigate = useNavigate();

  useEffect(() => {
    setFormData(initialData);
  }, [resetKey, initialData]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const cancelHandler = () => {
    navigate(-1);
  };

  return (
    <div className="form-container">
      <h3>{`${formType} ${heading}`}</h3>
      <form onSubmit={handleSubmit}>
        {Object.entries(formData).map(([key, value]) => {
          if (typeof value === "object" || key === "id") {
            return;
          }

          // 👇 special case for address → textarea
          if (key === "address") {
            return (
              <div key={key} className="input-container">
                <label htmlFor={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <textarea
                  id={key}
                  name={key}
                  rows={4}
                  value={value}
                  onChange={(e) => handleChange(key, e.target.value)}
                  placeholder="Enter address"
                />
              </div>
            );
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
  );
}
