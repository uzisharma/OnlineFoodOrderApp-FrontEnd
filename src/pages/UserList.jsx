import "./style/UserList.css";
import { useNavigate } from "react-router";
import { getAllUser, deleteUserById } from "../service/userService";
import Table from "../components/Table";

export default function UserList() {
  const navigate = useNavigate();

  const handleNavigate = (data) => {
    navigate(`/admin/user/update/${data.id}`, { state: { data } });
  };

  return (
    <div className="user-all-list">
      <title>User List</title>
      <Table
        title={"User"}
        handleNavigate={handleNavigate}
        fetchDataFn={getAllUser}
        deleteDataFn={deleteUserById}
      />
    </div>
  );
}
