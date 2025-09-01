import api from "./axiosConfig";


export const saveFood = async (foodData)=>{
    return await api.post("/food/save", foodData);
};


export const getFood = async()=>{
    return await api.get("/food/getAll")
}