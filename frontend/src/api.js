// src/api.js
import axios from "axios";


const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

console.log("🌐 API Base URL:", API_BASE);

export const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});


api.interceptors.request.use(
  (config) => {
    const fullUrl = `${config.baseURL}${config.url}`;
    console.log(`🚀 Making request to: ${fullUrl}`);
    return config;
  },
  (error) => {
    console.error("❌ Request failed:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(`✅ Response received:`, {
      url: response.config.url,
      status: response.status,
      dataLength: Array.isArray(response.data) ? response.data.length : 'not an array',
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error("❌ Response error:", {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

// Helper functions
export const fetchProducts = (category) => {
  const url = category
    ? `/products?category=${encodeURIComponent(category)}`
    : "/products";
  return api.get(url).then((res) => res.data);
};

export const fetchAllProducts = () => {
  console.log("📦 fetchAllProducts called");
  return api.get("/products").then((res) => {
    console.log("📊 fetchAllProducts response:", res.data);
    return res.data;
  }).catch(err => {
    console.error("❌ fetchAllProducts error:", err);
    throw err;
  });
};

export default API_BASE;