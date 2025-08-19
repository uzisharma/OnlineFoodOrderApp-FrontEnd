import { useState } from "react";
import Input, { Button, SelectInput } from "./Input";
import "./style/SignUpForm.css";

export default function SignUpForm({ setIsLogin, title }) {
  const baseUrl = "http://localhost:8080/api/user/save";
  const inputDetails = [
    {
      name: "userName",
      placeholder: "username",
      type: "text",
    },
    {
      name: "password",
      placeholder: "password",
      type: "password",
    },
    {
      name: "email",
      placeholder: "xyz@gmail.com",
      type: "email",
    },

    {
      name: "address",
      placeholder: "address",
      type: "text",
    },
    {
      name: "contactNumber",
      placeholder: "+91 0000000000",
      type: "number",
    },
    {
      name: "gender",
      type: "select",
      options: ["Male", "Female", "Others"],
    },
  ];

  const initialDetails = inputDetails.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialDetails);

  const handleChange = (key, val) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
  };
  const resetForm = () => {
    setFormData(initialDetails);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Account Created");
        resetForm();
      } else {
        alert("Failed to create an account");
      }
    } catch (error) {
      console.log("Something went wrong ", error);
    }
  };

  return (
    <div className="signup-container">
      <title>{title}</title>
      <div className="main-container">
        <form onSubmit={handleSubmit}>
          <div className="body-content">
            <header>Create Account</header>
            {inputDetails.map((field) =>
              field.type === "select" ? (
                <SelectInput
                  key={field.name}
                  name={field.name}
                  options={field.options}
                  changeFun={(val) => handleChange(field.name, val)}
                />
              ) : (
                <Input
                  key={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  changeFun={(val) => handleChange(field.name, val)}
                />
              )
            )}
          </div>
          <div className="footer-content">
            <Button type="reset" onClick={resetForm}>
              Reset
            </Button>
            <Button type="submit" onClick={handleSubmit}>
              Create Account
            </Button>
          </div>
        </form>
        <footer>
          <span>Already haven an account?</span>
          <span className="span-link" onClick={() => setIsLogin(true)}>
            Login
          </span>
        </footer>
      </div>
    </div>
  );
}
