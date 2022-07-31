export const TOGGLE_MENU = 'TOGGLE_MENU';
export const TOGGLE_SEARCH_MENU = 'TOGGLE_SEARCH_MENU';

export const toggleMenu = () => dispatch => {
    dispatch({
        type: TOGGLE_MENU
    })
}

export const toggleSearchMenu = () => dispatch => {
    dispatch({
        type: TOGGLE_SEARCH_MENU
    })
}

