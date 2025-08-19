import { useState } from "react";
import LoginForm from "../components/LoginForm";
import { useRole } from "../context/RoleContext";
import SignUpForm from "../components/SignUpForm";

export default function LoginOrRegister() {
  const url = "http://localhost:8080/api";
  const { role } = useRole();
  const [isLogin, setIsLogin] = useState(true);

  const titleDisp = role.charAt(0).toUpperCase() + role.slice(1);

  return (
    <>
      {<title>{titleDisp}</title>}
      {isLogin ? (
        <LoginForm
          title={"login"}
          setIsLogin={setIsLogin}
          url={`${url}/user`}
        />
      ) : (
        <SignUpForm
          title={"Create User Account"}
          setIsLogin={setIsLogin}
          url={`${url}/user/save`}
        />
      )}
    </>
  );
}
