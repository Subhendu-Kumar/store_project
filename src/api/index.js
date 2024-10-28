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

/*---------- auth services ----------*/
export const signup = async (data) => {
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

/*---------- store services ----------*/
export const getStore = async (store_id) => {
  try {
    const response = await API.get(`/stores/${store_id}/metadata`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateStore = async (store_id, data) => {
  try {
    const response = await API.patch(`/stores/${store_id}/metadata`, data);
    return response;
  } catch (error) {
    console.log("error: ", error);
  }
};

/*---------- warehouse services ----------*/
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

export const deleteWarehouse = async (store_id, warehouse_id) => {
  try {
    const response = await API.delete(
      `/stores/${store_id}/warehouses/${warehouse_id}`
    );
    return response;
  } catch (error) {
    console.error("error: ", error);
  }
};

export const updateWarehouse = async (store_id, warehouse_id, data) => {
  try {
    const response = await API.patch(
      `/stores/${store_id}/warehouses/${warehouse_id}`,
      data
    );
    return response;
  } catch (error) {
    console.error("error: ", error);
  }
};

/*---------- category services ----------*/
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

export const updateCategory = async (store_id, category_id, data) => {
  try {
    const response = await API.patch(
      `/stores/${store_id}/categories/${category_id}`,
      data
    );
    return response;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const toogleCategoryActive = async (store_id, category_id, data) => {
  try {
    const response = await API.patch(
      `/stores/${store_id}/categories/${category_id}/partial-update`,
      data
    );
    return response;
  } catch (error) {
    console.log("error: ", error);
  }
};

/*---------- media services ----------*/
export const uploadMedia = async (data) => {
  try {
    const response = await API.post(`/media/upload`, data);
    return response;
  } catch (error) {
    console.log("error: ", error);
  }
};

/*---------- product services ----------*/
export const getProducts = async (store_id) => {
  try {
    const response = await API.get(`/stores/public/${store_id}/products`); //temporary
    return response;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const addProduct = async (store_id, data) => {
  try {
    const response = await API.post(`/stores/${store_id}/products`, data);
    return response;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const deleteProduct = async (store_id, product_id) => {
  try {
    const response = await API.delete(
      `/stores/${store_id}/products/${product_id}`
    );
    return response;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const updateProduct = async (store_id, product_id, data) => {
  try {
    const response = await API.patch(
      `/stores/${store_id}/products/${product_id}`,
      data
    );
    return response;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const toogleProductActive = async (store_id, product_id, data) => {
  try {
    const response = await API.patch(
      `/stores/${store_id}/products/${product_id}/partial-update`,
      data
    );
    return response;
  } catch (error) {
    console.log("error: ", error);
  }
};

/*---------- discount & offer services ----------*/
export const getOffers = async (store_id) => {
  try {
    const response = await API.get(`/stores/${store_id}/offers`);
    return response;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const validateOffer = async (store_id, data) => {
  try {
    const response = await API.post(`/stores/${store_id}/validate-offer`, data);
    return response;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const addOffer = async (store_id, data) => {
  try {
    const response = await API.put(`/stores/${store_id}/offers`, data);
    return response;
  } catch (error) {
    console.log("error: ", error);
  }
};
