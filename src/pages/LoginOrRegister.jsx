import { useState } from "react";
import LoginForm from "../components/LoginForm";
import { useRole } from "../context/RoleContext";
import SignUpForm from "../components/SignUpForm";

export default function LoginOrRegister() {
  const { role } = useRole();
  const [isLogin, setIsLogin] = useState(true);

  const titleDisp = role.charAt(0).toUpperCase() + role.slice(1);

  return (
    <>
      {<title>{titleDisp}</title>}
      {isLogin ? (
        <LoginForm title={"login"} setIsLogin={setIsLogin} />
      ) : (
        <SignUpForm title={"Create User Account"} setIsLogin={setIsLogin} />
      )}
    </>
  );
}
