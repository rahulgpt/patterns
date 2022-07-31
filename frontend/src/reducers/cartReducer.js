import { FETCH_CART, ERROR, SUCCESS_MESSAGE, } from '../actions/cartActions';

const initialState = {
    loading: true,
    items: [],
    coupon: null,
    total: 0,
    itemCount: 0
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_CART:
            return {
                ...state,
                items: action.payload.order_items,
                coupon: action.payload.coupon,
                total: action.payload.total,
                itemCount: action.payload.order_items.length,
                loading: false
            }
        case ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case SUCCESS_MESSAGE:
            return {
                ...state,
                successMessage: action.payload
            }
        default:
            return state;
    }
}