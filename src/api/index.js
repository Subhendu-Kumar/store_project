import axios from "axios";
import { BASE_URL } from "@/config";

const API = axios.create({
  baseURL: BASE_URL,
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
