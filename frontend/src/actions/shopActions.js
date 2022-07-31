import axios from "axios";
import { itemListURL } from '../constants';

export const FETCH_ITEMS = 'FETCH_ITEMS';
export const ERROR = 'ERROR';

export const fetchItems = () => dispatch => {
    axios.get(itemListURL)
        .then(data => {
            dispatch({
                type: FETCH_ITEMS,
                payload: data
            })
        })
        .catch(error => {
            dispatch({
                type: ERROR,
                payload: error.message
            })
        })
}






