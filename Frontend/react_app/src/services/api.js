const BASE_URL = import.meta.env.VITE_API_URL;

export const apiRequest = async (endpoint , method , body) =>{

    const options ={
        method: method,
        headers:{ "Content-Type" : "application/json"},
       
    };

    if(body){
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}` , options);
    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message || "Something went wrong");
    }

    return data;
}