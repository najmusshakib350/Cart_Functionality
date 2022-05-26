import axios from "axios";
import { API } from "../utils/config";
import { cartInfo } from "./ActionTypes";
//errorFindoutProduct
export const errorFindoutCart = function () {
  return {
    type: cartInfo,
    payload: {},
  };
};
//successFindoutProduct
export const successFindoutCart = function (product) {
  return {
    type: cartInfo,
    payload: {
      product,
    },
  };
};
//CartDetails
export const CartDetails = function () {
  return function (dispatch) {
    axios
      .get(`${API}/cart`)
      .then(function (response) {
        dispatch(successFindoutCart(response.data.data.result));
      })
      .catch(function (error) {
        dispatch(errorFindoutCart());
      });
  };
};

///cartCounter calculation code start
//ProductDetails
// export const CartCounter = function (cart) {
//   return function (dispatch) {
//     dispatch({
//       type: "cartCounter",
//       payload: {
//         cart,
//       },
//     });
//   };
// };
///cartCounter calculation code end
