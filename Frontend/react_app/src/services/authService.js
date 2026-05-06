import { apiRequest } from "./api";

export const authService ={
    register : async (formData) =>{
        return apiRequest("/api/users/register" , "POST" , formData);
    },

    login : async (formData)=>{
        return apiRequest("/api/users/login" , "POST" , formData);
    },
    logout : async ()=>{
        localStorage.removeItem("token");
    },

};