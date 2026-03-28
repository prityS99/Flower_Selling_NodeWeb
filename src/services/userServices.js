import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002",
});

// ---------------- USERS ---------------- //

export const login = (data) => API.post("/app/v1/login", data);

export const register = (data) => API.post("/app/v1/register", data);
export const adminDashoard = () => API.get("/app/v1/admin/dashboard");
export const dashboard = () => API.get("/app/v1/dashboard");

export const getUsers = () => API.get("/app/v1/users");

export const updateProfileImage = (id, data) =>
  API.put(`/app/v1/users/update-profile-image/${id}`, data);

// ---------------- FLOWERS ---------------- //

export const getFlowers = () => API.get("/app/flowers");

export const getFlowerById = (id) => API.get(`/app/flowers/${id}`);

export const createFlower = (data) => API.post("/app/flowers/create", data);

export const updateFlower = (id, data) => API.put(`/app/flowers/${id}`, data);

export const deleteFlower = (id) => API.delete(`/app/flowers/${id}`);

// ---------------- ORDERS ---------------- //

export const getOrders = () => API.get("/app/orders");

export const getOrderById = (id) => API.get(`/app/orders/${id}`);

export const createOrder = (data) => API.post("/app/orders/create", data);

export const updateOrder = (id, data) => API.put(`/app/orders/${id}`, data);

export const deleteOrder = (id) => API.delete(`/app/orders/${id}`);
