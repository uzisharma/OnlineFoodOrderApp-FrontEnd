import { useNavigate } from "react-router";
import LoginForm from "../components/LoginForm";
import { useRole } from "../context/RoleContext";
import SignUpForm from "../components/SignUpForm";

export default function LoginOrRegister() {
  const { role } = useRole();
  const navigate = useNavigate();
  const titleDisp = role.charAt(0).toUpperCase() + role.slice(1);
  const handleSubmit = () => {
    navigate("/user-page");
  };

  return (
    <>
      {<title>{titleDisp}</title>}
      {/* <LoginForm title={"login"} onClick={handleSubmit} /> */}
      <SignUpForm onClick={handleSubmit} />
    </>
  );
}
