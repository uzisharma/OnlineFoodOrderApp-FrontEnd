import { useState } from "react";
import Input, { Button, CheckboxInput } from "./Input";
import "./style/LoginForm.css";
import { Link, useNavigate } from "react-router";
import { useRole } from "../context/RoleContext";
import axios from "axios";

export default function LoginForm({ title, setIsLogin }) {
  const navigate = useNavigate();
  const { setCartItemCount, role, setRole, setIsLogged, setUserDetails } =
    useRole();
  const API_URL = import.meta.env.VITE_API_URL;

  const inputDetails = [
    { name: "userName", placeholder: "Username", type: "text" },
    { name: "password", placeholder: "Password", type: "password" },
  ];

  const initialDetails = inputDetails.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialDetails);

  const handleChange = (key, val) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
  };

  const changeTo = () => {
    role === "user" ? setRole("admin") : setRole("user");
  };

  const onChangeHandler = (e) => {
    console.log(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/${role}/login`, formData);

      if (response.status === 200) {
        setCartItemCount(response?.data?.data?.totalCartItem || "0");
        setUserDetails(response?.data?.data);
        setIsLogged(true);

        role === "user" ? navigate("/user-page") : navigate("/admin-page");
      } else {
        console.log("Login Failed");
        setUserDetails(null);
      }
    } catch (error) {
      console.error("Something went wrong", error);
      setUserDetails(null);
    }
  };

  const titleDisp = title.charAt(0).toUpperCase() + title.slice(1);

  return (
    <div className="login-wrapper">
      <header>
        <h2>
          {`${role.charAt(0).toUpperCase() + role.slice(1)} ${titleDisp}`}
        </h2>
      </header>

      <form onSubmit={handleSubmit} className="login-container">
        {inputDetails.map((field) => (
          <Input
            key={field.name}
            name={field.name}
            placeholder={field.placeholder}
            type={field.type}
            value={formData[field.name]}
            changeFun={(val) => handleChange(field.name, val)}
          />
        ))}

        <div className="check-container">
          <Link to={"/"}>Forgot Password</Link>
          <CheckboxInput onChange={onChangeHandler}>
            <span>Remember me</span>
          </CheckboxInput>
        </div>

        <div className="btn-container">
          <Button type="submit">{titleDisp}</Button>
        </div>
      </form>

      <div>
        <span>
          Click to sign-in as{" "}
          <span
            style={{
              cursor: "pointer",
              textDecoration: "underline",
              color: "blue",
            }}
            onClick={changeTo}
          >
            {role === "user" ? "Admin" : "User"}
          </span>
        </span>
      </div>

      <div className="footer-container">
        <span>Don't have an account?</span>
        <span className="span-link" onClick={() => setIsLogin(false)}>
          {" "}
          Create account
        </span>
      </div>
    </div>
  );
}
