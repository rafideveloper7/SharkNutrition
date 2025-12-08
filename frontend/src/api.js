// src/api.js
import axios from "axios";
const backendApi = import.meta.env.VITE_API_BASE

const API_BASE = import.meta.env.VITE_API_BASE || backendApi;

export const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});


api.interceptors.request.use(
  (config) => {
    const fullUrl = `${config.baseURL}${config.url}`;
    return config;
  },
  (error) => {
    console.error("Request failed:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(" Response error:", {
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
  return api.get("/products/getAllProducts").then((res) => {
    // Backend se already formatted response aata hai with products array
    return res.data.products || res.data;
  }).catch(err => {
    console.error("❌ fetchAllProducts error:", err);
    throw err;
  });
};
export const createOrder = (orderData) => {
  return api.post("/api/orders", orderData).then((res) => res.data);
};

export const fetchAllOrders = () => {
  return api
    .get("/api/orders", { withCredentials: true }) // Send cookie automatically
    .then((res) => res.data.orders)
    .catch((err) => {
      console.error("❌ Error fetching orders:", err);
      throw err;
    });
};


export const submitContactForm = (formData) => {
  return api
    .post("/api/contact", formData)
    .then((res) => res.data)
    .catch((err) => {
      console.error("❌ Error submitting contact form:", err);
      throw err;
    });
};
export const fetchDashboardStats = async () => {
  try {
    const [productsRes, usersRes, ordersRes] = await Promise.all([
      api.get("/products/stats/count"),
      api.get("/api/users/stats/count"),
      api.get("/api/orders/stats/count"),
    ]);

    return {
      totalProducts: productsRes.data.count || 0,
      totalUsers: usersRes.data.userCount || 0,
      totalOrders: ordersRes.data.count || 0,
    };
  } catch (err) {
    console.error("❌ Error fetching dashboard stats:", err);
    throw err;
  }
};


export default API_BASE;