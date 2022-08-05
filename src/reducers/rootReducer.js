import { combineReducers } from 'redux';
import gridReducer from './gridReducer';
import navReducer from './navReducer';
import headerReducer from './headerReducer';
import authReducer from './authReducer';
import shopReducer from './shopReducer';
import productDetailReducer from './productDetailReducer';
import cartReducer from './cartReducer';

export default combineReducers({
    grid: gridReducer,
    nav: navReducer,
    header: headerReducer,
    auth: authReducer,
    shop: shopReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
})