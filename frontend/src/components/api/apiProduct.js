import { API } from "../../utils/config";
import axios from "axios";

export const createProduct = (token, data) => {
  return axios.post(`${API}/product/create`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProduct = (token, data, id) => {
  return axios.patch(`${API}/product/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteProduct = (token, id) => {
  return axios.delete(`${API}/product/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
