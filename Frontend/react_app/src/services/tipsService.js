import {apiRequest} from "./api";

export const tipsService = {
    getAllTips : () => apiRequest("/tips" , "GET"),
    
    getTipById : (id)=> apiRequest(`/tips/${id}` , "GET"),
    

    createTip : async (tipData) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(()=>controller.abort() , 10000);

        try{
            const data = await apiRequest("/tips" , "POST" , tipData , controller.signal);
            return data;
        }catch(err){
            if(err.name === "AbortError"){
                throw new Error("Request time out , Please try again");
            }
            throw err;
        }
        finally{
            clearTimeout(timeoutId);
        }
    },
    

    deleteTip : (id) => apiRequest(`/api/tips/${id}` , "DELETE"),
    
    getComments : (id) => apiRequest(`/tips/${id}/comments` , "GET"),

    postComments : async (id , content) => {
        const controller = new AbortController();
        const timeoutId =  setTimeout (()=> controller.abort() , 1000);

        try{
            const data = await  apiRequest(`/tips/${id}/comments` , "POST" , {content});
            return data;
        }catch(err){
            if(err.name === "AbortError"){
                throw new Error("Request time out , Please try again");
            }
            throw err;
        }
        finally{
            clearTimeout(timeoutId);
        }
       
    }
};

