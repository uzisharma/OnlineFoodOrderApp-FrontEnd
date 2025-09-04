import { useLocation, useNavigate } from "react-router";
import { Button } from "../../../components/Input";
import { useEffect, useState } from "react";
import { deleteFoodById, getFoodById } from "../../../service/foodService";
import Header from "../../../components/Header";

export default function FoodPanel() {
  const location = useLocation();

  const [foodData, setFoodData] = useState();

  const data = location.state || {};

  useEffect(() => {
    const fetchFood = async (id) => {
      try {
        const response = await getFoodById(id);
        setFoodData(response?.data?.data || {});
      } catch (err) {
        console.error("Failed to fetch food : ", err);
        setFoodData({});
      }
    };

    if (data?.id) {
      fetchFood(data?.id);
    }
  }, [data?.id]);

  return (
    <div className="panel-detail">
      <Header heading={"Food Panel"} />
      <BasicDetail data={foodData} />
    </div>
  );
}

function BasicDetail({ data }) {
  const navigate = useNavigate();
  const goToEdit = (data) => {
    navigate(`/food/update/${data?.id}`, { state: { data } });
  };

  const deleteFood = (id) => {
    deleteFoodById(id);
    navigate(-1);
  };

  return (
    <div className="basic-details">
      <header>{data?.foodName}</header>
      <div className="detail-body">
        <div className="left-side">
          <img alt="image" />
        </div>
        <div className="right-side">
          <span>Id : {data?.id}</span>
          <span>Food Name : {data?.foodName}</span>
          <span>Food Price : ₹{data?.price}</span>
          <span>Description : {data?.description}</span>
          <div className="btn-div">
            <Button onClick={() => goToEdit(data)}>Edit</Button>
            <Button onClick={() => deleteFood(data?.id)}>Delete</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
