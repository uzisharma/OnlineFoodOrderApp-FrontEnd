import { useNavigate } from "react-router";
import { Button } from "../components/Input";
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
      <Button
        onClick={() => (role === "user" ? setRole("admin") : setRole("user"))}
      >
        {role} Login
      </Button>
      <LoginForm title={"login"} role={role} onClick={handleSubmit} />
    </>
  );
}
