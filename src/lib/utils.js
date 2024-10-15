import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ROLES_KEY, TOKEN_KEY } from "@/config";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const saveUserData = (response) => {
  localStorage.setItem(ROLES_KEY, JSON.stringify(response.roles));
  localStorage.setItem(TOKEN_KEY, response.token);
};

export const getUserRoles = () => {
  const roles = localStorage.getItem(ROLES_KEY);
  return roles ? JSON.parse(roles) : null;
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const clearUserData = () => {
  localStorage.removeItem(ROLES_KEY);
  localStorage.removeItem(TOKEN_KEY);
};
