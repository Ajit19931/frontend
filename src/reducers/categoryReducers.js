import {
    ALL_CATEGORIES_FAIL,
    ALL_CATEGORIES_REQUEST,
    ALL_CATEGORIES_SUCCESS,
    CLEAR_ERRORS,
    NEW_CATEGORIES_FAIL,
    NEW_CATEGORIES_REQUEST,
    NEW_CATEGORIES_RESET,
    NEW_CATEGORIES_SUCCESS,

    ALL_MAINCATEGORIES_REQUEST,
    ALL_MAINCATEGORIES_SUCCESS,
    ALL_MAINCATEGORIES_FAIL,
    NEW_MAINCATEGORIES_REQUEST,
    NEW_MAINCATEGORIES_SUCCESS,
    NEW_MAINCATEGORIES_RESET,
    NEW_MAINCATEGORIES_FAIL,
    DELETE_MAINCATEGORIES_REQUEST,
    UPDATE_MAINCATEGORIES_REQUEST,
    DELETE_MAINCATEGORIES_SUCCESS,
    UPDATE_MAINCATEGORIES_SUCCESS,
    DELETE_MAINCATEGORIES_RESET,
    UPDATE_MAINCATEGORIES_RESET,
    DELETE_MAINCATEGORIES_FAIL,
    UPDATE_MAINCATEGORIES_FAIL,
    MAINCATEGORIES_DETAILS_REQUEST,
    MAINCATEGORIES_DETAILS_SUCCESS,
    MAINCATEGORIES_DETAILS_FAIL,
    NEW_SUBCATEGORIES_RESET,
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
    DELETE_SUBCATEGORIES_RESET,
    UPDATE_SUBCATEGORIES_RESET,
    DELETE_SUBCATEGORIES_FAIL,
    UPDATE_SUBCATEGORIES_FAIL,
    SUBCATEGORIES_DETAILS_REQUEST,
    SUBCATEGORIES_DETAILS_SUCCESS,
    SUBCATEGORIES_DETAILS_FAIL,

    NEW_CHILDSUBCATEGORIES_RESET,
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
    DELETE_CHILDSUBCATEGORIES_RESET,
    UPDATE_CHILDSUBCATEGORIES_RESET,
    DELETE_CHILDSUBCATEGORIES_FAIL,
    UPDATE_CHILDSUBCATEGORIES_FAIL,
    CHILDSUBCATEGORIES_DETAILS_REQUEST,
    CHILDSUBCATEGORIES_DETAILS_SUCCESS,
    CHILDSUBCATEGORIES_DETAILS_FAIL,
} from "../constants/categoryConstant";


export const allCategoriesReducer = (state = { categoryList: [] }, action) => {

    switch (action.type) {
        case ALL_CATEGORIES_REQUEST:
        case NEW_CATEGORIES_REQUEST:

            return {
                ...state,
                loading: true,
                categoryList: []
            };
        case ALL_CATEGORIES_SUCCESS:

            return {
                ...state,
                loading: false,
                categoryList: action.payload,

            };
        case NEW_CATEGORIES_SUCCESS:

            return {
                ...state,
                loading: false,
                success: action.payload,

            };
        case NEW_CATEGORIES_RESET:

            return {
                ...state,
                isAdded: action.payload,
            };

        case ALL_CATEGORIES_FAIL:
        case NEW_CATEGORIES_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload,


            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }

}

export const allmainCategoriesReducer = (state = { categoryList: [] }, action) => {

    switch (action.type) {

        case ALL_MAINCATEGORIES_REQUEST:
        case NEW_MAINCATEGORIES_REQUEST:

            return {
                ...state,
                loading: true,
                categoryList: []
            };

        case ALL_MAINCATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                categoryList: action.payload,

            };

        case NEW_MAINCATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload,

            };
        case NEW_CATEGORIES_RESET:

            return {
                ...state,
                isAdded: action.payload,
            };
        case NEW_MAINCATEGORIES_RESET:

            return {
                ...state,
                success: false,
            };

        case ALL_MAINCATEGORIES_FAIL:
        case NEW_MAINCATEGORIES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,


            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }

}


export const mainCategoryDetailsReducer = (state = { mainCategory: {} }, action) => {
    switch (action.type) {
        case MAINCATEGORIES_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,

            };
        case MAINCATEGORIES_DETAILS_SUCCESS:
            return {
                loading: false,
                mainCategory: action.payload,
            };

        case MAINCATEGORIES_DETAILS_FAIL:

            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }

}

// Admin Delete and Update main category 
export const MainCategoryReducer = (state = {}, action) => {

    switch (action.type) {
        case DELETE_MAINCATEGORIES_REQUEST:
        case UPDATE_MAINCATEGORIES_REQUEST:
            return {
                ...state,
                loading: true,

            };
        case DELETE_MAINCATEGORIES_SUCCESS:

            return {
                ...state,
                loading: false,
                isDeleted: action.payload,


            };
        case UPDATE_MAINCATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,


            };
        case DELETE_MAINCATEGORIES_RESET:

            return {
                ...state,
                isDeleted: false,
            };

        case UPDATE_MAINCATEGORIES_RESET:

            return {
                ...state,
                isUpdated: false,
            };
        case DELETE_MAINCATEGORIES_FAIL:
        case UPDATE_MAINCATEGORIES_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }

}



