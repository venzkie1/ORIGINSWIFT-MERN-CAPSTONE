import axios from "axios";

const newRequest = axios.create({
    baseURL: "https://645cb2b7d16977781bbadb6c--candid-trifle-f5177a.netlify.app/api/", 
    withCredentials: true,
});

export default newRequest;