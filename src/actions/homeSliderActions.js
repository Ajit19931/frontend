import axios from "axios";

import {
    ALL_SLIDER_FAIL, ALL_SLIDER_REQUEST, ALL_SLIDER_SUCCESS, CLEAR_ERRORS, NEW_SLIDER_FAIL, NEW_SLIDER_REQUEST, NEW_SLIDER_SUCCESS, DELETE_SLIDER_REQUEST,
    DELETE_SLIDER_SUCCESS,
   
    DELETE_SLIDER_FAIL,

    UPDATE_SLIDER_REQUEST,
    UPDATE_SLIDER_SUCCESS,

    UPDATE_SLIDER_FAIL,
    ADMIN_SLIDER_REQUEST,
    ADMIN_SLIDER_SUCCESS,
    ADMIN_SLIDER_FAIL,
} from "../constants/homeSliderConstant";


export const getHomeSlider = () => async (dispatch) => {
    try {
        dispatch({
            type: ALL_SLIDER_REQUEST
        });
        const { data } = await axios.get("/api/v1/homeslider");

        dispatch({
            type: ALL_SLIDER_SUCCESS,
            payload: data.homesliders
        })

    } catch (error) {
        dispatch({
            type: ALL_SLIDER_FAIL,
            payload: error.response.data.message,
        })
    }

}


// get products for Admin

export const getAdminSlider = () => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_SLIDER_REQUEST
        });

        const { data } = await axios.get(`/api/v1/admin/homeslider`);

        dispatch({
            type: ADMIN_SLIDER_SUCCESS,
            payload: data.homesliders
        })

    } catch (error) {
        dispatch({
            type: ADMIN_SLIDER_FAIL,
            payload: error.response.data.message,
        })
    }

}


//new Product  Create
export const CreateSlider = (sliderData) => async (dispatch) => {
    try {
        dispatch({
            type: NEW_SLIDER_REQUEST
        });
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const { data } = await axios.post(`/api/v1/admin/homeslider/new`, sliderData, config);

        dispatch({
            type: NEW_SLIDER_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: NEW_SLIDER_FAIL,
            payload: error.response.data.message,
        })
    }

}


//delete Product
export const deleteSlider = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_SLIDER_REQUEST
        });

        const { data } = await axios.delete(`/api/v1/admin/homesliders/${id}`);

        dispatch({
            type: DELETE_SLIDER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_SLIDER_FAIL,
            payload: error.response.data.message,
        })
    }

}

//Update Product  Create
export const UpdateSlider = (id, sliderData) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_SLIDER_REQUEST
        });
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const { data } = await axios.put(`/api/v1/admin/homesliders/${id}`, sliderData, config);

        dispatch({
            type: UPDATE_SLIDER_SUCCESS,
            payload: data.success,
        })

    } catch (error) {
        dispatch({
            type: UPDATE_SLIDER_FAIL,
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