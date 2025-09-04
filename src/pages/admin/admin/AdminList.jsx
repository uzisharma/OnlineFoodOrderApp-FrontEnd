import { useNavigate } from "react-router";
import Table from "../../../components/Table";
import { deleteAdminById, getAllAdmin } from "../../../service/adminService";

export default function AdminList() {
  const navigate = useNavigate();

  const handleNavigate = (data) => {
    navigate(`/admin/user/update/${data.id}`, { state: { data } });
  };

  return (
    <div className="all-list">
      <title>Admin List</title>
      <Table
        title={"admin"}
        handleNavigate={handleNavigate}
        fetchDataFn={getAllAdmin}
        deleteDataFn={deleteAdminById}
      />
    </div>
  );
}
