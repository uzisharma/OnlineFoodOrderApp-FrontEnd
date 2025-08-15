import { useNavigate } from "react-router";
import LoginForm from "../components/LoginForm";

export default function LoginOrRegister({ role, setRole }) {
  const navigate = useNavigate();
  const titleDisp = role.charAt(0).toUpperCase() + role.slice(1);
  const handleSubmit = () => {
    navigate("/user-page");
  };

  return (
    <>
      {<title>{titleDisp}</title>}
      <LoginForm
        title={"login"}
        role={role}
        setRole={setRole}
        onClick={handleSubmit}
      />
    </>
  );
}
