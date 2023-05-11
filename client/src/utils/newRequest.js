import axios from "axios";

const newRequest = axios.create({
    baseURL: "/", 
    withCredentials: true,
});


export default newRequest;