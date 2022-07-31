import {
    TOGGLE_MENU,
    TOGGLE_SEARCH_MENU,
}
    from '../actions/navActions';

const initialState = {
    overlayMenu: false,
    overlaySearchMenu: false,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case TOGGLE_MENU:
            return {
                ...state,
                overlayMenu: !state.overlayMenu
            }
        case TOGGLE_SEARCH_MENU:
            return {
                ...state,
                overlaySearchMenu: !state.overlaySearchMenu
            }
        default:
            return state;
    }
}