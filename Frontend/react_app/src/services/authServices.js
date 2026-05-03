import { apiRequest } from "./api.js";

export const authServices ={
    register : async (formData) =>{
        return apiRequest("/api/users/register" , "POST" , formData);
    },

    login : async (fromData)=>{
        return apiRequest("/api/users/login" , "POST" , fromData);
    },
    logout : async ()=>{
        localStorage.removeItem("token");
    },

};