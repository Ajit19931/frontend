import { ALL_SLIDER_FAIL, ALL_SLIDER_REQUEST, ALL_SLIDER_SUCCESS, CLEAR_ERRORS, NEW_SLIDER_FAIL, NEW_SLIDER_REQUEST, NEW_SLIDER_RESET, NEW_SLIDER_SUCCESS,
    DELETE_SLIDER_REQUEST,
    DELETE_SLIDER_SUCCESS,
    DELETE_SLIDER_RESET,
    DELETE_SLIDER_FAIL,

    UPDATE_SLIDER_REQUEST,
    UPDATE_SLIDER_SUCCESS,
    UPDATE_SLIDER_RESET,
    UPDATE_SLIDER_FAIL,
    ADMIN_SLIDER_REQUEST,
    ADMIN_SLIDER_SUCCESS,
    ADMIN_SLIDER_FAIL,

} from "../constants/homeSliderConstant";

export const sliderReducer = (state = { slider: [] }, action) => {

    switch (action.type) {
        case ALL_SLIDER_REQUEST:
            case  ADMIN_SLIDER_REQUEST:
            return {
                loading: true,
                slider: [],
            };

        case ALL_SLIDER_SUCCESS:
            case ADMIN_SLIDER_SUCCESS:
            return {
                loading: false,
                slider: action.payload,
            };
        case ALL_SLIDER_FAIL:
            case ADMIN_SLIDER_FAIL:
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


// Admin New slider Create
export const newSliderReducer = (state = { slider: {} }, action) => {

    switch (action.type) {
        case NEW_SLIDER_REQUEST:
            return {
                ...state,
                loading: true,

            };
        case NEW_SLIDER_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                slider: action.payload.product

            };
        case NEW_SLIDER_RESET:

            return {
                ...state,
                success: false,
            };
        case NEW_SLIDER_FAIL:

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



// Admin Delete and Update Product 
export const delupSliderReducer = (state = {}, action) => {

    switch (action.type) {
        case DELETE_SLIDER_REQUEST:
        case UPDATE_SLIDER_REQUEST:
            return {
                ...state,
                loading: true,

            };
        case DELETE_SLIDER_SUCCESS:

            return {
                ...state,
                loading: false,
                isDeleted: action.payload,


            };
        case UPDATE_SLIDER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,


            };
        case DELETE_SLIDER_RESET:

            return {
                ...state,
                isDeleted: false,
            };

        case UPDATE_SLIDER_RESET:

            return {
                ...state,
                isUpdated: false,
            };
        case DELETE_SLIDER_FAIL:
        case UPDATE_SLIDER_FAIL:

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