const localhost = 'http://127.0.0.1:8000';
const SITE_URL = 'https://patterns-wa.herokuapp.com'

const apiURL = '/api';

export const endpoint = `${SITE_URL}${apiURL}`;

export const galleryListURL = `${endpoint}/gallery/`;
export const itemListURL = `${endpoint}/shop/`;
export const addToCartURL = `${endpoint}/shop/add-to-cart/`;
export const removeFromCartURL = `${endpoint}/shop/order-items/`;
export const orderSummaryURL = `${endpoint}/shop/cart/order-summary/`;
export const checkoutURL = `${endpoint}/shop/checkout/`;
export const paymentIntentURL = `${endpoint}/shop/payment-intents/`;

export const signInURL = `${endpoint}/auth/login/`;
export const signOutURL = `${endpoint}/auth/logout/`;
export const registrationURL = `${endpoint}/auth/registration/`;

