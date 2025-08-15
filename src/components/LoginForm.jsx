import { useState } from "react";
import Input, { Button, CheckboxInput } from "./Input";
import "./style/LoginForm.css";
import { Link } from "react-router";
import { useRole } from "../context/RoleContext";

export default function LoginForm({ title, onClick }) {
  const { role, setRole } = useRole();
  const [formData, setFormData] = useState();
  const [roleDisp, setRoleDisp] = useState("admin");

  const titleDisp = title.charAt(0).toUpperCase() + title.slice(1);
  const username = "username";
  const password = "password";

  const changeFun = (val) => {
    console.log(val);
    const index = 1;
    setFormData(() => ({ [index]: val }));
    console.log(formData);
  };

  const changeTo = () => {
    if (role === "user") {
      setRoleDisp(role);
      setRole("admin");
    } else {
      setRoleDisp(role);
      setRole("user");
    }
  };

  const onChangeHandler = (e) => {
    console.log(e.target.checked);
  };

  return (
    <div className="login-wrapper">
      <header>
        <h2>
          {`${role.charAt(0).toUpperCase() + role.slice(1)} ${titleDisp} `}
        </h2>
      </header>

      <div className="login-container">
        <Input
          name={username}
          placeholder={username.charAt(0).toUpperCase() + username.slice(1)}
          type="text"
          changeFun={changeFun}
        />
        <Input
          name={password}
          placeholder={password.charAt(0).toUpperCase() + password.slice(1)}
          type="password"
          changeFun={changeFun}
        />
        <div className="check-container">
          <Link to={"/"}>Forgot Password</Link>
          <CheckboxInput onChange={onChangeHandler}>
            <span>Remember me</span>
          </CheckboxInput>
        </div>
        <div className="btn-container">
          <Button onClick={onClick} type="submit">
            {titleDisp}
          </Button>
        </div>
      </div>
      <div>
        <span>
          Click to sign-in as{"" + " "}
          <span
            style={{
              cursor: "pointer",
              textDecoration: "underline",
              color: "blue",
            }}
            onClick={changeTo}
          >
            {roleDisp.charAt(0).toUpperCase() + roleDisp.slice(1)}
          </span>
        </span>
      </div>
      <div className="footer-container">
        <span>Don't have an account?</span>
        <Link> Create account</Link>
      </div>
    </div>
  );
}
