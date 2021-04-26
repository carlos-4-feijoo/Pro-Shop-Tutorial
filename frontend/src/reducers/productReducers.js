import { PRODUCT_LIST_REQUEST,  
        PRODUCT_LIST_SUCCESS, 
        PRODUCT_LIST_FAILED,
        PRODUCT_DETAILS_REQUEST,  
        PRODUCT_DETAILS_SUCCESS, 
        PRODUCT_DETAILS_FAILED,
        PRODUCT_DELETE_REQUEST,  
        PRODUCT_DELETE_SUCCESS, 
        PRODUCT_DELETE_FAILED,
        PRODUCT_CREATE_REQUEST,  
        PRODUCT_CREATE_SUCCESS, 
        PRODUCT_CREATE_FAILED,
        PRODUCT_CREATE_RESET,
        PRODUCT_UPDATE_REQUEST,  
        PRODUCT_UPDATE_SUCCESS, 
        PRODUCT_UPDATE_FAILED,
        PRODUCT_UPDATE_RESET,
        PRODUCT_CREATE_REVIEW_REQUEST,  
        PRODUCT_CREATE_REVIEW_SUCCESS, 
        PRODUCT_CREATE_REVIEW_FAILED,
        PRODUCT_CREATE_REVIEW_RESET,
        PRODUCT_TOP_REQUEST,  
        PRODUCT_TOP_SUCCESS, 
        PRODUCT_TOP_FAILED,
} from '../constants/productConstants'

const constants = [
    [PRODUCT_LIST_REQUEST,          PRODUCT_LIST_SUCCESS,          PRODUCT_LIST_FAILED,          ''],
    [PRODUCT_DETAILS_REQUEST,       PRODUCT_DETAILS_SUCCESS,       PRODUCT_DETAILS_FAILED,       ''],
    [PRODUCT_DELETE_REQUEST,        PRODUCT_DELETE_SUCCESS,        PRODUCT_DELETE_FAILED,        ''],
    [PRODUCT_CREATE_REQUEST,        PRODUCT_CREATE_SUCCESS,        PRODUCT_CREATE_FAILED,        PRODUCT_CREATE_RESET],
    [PRODUCT_UPDATE_REQUEST,        PRODUCT_UPDATE_SUCCESS,        PRODUCT_UPDATE_FAILED,        PRODUCT_UPDATE_RESET],
    [PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_REVIEW_FAILED, PRODUCT_CREATE_REVIEW_RESET,],
    [PRODUCT_TOP_REQUEST,           PRODUCT_TOP_SUCCESS,           PRODUCT_TOP_FAILED,           '']

]


