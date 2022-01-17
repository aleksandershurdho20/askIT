
import axios from "axios";
const BASE_URL = "http://localhost:8000/api/";


export const apiInstance = axios.create({
    baseURL: BASE_URL,
});

