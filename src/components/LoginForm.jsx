import { useState } from "react";
import Input, { Button } from "./Input";
import "./style/LoginForm.css";

export default function LoginForm({ title, role, onClick }) {
  const [formData, setFormData] = useState();

  const titleDisp = title.charAt(0).toUpperCase() + title.slice(1);
  const username = "username";
  const password = "password";

  const changeFun = (val) => {
    console.log(val);
    const index = 1;
    setFormData(() => ({ [index]: val }));
    console.log(formData);
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
        <div className="btn-container">
          <Button onClick={onClick} type="submit">
            {titleDisp}
          </Button>
        </div>
      </div>
    </div>
  );
}
