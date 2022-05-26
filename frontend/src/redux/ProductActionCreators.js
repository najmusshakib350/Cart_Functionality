import axios from "axios";
import { API } from "../utils/config";
import { productInfo } from "./ActionTypes";
//errorFindoutProduct
export const errorFindoutProduct = function () {
  return {
    type: productInfo,
    payload: {},
  };
};
//successFindoutProduct
export const successFindoutProduct = function (product) {
  return {
    type: productInfo,
    payload: {
      product,
    },
  };
};
//ProductDetails
export const ProductDetails = function () {
  return function (dispatch) {
    axios
      .get(`${API}/product`)
      .then(function (response) {
        dispatch(successFindoutProduct(response.data.data.doc));
      })
      .catch(function (error) {
        dispatch(errorFindoutProduct());
      });
  };
};
