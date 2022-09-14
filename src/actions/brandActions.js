import axios from "axios";
import { ALL_BRAND_REQUEST,
    ALL_BRAND_SUCCESS,
    ALL_BRAND_FAIL,

    NEW_BRAND_REQUEST,
    NEW_BRAND_SUCCESS,
    NEW_BRAND_FAIL,
    
    DELETE_BRAND_REQUEST,
    UPDATE_BRAND_REQUEST,
    DELETE_BRAND_SUCCESS,
    UPDATE_BRAND_SUCCESS,
    DELETE_BRAND_FAIL,
    UPDATE_BRAND_FAIL,
    BRAND_DETAILS_REQUEST,
    BRAND_DETAILS_SUCCESS,
    BRAND_DETAILS_FAIL,CLEAR_ERRORS } from "../constants/brandConstant";




// child Sub categories get data
export const getAdminBrand = () => async (dispatch) => {
    try {
        dispatch({
            type: ALL_BRAND_REQUEST
        });

        const { data } = await axios.get(`/api/v1/brands`);

       

        dispatch({
            type: ALL_BRAND_SUCCESS,
            payload: data.brands
        })

    } catch (error) {
        dispatch({
            type: ALL_BRAND_FAIL,
            payload: error.response.data.message,
        })
    }

}


//Add Child Sub categories

export const newBrand = (brandcat) => async (dispatch) => {
    try {
        dispatch({
            type: NEW_BRAND_REQUEST
        });
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const { data } = await axios.post(`/api/v1/admin/brand`, brandcat, config);


        dispatch({
            type: NEW_BRAND_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: NEW_BRAND_FAIL,
            payload: error.response.data.message,
        })
    }

}

// Update child Sub Category
export const updateBrand = (id, subData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_BRAND_REQUEST });

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.put(`/api/v1/admin/brand/${id}`, subData, config);

        dispatch({ type: UPDATE_BRAND_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({
            type: UPDATE_BRAND_FAIL,
            payload: error.response.data.message,
        });
    }
};

//delete Main Category
export const deleteBrand = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_BRAND_REQUEST
        });

        const { data } = await axios.delete(`/api/v1/admin/brand/${id}`);

        dispatch({
            type: DELETE_BRAND_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_BRAND_FAIL,
            payload: error.response.data.message,
        })
    }

}

// get mainCategory Details 
export const getBrandDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: BRAND_DETAILS_REQUEST,
        })
   
        const {data} = await axios.get(`/api/v1/admin/brand/${id}`); 
        
        dispatch({
            type: BRAND_DETAILS_SUCCESS,
            payload: data.brand,
        })

    } catch (error) {
        dispatch({
            type: BRAND_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }

}


//clearErrors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,

    });

}