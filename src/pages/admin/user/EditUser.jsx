import { updateUserById } from "../../../service/userService";
import GenericEditPage from "../../GenericEditPage";

export default function EditUser() {
  return <GenericEditPage title="User" updateFn={updateUserById} />;
}
