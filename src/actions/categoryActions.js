import {
    ALL_CATEGORIES_FAIL,
    ALL_CATEGORIES_REQUEST,
    ALL_CATEGORIES_SUCCESS,
    CLEAR_ERRORS,
    NEW_CATEGORIES_FAIL,
    NEW_CATEGORIES_REQUEST,
    NEW_CATEGORIES_SUCCESS,

    ALL_MAINCATEGORIES_REQUEST,
    ALL_MAINCATEGORIES_SUCCESS,
    ALL_MAINCATEGORIES_FAIL,
    NEW_MAINCATEGORIES_REQUEST,
    NEW_MAINCATEGORIES_SUCCESS,
    NEW_MAINCATEGORIES_FAIL
} from "../constants/categoryConstant";

import axios from "axios";




export const getAdminCategory = () => async (dispatch) => {
    try {
        dispatch({
            type: ALL_CATEGORIES_REQUEST
        });

        const { data } = await axios.get(`/api/v1/category`);

        dispatch({
            type: ALL_CATEGORIES_SUCCESS,
            payload: data.categoryList
        })

    } catch (error) {
        dispatch({
            type: ALL_CATEGORIES_FAIL,
            payload: error.response.data.message,
        })
    }

}



//Add categories

export const addCategory = (cateData) => async (dispatch) => {
    try {
        dispatch({
            type: NEW_CATEGORIES_REQUEST
        });
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const { data } = await axios.post(`/api/v1/admin/category`, cateData, config);


        dispatch({
            type: NEW_CATEGORIES_SUCCESS,
            payload: data.categoryList
        })

    } catch (error) {
        dispatch({
            type: NEW_CATEGORIES_FAIL,
            payload: error.response.data.message,
        })
    }

}

export const getAdminMainCategory = () => async (dispatch) => {
    try {
        dispatch({
            type: ALL_MAINCATEGORIES_REQUEST
        });

        const { data } = await axios.get(`/api/v1/mainCategory`);
  
        dispatch({
            type: ALL_MAINCATEGORIES_SUCCESS,
            payload: data.mainCategory
        })

    } catch (error) {
        dispatch({
            type: ALL_MAINCATEGORIES_FAIL,
            payload: error.response.data.message,
        })
    }

}


//Add main categories

export const newMainCategory = (cateData) => async (dispatch) => {
    try {
        dispatch({
            type: NEW_MAINCATEGORIES_REQUEST
        });
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const { data } = await axios.post(`/api/v1/admin/mainCategory`, cateData, config);


        dispatch({
            type: NEW_MAINCATEGORIES_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: NEW_MAINCATEGORIES_FAIL,
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