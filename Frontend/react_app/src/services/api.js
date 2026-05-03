const BASE_URL = import.meta.env.VITE_API_URL;

export const apiRequest = async (endpoint , method , body) =>{
    const token = localStorage.getItem("token");
    const options ={
        method: method,
        headers:{ 
            "Content-Type" : "application/json",
        ...(token && {Authorization: `Bearer ${token}`})
    },
    ...(signal && {signal}),
       
    };

    if(body){
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}` , options);
     if (response.status === 401 || response.status === 403) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }
    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message || "Something went wrong");
    }

    return data;
}