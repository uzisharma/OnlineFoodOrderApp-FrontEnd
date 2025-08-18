import { useState } from "react";
import Input, { Button, SelectInput } from "./Input";
import "./style/SignUpForm.css";

export default function SignUpForm() {
  const inputDetails = [
    {
      name: "username",
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
      name: "contact",
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

  const [formData, setFormData] = useState({ initialDetails });

  const handleChange = (key, val) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
  };
  const resetForm = () => {
    const emptySpace = inputDetails.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {});
    setFormData(emptySpace);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Account Created");
    resetForm();
  };

  return (
    <div className="signup-container">
      <div className="main-container">
        <form onSubmit={handleSubmit}>
          <div className="body-content">
            <header>Create Account</header>
            {inputDetails.map((ip) =>
              ip.type === "select" ? (
                <SelectInput
                  key={ip.name}
                  name={ip.name}
                  options={ip.options}
                  changeFun={(val) => handleChange(ip.name, val)}
                />
              ) : (
                <Input
                  key={ip.name}
                  name={ip.name}
                  type={ip.type}
                  placeholder={ip.placeholder}
                  value={formData[ip.name]}
                  changeFun={(val) => handleChange(ip.name, val)}
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
      </div>
    </div>
  );
}
