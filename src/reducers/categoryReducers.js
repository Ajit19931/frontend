import {
    ALL_CATEGORIES_FAIL,
    ALL_CATEGORIES_REQUEST,
    ALL_CATEGORIES_SUCCESS,
    CLEAR_ERRORS,
    NEW_CATEGORIES_FAIL,
    NEW_CATEGORIES_REQUEST,
    NEW_CATEGORIES_RESET,
    NEW_CATEGORIES_SUCCESS
} from "../constants/categoryConstant";



export const allCategoriesReducer = (state = { categoryList: [] }, action) => {

    switch (action.type) {
        case ALL_CATEGORIES_REQUEST:
            case NEW_CATEGORIES_REQUEST:
            return {
                ...state,
                loading: true,
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
    
                };
                case NEW_CATEGORIES_RESET:
                    return {
                      ...state,
                      isAdded: action.payload,
                    };

        case ALL_CATEGORIES_FAIL:
            case NEW_CATEGORIES_FAIL:
            return {
                loading: false,
                error: action.payload,
                ...state,

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
