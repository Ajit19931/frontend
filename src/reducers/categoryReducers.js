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
    NEW_MAINCATEGORIES_FAIL
} from "../constants/categoryConstant";



export const allCategoriesReducer = (state = { categoryList: [] }, action) => {

    switch (action.type) {
        case ALL_CATEGORIES_REQUEST:
        case NEW_CATEGORIES_REQUEST:
            case ALL_MAINCATEGORIES_REQUEST:
                case  NEW_MAINCATEGORIES_REQUEST: 
            return {
                ...state,
                loading: true,
            };
        case ALL_CATEGORIES_SUCCESS:
        case ALL_MAINCATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                categoryList: action.payload,

            };
        case NEW_CATEGORIES_SUCCESS:
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
        case ALL_CATEGORIES_FAIL:
        case NEW_CATEGORIES_FAIL:
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



// export const categoryReducer = (state = { mainCategory: [] }, action) => {

//     switch (action.type) {
     
      
//         case NEW_MAINCATEGORIES_REQUEST:    
//             return {
//                 ...state,
//                 loading: true,
//                 mainCategory: []
                
//             };
      
//         case ALL_MAINCATEGORIES_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 mainCategory: action.payload.mainCategory,

//             };
//         case NEW_MAINCATEGORIES_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,

//             };
       

  
//         case NEW_MAINCATEGORIES_FAIL:
//         case ALL_MAINCATEGORIES_FAIL:
//             return {
//                 loading: false,
//                 error: action.payload,
//                 ...state,

//             };
//         case CLEAR_ERRORS:
//             return {
//                 ...state,
//                 error: null,
//             };
//         default:
//             return state;
//     }

// }
