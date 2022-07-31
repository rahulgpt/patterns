export const SET_TITLE = 'SET_TITLE';
export const TOGGLE_USER_MENU = 'TOGGLE_USER_MENU';
export const SET_VISIBILITY = 'SET_VISIBILITY';


export const setTitle = () => dispatch => {
    let urlPath = window.location.pathname.substr(1);
    if (urlPath === "") urlPath = 'gallery';
    let title = urlPath[0].toUpperCase() + urlPath.slice(1)
    if (title === "Productdetail") title = 'Product Detail';
    dispatch({
        type: SET_TITLE,
        payload: title
    })
}

export const toggleUserMenu = () => dispatch => {
    dispatch({
        type: TOGGLE_USER_MENU
    })
}

export const setVisibility = () => dispatch => {
    dispatch({
        type: SET_VISIBILITY
    })
}


