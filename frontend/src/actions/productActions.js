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
import axios from 'axios'

const constants = [
    [PRODUCT_LIST_REQUEST,          PRODUCT_LIST_SUCCESS,          PRODUCT_LIST_FAILED,          ''],
    [PRODUCT_DETAILS_REQUEST,       PRODUCT_DETAILS_SUCCESS,       PRODUCT_DETAILS_FAILED,       ''],
    [PRODUCT_DELETE_REQUEST,        PRODUCT_DELETE_SUCCESS,        PRODUCT_DELETE_FAILED,        ''],
    [PRODUCT_CREATE_REQUEST,        PRODUCT_CREATE_SUCCESS,        PRODUCT_CREATE_FAILED,        ''],
    [PRODUCT_UPDATE_REQUEST,        PRODUCT_UPDATE_SUCCESS,        PRODUCT_UPDATE_FAILED,        PRODUCT_UPDATE_RESET],
    [PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_REVIEW_FAILED, PRODUCT_CREATE_REVIEW_RESET,],
    [PRODUCT_TOP_REQUEST,           PRODUCT_TOP_SUCCESS,           PRODUCT_TOP_FAILED,           '']

]

export const productsAction = (type="", keyword="", id="", product={}, productId="", review={}) => async (dispatch, getState) => {
    if(product=={}){
        product._id = ""
    }
    switch(type) {
        case "get":
            if(keyword) {
                return(null)
            } else if(id) {
                return(null)
            } else {return(null)}

        case "list":
            try {
                dispatch({type:constants[0][0]})
                const { data } = await axios.get(`/api/products/?type=getproducts${keyword}`)
                dispatch({type:constants[0][1], payload: data})
                return(null)
        
            } catch(error) {
                dispatch({type:constants[0][2], 
                    payload: error.response && error.response.data.detail 
                        ? error.response.data.detail
                        : error.message,
                })
                return(null)
            }
        case "listDetails":
            try {
                dispatch({type:constants[1][0]})
                
                const { data } = await axios.get(`/api/products/?type=getproduct&pk=${id}`)
                dispatch({
                    type:constants[1][1],
                    payload: data
                })
                return(null)
        
            } catch(error) {
                dispatch({
                    type:constants[1][2], payload: error.response && error.response.data.detail 
                        ? error.response.data.detail
                        : error.message,
                })
                return(null)
            }
        case "delete":
            try {
                dispatch({type:constants[2][0]})
                const { userLogin: { userInfo }, } = getState()
                const config = {headers:{
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${userInfo.token}`
                }}
                const {data} = await axios.delete(
                    `/api/products/?type=delete&pk=${id}`,
                    config
                )
                dispatch({type:constants[2][1]})
                return(null)
            } catch(error) {
                dispatch({
                    type:constants[2][2] , payload: error.response && error.response.data.detail 
                        ? error.response.data.detail
                        : error.message,
                })
                return(null)
            }
        case "create":
            try {
                dispatch({type:constants[3][0]})
                const {userLogin: { userInfo }} = getState()
                const config = {headers:{
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${userInfo.token}`
                }}
                const {data} = await axios.post(
                    `/api/products/?type=create`,
                    {},
                    config
                )
                dispatch({type:constants[3][1], payload: data})
                return(null)
            } catch(error) {
                dispatch({
                    type:constants[3][2],payload: error.response && error.response.data.detail 
                        ? error.response.data.detail
                        : error.message,
                })
                return(null)
            }
        case "update":
            try {
                dispatch({type:constants[4][0]})
                const {userLogin: { userInfo }} = getState()
                const config = {headers:{
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${userInfo.token}`
                }}
                const {data} = await axios.put(
                    `/api/products/?type=update&pk=${product._id}`,
                    product,
                    config
                )
                dispatch({type:constants[4][1], payload: data})
                //DETAILS SUCCESS
                dispatch({type:constants[1][1], payload: data})
                return(null)
            } catch(error) {
                dispatch({
                    type:constants[4][2], payload: error.response && error.response.data.detail 
                        ? error.response.data.detail
                        : error.message,
                })
                return(null)
            }
        case "createReview":
            try {
                dispatch({type:constants[5][0]})
                const {userLogin: { userInfo }} = getState()
                const config = {headers:{
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${userInfo.token}`
                }}
                const {data} = await axios.post(
                    `/api/products/?type=createreview&pk=${productId}`,
                    review,
                    config
                )
                dispatch({type:constants[5][1], payload: data})
                return(null)
            } catch(error) {
                dispatch({
                    type:constants[5][2], payload: error.response && error.response.data.detail 
                        ? error.response.data.detail
                        : error.message,
                })
                return(null)
            }
        case "listTop":
            try {
                dispatch({type:constants[6][0]})
                const { data } = await axios.get(`/api/products/?type=gettop`)
                dispatch({type:constants[6][1], payload: data})    
                return(null)    
            } catch(error) {
                dispatch({ 
                    type:constants[6][2], payload: error.response && error.response.data.detail 
                        ? error.response.data.detail
                        : error.message,
                })
                return(null)
            }

    }
}

export const listProducts = (keyword = '') => async (dispatch) => {
    try {
        dispatch({type:constants[0][0]})

        const { data } = await axios.get(`/api/products/${keyword}`)
        dispatch({
            type:constants[0][1],
            payload: data
        })

    } catch(error) {
        dispatch({
            type:constants[0][2],
            payload: error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({type:constants[1][0]})
        const { data } = await axios.get(`/api/products/${id}`)
        dispatch({
            type:constants[1][1],
            payload: data
        })

    } catch(error) {
        dispatch({
            type:constants[1][2],
            payload: error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type:constants[2][0] 
        })

        const { userLogin: { userInfo }, } = getState()

        const config = {headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.delete(
            `/api/products/delete/${id}/`,
            config
        )
        dispatch({
            type:constants[2][1] ,
        })
   
    } catch(error) {
        dispatch({
            type:constants[2][2] ,
            payload: error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch({
            type:constants[3][0] 
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.post(
            `/api/products/create/`,
            {},
            config
        )
        dispatch({
            type:constants[3][1],
            payload: data,
        })
   
    } catch(error) {
        dispatch({
            type:constants[3][2],
            payload: error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type:constants[4][0] 
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put(
            `/api/products/update/${product._id}/`,
            product,
            config
        )
        dispatch({
            type:constants[4][1],
            payload: data,
        })

        dispatch({
            type:constants[1][1],
            payload: data,
        })
   
    } catch(error) {
        dispatch({
            type:constants[4][2],
            payload: error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createProductReview = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type:constants[5][0] 
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.post(
            `/api/products/${productId}/reviews/`,
            review,
            config
        )
        dispatch({
            type:constants[5][1],
            payload: data,
        })
   
    } catch(error) {
        dispatch({
            type:constants[5][2],
            payload: error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listTopProducts = () => async (dispatch) => {
    try {
        dispatch({type:constants[6][0]})
        const { data } = await axios.get(`/api/products/top`)
        dispatch({
            type:constants[6][1],
            payload: data
        })

    } catch(error) {
        dispatch({ 
            type:constants[6][2],
            payload: error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message,
        })
    }
}