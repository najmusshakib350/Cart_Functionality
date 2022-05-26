import { API } from "../../utils/config";
import axios from "axios";

export const productReport = (token) => {
  return axios.get(`${API}/cart/purchase/summary`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
