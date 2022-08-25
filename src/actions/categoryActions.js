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
    NEW_MAINCATEGORIES_FAIL,
    DELETE_MAINCATEGORIES_REQUEST,
    DELETE_MAINCATEGORIES_SUCCESS,
    DELETE_MAINCATEGORIES_FAIL,
    UPDATE_MAINCATEGORIES_REQUEST,
    UPDATE_MAINCATEGORIES_SUCCESS,
    UPDATE_MAINCATEGORIES_FAIL,
    MAINCATEGORIES_DETAILS_REQUEST,
    MAINCATEGORIES_DETAILS_SUCCESS,
    MAINCATEGORIES_DETAILS_FAIL,
    NEW_SUBCATEGORIES_FAIL,
    NEW_SUBCATEGORIES_REQUEST,
    NEW_SUBCATEGORIES_SUCCESS,
    ALL_SUBCATEGORIES_REQUEST,
    ALL_SUBCATEGORIES_SUCCESS,
    ALL_SUBCATEGORIES_FAIL,

    DELETE_SUBCATEGORIES_REQUEST,
    UPDATE_SUBCATEGORIES_REQUEST,
    DELETE_SUBCATEGORIES_SUCCESS,
    UPDATE_SUBCATEGORIES_SUCCESS,
    DELETE_SUBCATEGORIES_FAIL,
    UPDATE_SUBCATEGORIES_FAIL,
    SUBCATEGORIES_DETAILS_REQUEST,
    SUBCATEGORIES_DETAILS_SUCCESS,
    SUBCATEGORIES_DETAILS_FAIL,

  
    NEW_CHILDSUBCATEGORIES_FAIL,
    NEW_CHILDSUBCATEGORIES_REQUEST,
    NEW_CHILDSUBCATEGORIES_SUCCESS,
    ALL_CHILDSUBCATEGORIES_REQUEST,
    ALL_CHILDSUBCATEGORIES_SUCCESS,
    ALL_CHILDSUBCATEGORIES_FAIL,
    DELETE_CHILDSUBCATEGORIES_REQUEST,
    UPDATE_CHILDSUBCATEGORIES_REQUEST,
    DELETE_CHILDSUBCATEGORIES_SUCCESS,
    UPDATE_CHILDSUBCATEGORIES_SUCCESS,
   
    DELETE_CHILDSUBCATEGORIES_FAIL,
    UPDATE_CHILDSUBCATEGORIES_FAIL,
    CHILDSUBCATEGORIES_DETAILS_REQUEST,
    CHILDSUBCATEGORIES_DETAILS_SUCCESS,
    CHILDSUBCATEGORIES_DETAILS_FAIL,
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

// get mainCategory Details 
export const getMainCategoryDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: MAINCATEGORIES_DETAILS_REQUEST,
        })
   
        const {data} = await axios.get(`/api/v1/admin/mainCategory/${id}`); 
        
        dispatch({
            type: MAINCATEGORIES_DETAILS_SUCCESS,
            payload: data.mainCategory,
        })

    } catch (error) {
        dispatch({
            type: MAINCATEGORIES_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }

}

// Update Main Category
export const updateMainCategory = (id, mainData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_MAINCATEGORIES_REQUEST });

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.put(`/api/v1/admin/mainCategory/${id}`, mainData, config);

        dispatch({ type: UPDATE_MAINCATEGORIES_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({
            type: UPDATE_MAINCATEGORIES_FAIL,
            payload: error.response.data.message,
        });
    }
};

//delete Main Category
export const deleteMainCategory = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_MAINCATEGORIES_REQUEST
        });

        const { data } = await axios.delete(`/api/v1/admin/mainCategory/${id}`);

        dispatch({
            type: DELETE_MAINCATEGORIES_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_MAINCATEGORIES_FAIL,
            payload: error.response.data.message,
        })
    }

}


// Sub categories get data
export const getAdminSubCategory = () => async (dispatch) => {
    try {
        dispatch({
            type: ALL_SUBCATEGORIES_REQUEST
        });

        const { data } = await axios.get(`/api/v1/subCategory`);

        dispatch({
            type: ALL_SUBCATEGORIES_SUCCESS,
            payload: data.subCategorys
        })

    } catch (error) {
        dispatch({
            type: ALL_SUBCATEGORIES_FAIL,
            payload: error.response.data.message,
        })
    }

}


