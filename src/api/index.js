import axios from "axios";
import { BASE_URL } from "@/config";
import { getToken } from "@/lib/utils";

const token = getToken();

const API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use((req) => {
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const signup = async (data) => {
  console.log("signup data: ", data);
  try {
    const response = await axios.post(`${BASE_URL}/auth/seller/register`, data);
    return response;
  } catch (error) {
    console.error("signup error: ", error);
  }
};

export const login = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/seller/login`, data);
    return response;
  } catch (error) {
    console.error("login error: ", error);
  }
};

export const getWarehouses = async (store_id) => {
  try {
    const response = await API.get(`/stores/${store_id}/warehouses`);
    return response;
  } catch (error) {
    console.error("error: ", error);
  }
};

export const addWarehouse = async (store_id, data) => {
  try {
    const response = await API.post(`/stores/${store_id}/warehouses`, data);
    return response;
  } catch (error) {
    console.error("error: ", error);
  }
};

export const getCategories = async (store_id) => {
  try {
    const response = await API.get(`/stores/${store_id}/categories`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addCategory = async (store_id, data) => {
  try {
    const response = await API.post(`/stores/${store_id}/categories`, data);
    return response;
  } catch (error) {
    console.error("error: ", error);
  }
};

export const deleteCategory = async (store_id, category_id) => {
  try {
    const response = await API.delete(
      `/stores/${store_id}/categories/${category_id}`
    );
    return response;
  } catch (error) {
    console.log("error: ", error);
  }
};
