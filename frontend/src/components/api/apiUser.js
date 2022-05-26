import { API } from "../../utils/config";
import axios from "axios";

export const login = (user) => {
  return axios.post(`${API}/user/login`, user, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
