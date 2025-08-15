import { useNavigate } from "react-router";
import LoginForm from "../components/LoginForm";
import { useRole } from "../context/RoleContext";

export default function LoginOrRegister() {
  const navigate = useNavigate();
  const { role } = useRole();
  const titleDisp = role.charAt(0).toUpperCase() + role.slice(1);
  const handleSubmit = () => {
    navigate("/user-page");
  };

  return (
    <>
      {<title>{titleDisp}</title>}
      <LoginForm title={"login"} onClick={handleSubmit} />
    </>
  );
}
