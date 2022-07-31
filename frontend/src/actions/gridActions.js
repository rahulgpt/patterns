import axios from "axios"
import { galleryListURL } from '../constants';

// Action type variables
export const FETCH_IMAGES = 'FETCH_IMAGES'
export const ERR = 'ERR'

export const fetchImages = () => dispatch => {
    axios.get(galleryListURL)
        .then(data => {
            dispatch({
                type: FETCH_IMAGES,
                payload: data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: ERR,
                payload: err.message
            })
        });
}
