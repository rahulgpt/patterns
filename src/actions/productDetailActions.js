import axios from "axios";
import { endpoint } from "../constants";

export const FETCH_ITEM = "FETCH_ITEM";
export const ERR = "ERR";

export const fetchItem = (slug) => (dispatch) => {
  axios
    .get(`${endpoint}/shop/${slug}/`)
    .then((data) => {
      dispatch({
        type: FETCH_ITEM,
        payload: data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ERR,
        payload: err.message,
      });
    });
};
