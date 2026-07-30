import Axios from "axios"
import { API_URL } from "./api";

export const api = Axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
}, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use((res) => {
    return res;
}, (error) => {
    if (error.response?.status === 401) {
        localStorage.removeItem("token");
        if (window.location.pathname !== "/login" && window.location.pathname !== "/register")
            window.location.href = "/login";
    }
    return Promise.reject(error);
});