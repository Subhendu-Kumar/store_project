import { clsx } from "clsx";
import { jwtDecode } from "jwt-decode";
import { twMerge } from "tailwind-merge";
import { OWNER_KEY, STORE_KEY, TOKEN_KEY } from "@/config";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const saveUserData = (response) => {
  // Save store data
  const storeData = {
    id: response.store_id,
    name: response.store_name,
    url: response.store_url,
  };
  localStorage.setItem(STORE_KEY, JSON.stringify(storeData));
  // Save owner data
  const ownerData = {
    name: response.owner_name,
    roles: response.roles,
  };
  localStorage.setItem(OWNER_KEY, JSON.stringify(ownerData));
  // Save token
  localStorage.setItem(TOKEN_KEY, response.token);
};

export const getStoreData = () => {
  const store = localStorage.getItem(STORE_KEY);
  return store ? JSON.parse(store) : null;
};

export const getOwnerData = () => {
  const owner = localStorage.getItem(OWNER_KEY);
  return owner ? JSON.parse(owner) : null;
};

// export const getToken = () => {
//   return localStorage.getItem(TOKEN_KEY);
// };

export const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        clearUserData();
        return null;
      }
      return token;
    } catch (error) {
      console.log(error);
      clearUserData();
      return null;
    }
  }
  return null;
};

export const clearUserData = () => {
  localStorage.removeItem(STORE_KEY);
  localStorage.removeItem(OWNER_KEY);
  localStorage.removeItem(TOKEN_KEY);
};
