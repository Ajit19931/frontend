import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { deleteProductReducer, newProductReducer, newReviewReducer, productDetailsReducer, productReviewReducer, productsReducer, ReviewReducer } from "./reducers/productReducers";
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from "./reducers/userReducers";

import { cartReducer } from "./reducers/cartReducers";
import { myOrdersReducer, newOrderReducer, orderDetailsReducer, allOdersReducer, OrderReducer } from "./reducers/orderReducers";
import { delupSliderReducer, newSliderReducer, sliderReducer } from "./reducers/homeSliderReducers";
import { allCategoriesReducer, allmainCategoriesReducer, childSubCategoryDetailsReducer, ChildSubCategoryReducer, getChildSubcateReducer, getSubcateReducer, mainCategoryDetailsReducer, MainCategoryReducer, newChildSubcateReducer, newSubcateReducer, subCategoryDetailsReducer, SubCategoryReducer } from "./reducers/categoryReducers";

import { wishlistReducer } from './reducers/wishlistReducer';
import { BrandDetailsReducer, brandReducer, getBrandsReducer, newBrandReducer } from "./reducers/brandReducers";

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
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    productReview: productReviewReducer,
    Review: ReviewReducer,
    slider: sliderReducer,
    newSlider: newSliderReducer,
    delupSlider :delupSliderReducer,
    allcategories: allCategoriesReducer,
    allMainCategories: allmainCategoriesReducer,
    mainCategoryDetails:mainCategoryDetailsReducer,
    // category : categoryReducer,
    wishlist: wishlistReducer,
    MainCategory:MainCategoryReducer,

    newSubcate:newSubcateReducer,
    getSubcate: getSubcateReducer,
    SubCategory: SubCategoryReducer,
    subCategoryDetails: subCategoryDetailsReducer,
    
    newchildSubcate:newChildSubcateReducer,
    getChildSubcate: getChildSubcateReducer,
    ChildSubCategory: ChildSubCategoryReducer,
    childsubCategoryDetails: childSubCategoryDetailsReducer,

    newbrand:newBrandReducer,
    getbrand: getBrandsReducer,
    brand: brandReducer,
    brandDetails: BrandDetailsReducer,

});

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {}
    },
    wishlist: {
        wishlistItems: localStorage.getItem('wishlistItems')
            ? JSON.parse(localStorage.getItem('wishlistItems'))
            : [],
    },
    
};

const middleware = [thunk];



const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;