import Table from "../../../components/Table";
import { getAllOrder, deleteOrderById } from "../../../service/orderService";
import { useNavigate } from "react-router";

export default function OrderList() {
  const navigate = useNavigate();

  const handleNavigate = (data) => {
    navigate(`/admin/food/update/${data.id}`, { state: { data } });
  };

  return (
    <div className="all-list">
      <title>Order List</title>
      <Table
        title={"Order"}
        handleNavigate={handleNavigate}
        fetchDataFn={getAllOrder}
        deleteDataFn={deleteOrderById}
      />
    </div>
  );
}
