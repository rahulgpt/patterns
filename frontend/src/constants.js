const localhost = "http://127.0.0.1:8000";
let apiUrl = "/api";

if (process.env.REACT_APP_DEV_ENV === "true") apiUrl = `${localhost}${apiUrl}`;
console.log(apiUrl, process.env.REACT_APP_DEV_ENV);

export const endpoint = `${apiUrl}`;

export const galleryListURL = `${endpoint}/gallery`;
export const itemListURL = `${endpoint}/shop/`;
export const addToCartURL = `${endpoint}/shop/add-to-cart/`;
export const removeFromCartURL = `${endpoint}/shop/order-items/`;
export const orderSummaryURL = `${endpoint}/shop/cart/order-summary/`;
export const checkoutURL = `${endpoint}/shop/checkout/`;
export const paymentIntentURL = `${endpoint}/shop/payment-intents/`;

export const signInURL = `${endpoint}/auth/login/`;
export const signOutURL = `${endpoint}/auth/logout/`;
export const registrationURL = `${endpoint}/auth/registration/`;
