import {
    AUTH_FAIL, AUTH_START, AUTH_SUCCESS,
    AUTH_SIGNOUT, AUTH_SIGNOUT_SUCCESS
} from '../actions/authActions'

const initialState = {
    loading: false,
    token: null,
    err: null,
    isAuthenticated: false
}


export default function (state = initialState, action) {
    switch (action.type) {
        case AUTH_START:
            return {
                ...state,
                loading: true
            }
        case AUTH_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                loading: false,
                isAuthenticated: true
            }
        case AUTH_FAIL:
            return {
                ...state,
                err: action.payload,
                loading: false
            }
        case AUTH_SIGNOUT:
            return {
                ...state,
                token: null,
                isAuthenticated: false
            }
        case AUTH_SIGNOUT_SUCCESS:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}