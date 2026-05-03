import {apiRequests} from "./api.js";

export const tipServices ={
    getAllTips : () => apiRequests("/api/tips" , "GET"),
    
    getTipById : (id)=> apiRequests(`/api/tips/${id}` , "GET"),
    

    createTip : (tipData) => apiRequests("/api/tips" , "POST" , tipData),
    

    deleteTip : (id) => apiRequests(`/api/tips/${id}` , "DELETE"),
    
    getComments : (id) => apiRequests(`/tips/${id}/comments` , "GET"),

    postComments : (id , content) => apiRequest(`/tips/${id}/comments` , "POST" , {content}),
};