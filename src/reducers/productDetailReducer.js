import { FETCH_ITEM, ERR } from '../actions/productDetailActions';

const initialState = {
    loading: true,
    item: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_ITEM:
            return {
                ...state,
                item: action.payload.data,
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