import { FETCH_ITEMS, ERROR } from '../actions/shopActions'

const initialState = {
    loading: true,
    items: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_ITEMS:
            return {
                ...state,
                loading: false,
                items: action.payload.data
            }
        case ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}