export const productsReducer = (state={
        list:{products:[{reviews:[]}], name:null, _id:null}, 
        delete:{}, 
        create:{}, 
        update:{product:{}}, 
        createReview:{}, 
        top:{products:[]}
    }, action) => {
    switch(action.type) {
        //PRODUCT LIST
        case constants[0][0]:
            return {...state, list:{
                loading:true
            }}
        case constants[0][1]:
            return {...state, list: {
                loading:false,
                products:action.payload.products,
                page:action.payload.page,
                pages:action.payload.pages
            }}
        case constants[0][2]:
            return {...state, list: {
                loading:false, 
                error: action.payload
            }}
        
        //PRODUCT DETAILS
        case constants[1][0]:
            return {...state, list: {
                ...state.list,
                loading:true, 
            }}
        case constants[1][1]:
            return {...state, list: {
                loading:false, 
                products: [action.payload]
            }}
        case constants[1][2]:
            return {...state, list: {
                loading:false, 
                error: action.payload
            }}

        //PRODUCT DELETE
        case constants[2][0]:
            return {...state, delete: {
                loading:true
            }}
        case constants[2][1]:
            return {...state, delete: {
                loading:false, 
                success: true
            }}
        case constants[2][2]:
            return {...state, delete: {
                loading:false, 
                error: action.payload
            }}
        
        //PRODUCT CREATE
        case constants[3][0]:
            return {...state, create: {
                loading:true
            }}
        case constants[3][1]:
            return {...state, create: {
                loading:false, 
                success: true, 
                product: action.payload
            }}
        case constants[3][2]:
            return {...state, create: {
                loading:false, 
                error: action.payload
            }}
        case constants[3][4]:
            return {...state, create: {}}
        
        //PRODUCT UPDATE
        case constants[4][0]:
            return {...state, update: {loading:true}}
        case constants[4][1]:
            return {...state, update: {
                loading:false, 
                success: true, 
                product: action.payload
            }}
        case constants[4][2]:
            return {...state, update: {
                loading:false, 
                error: action.payload
            }}
        case constants[4][3]:
            return {...state, update:{product:{}}}
        
        //PRODUCT CREATE REVIEW
        case constants[5][0]:
            return {...state, createReview: {loading:true}}
        case constants[5][1]:
            return {...state, createReview: {loading:false, success: true}}
        case constants[5][2]:
            return {...state, createReview: {loading:false, error: action.payload}}
        case constants[5][3]:
            return {...state, createReview: {}}
        
        //PRODUCT TOP REQUEST
        case constants[6][0]:
            return {...state, top:{loading:true, products:[]}}
        case constants[6][1]:
            return {...state, top:{loading:false, products: action.payload}}
        case constants[6][2]: 
            return {...state, top:{loading:false, error: action.payload}}

        //DEFAULT
        default:
            return state

    }
}

export const productListReducer =  (state={products:[]}, action) => {
    switch(action.type) {
        case constants[0][0]:
            return {loading:true, products:[]}
        case constants[0][1]:
            return {
                loading:false, 
                products: action.payload.products, 
                page:action.payload.page, 
                pages:action.payload.pages
            }
        case constants[0][2]:
            return {loading:false, error: action.payload}
        default:
            return state
    }
}

export const productDetailsReducer =  (state={product:{reviews:[]}}, action) => {
    switch(action.type) {
        case constants[1][0]:
            return {loading:true, ...state}
        case constants[1][1]:
            return {loading:false, product: action.payload}
        case constants[1][2]:
            return {loading:false, error: action.payload}
        default:
            return state
    }
}

export const productDeleteReducer = (state={}, action) => {
    switch(action.type) {
        case constants[2][0]:
            return {loading:true}
        case constants[2][1]:
            return {loading:false, success: true}
        case constants[2][2]:
            return {loading:false, error: action.payload}
        default:
            return state
    }
}

export const productCreateReducer = (state={}, action) => {
    switch(action.type) {
        case constants[3][0]:
            return {loading:true}
        case constants[3][1]:
            return {loading:false, success: true, product: action.payload}
        case constants[3][2]:
            return {loading:false, error: action.payload}
        case constants[3][4]:
            return {}
        default:
            return state
    }
}

export const productUpdateReducer = (state={product:{}}, action) => {
    switch(action.type) {
        case constants[4][0]:
            return {loading:true}
        case constants[4][1]:
            return {loading:false, success: true, product: action.payload}
        case constants[4][2]:
            return {loading:false, error: action.payload}
        case constants[4][3]:
            return {product:{}}
        default:
            return state
    }
}

export const productCreateReviewReducer = (state={}, action) => {
    switch(action.type) {
        case constants[5][0]:
            return {loading:true}
        case constants[5][1]:
            return {loading:false, success: true}
        case constants[5][2]:
            return {loading:false, error: action.payload}
        case constants[5][3]:
            return {}
        default:
            return state
    }
}

export const productTopRatedReducer = (state={products:[]}, action) => {
    switch(action.type) {
        case constants[6][0]:
            return {loading:true, products:[]}
        case constants[6][1]:
            return {loading:false, products: action.payload}
        case constants[6][2]: 
            return {loading:false, error: action.payload}
        default:
            return state
    }
}