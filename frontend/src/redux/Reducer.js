import { signInFormhandleChange, productInfo, cartInfo } from "./ActionTypes";
const InitState = {
  productInfo: {
    product: [],
  },
  cartInfo: {
    cart: [],
  },
};

export const Reducer = function (state = InitState, action) {
  switch (action.type) {
    case productInfo:
      return {
        ...state,
        productInfo: {
          ...state.productInfo,
          ...action.payload,
        },
      };
    case cartInfo:
      return {
        ...state,
        cartInfo: {
          ...state.cartInfo,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};
