const BASE_URL = import.meta.env.VITE_API_URL;

export const apiRequest = async (endpoint ,  method = "GET", body = null, signal = null) =>{
    const token = localStorage.getItem("token");
    const isFormData = body instanceof FormData; //detect the form data

    console.log("isFormData:", isFormData);  // <-- ADD KARO
    console.log("body:", body);    
    
    const options ={
        method: method,
        headers:{ 
        ...(!isFormData && {"Content-Type" : "application/json"}),
        ...(token && {Authorization: `Bearer ${token}`})
    },
    ...(signal && {signal}),
       
    };

    if(body){
        options.body =  isFormData ? body : JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}` , options);
    const data = await response.json();

    if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        throw new Error(data.message || "Unauthorized access");
    }

    if(!response.ok){
        throw new Error(data.message || "Something went wrong");
    }

    return data;
}