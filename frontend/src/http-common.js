import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:5000/api/v1/",
  headers: {
    "Content-type": "application/json"    
  }
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('user')?.token
  req.headers.Authorization = token ? `Bearer ${token}` : ''
  return req
})