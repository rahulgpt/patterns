import { authAxios } from "../utils";
import { orderSummaryURL, removeFromCartURL, addToCartURL } from "../constants";

export const FETCH_CART = "FETCH_CART";
export const CART_START = "CART_START";
export const CART_FAIL = "CART_FAIL";
export const ERROR = "ERROR";
export const SUCCESS_MESSAGE = "SUCCESS_MESSAGE";
export const SIGN_IN_TO_ADD_ITEMS = "SIGN_IN_TO_ADD_ITEMS";

export const signInToAddItems = (dispatch) => {
  dispatch({
    type: SIGN_IN_TO_ADD_ITEMS,
    payload: "Sign In to add items to the cart",
  });
};

export const fetchCart = (cb) => (dispatch) => {
  authAxios
    .get(orderSummaryURL)
    .then((res) => {
      dispatch({
        type: FETCH_CART,
        payload: res.data,
      });
      if (typeof cb === "function") cb();
    })
    .catch((error) => {
      if (error.response !== undefined) {
        console.log(error.response.data);
      }

      console.log(error.response);

      dispatch({
        type: CART_FAIL,
      });
    });
};

export const addToCart = (slug, cb) => (dispatch) => {
  authAxios
    .post(addToCartURL, {
      slug: slug,
    })
    .then((res) => {
      fetchCart();
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: res.data.message,
      });
      cb();
    })
    .catch((error) => {
      if (error.response !== undefined) {
        dispatch({
          type: ERROR,
          payload: error.response.data.errormessage,
        });
      } else console.log(error);
    });
};

export const removeCart = (id) => {
  authAxios
    .delete(removeFromCartURL + `${id}/delete/`)
    .then((res) => {
      console.log(res);
      fetchCart();
    })
    .catch((err) => {
      console.log(err);
    });
};
