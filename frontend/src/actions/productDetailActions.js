import axios from "axios";

export const FETCH_ITEM = "FETCH_ITEM";
export const ERR = "ERR";

export const fetchItem = (slug) => (dispatch) => {
  console.log("slug: " + slug);
  axios
    .get(`http://127.0.0.1:8000/api/shop/${slug}/`)
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