//Add main categories

export const newSubCategory = (subcateData) => async (dispatch) => {
    try {
        dispatch({
            type: NEW_SUBCATEGORIES_REQUEST
        });
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const { data } = await axios.post(`/api/v1/admin/subCategory`, subcateData, config);


        dispatch({
            type: NEW_SUBCATEGORIES_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: NEW_SUBCATEGORIES_FAIL,
            payload: error.response.data.message,
        })
    }

}

// Update Main Category
export const updateSubCategory = (id, subData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_SUBCATEGORIES_REQUEST });

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.put(`/api/v1/admin/subCategory/${id}`, subData, config);

        dispatch({ type: UPDATE_SUBCATEGORIES_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({
            type: UPDATE_SUBCATEGORIES_FAIL,
            payload: error.response.data.message,
        });
    }
};

//delete Main Category
export const deleteSubCategory = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_SUBCATEGORIES_REQUEST
        });

        const { data } = await axios.delete(`/api/v1/admin/subCategory/${id}`);

        dispatch({
            type: DELETE_SUBCATEGORIES_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_SUBCATEGORIES_FAIL,
            payload: error.response.data.message,
        })
    }

}

// get mainCategory Details 
export const getSubCategoryDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: SUBCATEGORIES_DETAILS_REQUEST,
        })
   
        const {data} = await axios.get(`/api/v1/admin/subCategory/${id}`); 
        
        dispatch({
            type: SUBCATEGORIES_DETAILS_SUCCESS,
            payload: data.subCategory,
        })

    } catch (error) {
        dispatch({
            type: SUBCATEGORIES_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }

}



// child Sub categories get data
export const getAdminChildSubCategory = () => async (dispatch) => {
    try {
        dispatch({
            type: ALL_CHILDSUBCATEGORIES_REQUEST
        });

        const { data } = await axios.get(`/api/v1/chilSubCategory`);

        dispatch({
            type: ALL_CHILDSUBCATEGORIES_SUCCESS,
            payload: data.childsubCategorys
        })

    } catch (error) {
        dispatch({
            type: ALL_CHILDSUBCATEGORIES_FAIL,
            payload: error.response.data.message,
        })
    }

}


//Add Child Sub categories

export const newchildSubCategory = (subcateData) => async (dispatch) => {
    try {
        dispatch({
            type: NEW_CHILDSUBCATEGORIES_REQUEST
        });
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const { data } = await axios.post(`/api/v1/admin/chilSubCategory`, subcateData, config);


        dispatch({
            type: NEW_CHILDSUBCATEGORIES_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: NEW_CHILDSUBCATEGORIES_FAIL,
            payload: error.response.data.message,
        })
    }

}

// Update child Sub Category
export const updateChildSubCategory = (id, subData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_CHILDSUBCATEGORIES_REQUEST });

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.put(`/api/v1/admin/chilSubCategory/${id}`, subData, config);

        dispatch({ type: UPDATE_CHILDSUBCATEGORIES_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({
            type: UPDATE_CHILDSUBCATEGORIES_FAIL,
            payload: error.response.data.message,
        });
    }
};

//delete Main Category
export const deleteChildSubCategory = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_CHILDSUBCATEGORIES_REQUEST
        });

        const { data } = await axios.delete(`/api/v1/admin/chilSubCategory/${id}`);

        dispatch({
            type: DELETE_CHILDSUBCATEGORIES_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_CHILDSUBCATEGORIES_FAIL,
            payload: error.response.data.message,
        })
    }

}

// get mainCategory Details 
export const getchildSubCategoryDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: CHILDSUBCATEGORIES_DETAILS_REQUEST,
        })
   
        const {data} = await axios.get(`/api/v1/admin/chilSubCategory/${id}`); 
        
        dispatch({
            type: CHILDSUBCATEGORIES_DETAILS_SUCCESS,
            payload: data.subCategory,
        })

    } catch (error) {
        dispatch({
            type: CHILDSUBCATEGORIES_DETAILS_FAIL,
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