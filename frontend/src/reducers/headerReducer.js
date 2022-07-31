import { SET_TITLE, TOGGLE_USER_MENU, SET_VISIBILITY } from '../actions/headerActions';

const initialState = {
    title: 'Gallery',
    userMenu: false,
    visibility: 'hidden'
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_TITLE:
            return {
                ...state,
                title: action.payload,
            };
        case TOGGLE_USER_MENU:
            return {
                ...state,
                userMenu: !state.userMenu
            }
        case SET_VISIBILITY:
            return {
                ...state,
                visibility: state.title === 'Shop' || state.title === 'Product Detail' ? 'normal' : 'hidden'
            }
        default:
            return state;
    }
}