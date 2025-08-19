import { useRole } from "../context/RoleContext";
import SearchBar from "./SearchBar";
import UserCart from "./UserCart";

export default function UserService() {
  const { isLogged } = useRole();
  return (
    <>
      <SearchBar />
      {isLogged === "false" && <UserCart />}
    </>
  );
}
