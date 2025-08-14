import { Button } from "../components/Input";
import LoginForm from "../components/LoginForm";

export default function LoginOrRegister({ role, setRole }) {
  const handleSubmit = () => {
    console.log("heelo");
    console.log(role);
  };

  return (
    <>
      {<title>{role}</title>}
      <Button
        onClick={() => {
          console.log(role);
          return role === "user" ? setRole("admin") : setRole("user");
        }}
      >
        {role} Login
      </Button>
      <LoginForm title={"login"} role={"user"} onClick={handleSubmit} />
    </>
  );
}
