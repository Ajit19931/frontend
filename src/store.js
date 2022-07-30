import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { deleteProductReducer, newProductReducer, newReviewReducer, productDetailsReducer, productsReducer } from "./reducers/productReducers";
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from "./reducers/userReducers";

import { cartReducer } from "./reducers/cartReducers";
import { myOrdersReducer, newOrderReducer, orderDetailsReducer, allOdersReducer, OrderReducer } from "./reducers/orderReducers";



const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    deleteProduct: deleteProductReducer,
    allOrders: allOdersReducer,
    Order: OrderReducer,
    allUsers : allUsersReducer,
    userDetails : userDetailsReducer

});

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {}
    }

};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;