// new sub categories List

export const newSubcateReducer = (state = { subcate: {} }, action) => {

    switch (action.type) {
        case NEW_SUBCATEGORIES_REQUEST:
            return {
                ...state,
                loading: true,

            };
        case NEW_SUBCATEGORIES_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                subcate: action.payload.subcate

            };
        case NEW_SUBCATEGORIES_RESET:

            return {
                ...state,
                success: false,
            };
        case NEW_SUBCATEGORIES_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }

}



export const getSubcateReducer = (state = { subCategorys: [] }, action) => {

    switch (action.type) {
        case ALL_SUBCATEGORIES_REQUEST:
        
            return {
                loading: true,
                subCategorys: [],
            };
        
        case ALL_SUBCATEGORIES_SUCCESS:
          
            return {
                loading: false,
                subCategorys: action.payload,
            };
        case ALL_SUBCATEGORIES_FAIL:
     
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }

}

// Admin Delete and Update main category 
export const SubCategoryReducer = (state = {}, action) => {

    switch (action.type) {
        case DELETE_SUBCATEGORIES_REQUEST:
        case UPDATE_SUBCATEGORIES_REQUEST:
            return {
                ...state,
                loading: true,

            };
        case DELETE_SUBCATEGORIES_SUCCESS:

            return {
                ...state,
                loading: false,
                isDeleted: action.payload,


            };
        case UPDATE_SUBCATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,


            };
        case DELETE_SUBCATEGORIES_RESET:

            return {
                ...state,
                isDeleted: false,
            };

        case UPDATE_SUBCATEGORIES_RESET:

            return {
                ...state,
                isUpdated: false,
            };
        case DELETE_SUBCATEGORIES_FAIL:
        case UPDATE_SUBCATEGORIES_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }

}


export const subCategoryDetailsReducer = (state = { subCategory: {} }, action) => {
    switch (action.type) {
        case SUBCATEGORIES_DETAILS_REQUEST:
            return {

                loading: true,
                ...state,
            };
        case SUBCATEGORIES_DETAILS_SUCCESS:
            return {
                loading: false,
                subCategory: action.payload,
            };

        case SUBCATEGORIES_DETAILS_FAIL:

            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }

}


// new sub categories List

export const newChildSubcateReducer = (state = { childsubcate: {} }, action) => {

    switch (action.type) {
        case NEW_CHILDSUBCATEGORIES_REQUEST:
            return {
                ...state,
                loading: true,

            };
        case NEW_CHILDSUBCATEGORIES_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                childsubcate: action.payload.subcate

            };
        case NEW_CHILDSUBCATEGORIES_RESET:

            return {
                ...state,
                success: false,
            };
        case NEW_CHILDSUBCATEGORIES_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }

}



export const getChildSubcateReducer = (state = { childsubCategorys: [] }, action) => {

    switch (action.type) {
        case ALL_CHILDSUBCATEGORIES_REQUEST:
        
            return {
                loading: true,
                childsubCategorys: [],
            };
        
        case ALL_CHILDSUBCATEGORIES_SUCCESS:
          
            return {
                loading: false,
                childsubCategorys: action.payload,
            };
        case ALL_CHILDSUBCATEGORIES_FAIL:
     
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }

}

// Admin Delete and Update main category 
export const ChildSubCategoryReducer = (state = {}, action) => {

    switch (action.type) {
        case DELETE_CHILDSUBCATEGORIES_REQUEST:
        case UPDATE_CHILDSUBCATEGORIES_REQUEST:
            return {
                ...state,
                loading: true,

            };
        case DELETE_CHILDSUBCATEGORIES_SUCCESS:

            return {
                ...state,
                loading: false,
                isDeleted: action.payload,


            };
        case UPDATE_CHILDSUBCATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,


            };
        case DELETE_CHILDSUBCATEGORIES_RESET:

            return {
                ...state,
                isDeleted: false,
            };

        case UPDATE_CHILDSUBCATEGORIES_RESET:

            return {
                ...state,
                isUpdated: false,
            };
        case DELETE_CHILDSUBCATEGORIES_FAIL:
        case UPDATE_CHILDSUBCATEGORIES_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }

}


export const childSubCategoryDetailsReducer = (state = { subCategory: {} }, action) => {
    switch (action.type) {
        case CHILDSUBCATEGORIES_DETAILS_REQUEST:
            return {

                loading: true,
                ...state,
            };
        case CHILDSUBCATEGORIES_DETAILS_SUCCESS:
            return {
                loading: false,
                subCategory: action.payload,
            };

        case CHILDSUBCATEGORIES_DETAILS_FAIL:

            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }

}


