import { FETCH_IMAGES, ERR } from '../actions/gridActions';

const initialState = {
    loading: true,
    images: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_IMAGES:
            return {
                ...state,
                images: action.payload.data,
                loading: false
            }
        case ERR:
            return {
                ...state,
                loading: false,
                err: action.payload,
            }
        default:
            return state;
    }
}