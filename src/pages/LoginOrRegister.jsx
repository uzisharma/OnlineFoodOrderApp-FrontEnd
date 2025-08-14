import { useNavigate } from "react-router";
import { Button } from "../components/Input";
import LoginForm from "../components/LoginForm";

export default function LoginOrRegister({ role, setRole }) {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/user-page");
  };

  return (
    <>
      {<title>{role}</title>}
      <Button
        onClick={() => (role === "user" ? setRole("admin") : setRole("user"))}
      >
        {role} Login
      </Button>
      <LoginForm title={"login"} role={role} onClick={handleSubmit} />
    </>
  );
}
