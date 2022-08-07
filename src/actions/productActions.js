import axios from "axios"
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    ADMIN_PRODUCT_FAIL,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    SLIDER_PRODUCTS_FAIL,
    SLIDER_PRODUCTS_REQUEST,
    SLIDER_PRODUCTS_SUCCESS,
  
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,

  
    CLEAR_ERRORS
} from "../constants/productConstant";



export const getProduct = (keyword = "", currentPage = "1", price = [0, 25000],category, ratings = 0) => async (dispatch) => {
    try {
        dispatch({
            type: ALL_PRODUCT_REQUEST
        });

        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

        if (category) {
             link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        }

        const { data } = await axios.get(link);

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message,
        })
    }

}

// Get All Products ---PRODUCT SLIDER
export const getSliderProducts = () => async (dispatch) => {
    try {
        dispatch({ type: SLIDER_PRODUCTS_REQUEST });

        const { data } = await axios.get('/api/v1/products/all');

       

        dispatch({
            type: SLIDER_PRODUCTS_SUCCESS,
            payload: data.products,
        });
    } catch (error) {
        dispatch({
            type: SLIDER_PRODUCTS_FAIL,
            payload: error.response.data.message,
        });
    }
};



export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_DETAILS_REQUEST
        });

        const { data } = await axios.get(`/api/v1/product/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message,
        })
    }

}

//new Product  reviw
export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({
            type: NEW_REVIEW_REQUEST
        });
        const config = { headers: { 'Content-Type': 'application/json' } };
        const { data } = await axios.put(`/api/v1/review` ,reviewData , config);

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success,
        })

    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message,
        })
    }

}


// get products for Admin

export const getAdminProduct = () => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_PRODUCT_REQUEST
        });

        const { data } = await axios.get(`/api/v1/admin/products`);

        dispatch({
            type: ADMIN_PRODUCT_SUCCESS,
            payload: data.products
        })

    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCT_FAIL,
            payload: error.response.data.message,
        })
    }

}



//new Product  Create
export const CreateProduct = (productData) => async (dispatch) => {
    try {
        dispatch({
            type: NEW_PRODUCT_REQUEST
        });
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const { data } = await axios.post(`/api/v1/admin/product/new` ,productData , config);

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message,
        })
    }

}

//delete Product
export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_PRODUCT_REQUEST
        });

        const { data } = await axios.delete(`/api/v1/admin/product/${id}`);

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message,
        })
    }

}

//Update Product  Create
export const UpdateProduct = (id,productData) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_PRODUCT_REQUEST
        });
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const { data } = await axios.put(`/api/v1/admin/product/${id}` ,productData , config);

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success,
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message,
        })
    }

}


//get All Reviews 
export const getAllReview = (id) => async (dispatch) => {
    try {
        dispatch({
            type: ALL_REVIEW_REQUEST
        });
        const { data } = await axios.get(`/api/v1/reviews?id=${id}` );

        dispatch({
            type: ALL_REVIEW_SUCCESS,
            payload: data.reviews,
        })

    } catch (error) {
        dispatch({
            type: ALL_REVIEW_FAIL,
            payload: error.response.data.message,
        })
    }

}


// delete Reviews 
export const deleteReview = (reviewId ,productId) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_REVIEW_REQUEST
        });
        const { data } = await axios.delete(`/api/v1/reviews?id=${reviewId}&productId=${productId}` );

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success,
        })

    } catch (error) {
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response.data.message,
        })
    }

}

//clearErrors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,

    });

}