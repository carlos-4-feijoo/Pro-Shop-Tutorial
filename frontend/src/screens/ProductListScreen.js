import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts, deleteProduct, createProduct, productsAction } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import Paginate from '../components/Paginate'

 
function ProductListScreen({history, match}) {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productsStore.list)
    const {loading, error, products, pages, page} = productList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const productDelete = useSelector(state => state.productsStore.delete)
    const {loading:loadingDelete, error:errorDelete, success:successDelete} = productDelete

    const productCreate = useSelector(state => state.productsStore.create)
    const {loading:loadingCreate, error:errorCreate, success:successCreate, product:createdProduct} = productCreate

    let keyword = history.location.search

    useEffect(() => {
        dispatch({type:PRODUCT_CREATE_RESET})
        if(!userInfo.isAdmin) {
            history.push('/login')
        } 
        if(successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        } else {
            //NEEW dispatch(listProducts(keyword))
            //(type="", keyword="", id="", product={}, productId="", review={})
            //?keyword=&page=2 
            if(keyword.substring(0,1) == "?"){
                const xd = "&"
                keyword=keyword.split("?")[1]
                keyword = xd.concat(keyword)
            }
            dispatch(productsAction("list", keyword))
        }
    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, keyword])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you want to delete this product?')) {
            //NEEW dispatch(deleteProduct(id))
            //(type="", keyword="", id="", product={}, productId="", review={})
            dispatch(productsAction("delete", "", id))
        }
    }

    const createProductHandler = (product) => {
        //NEEW dispatch(createProduct())
        //(type="", keyword="", id="", product={}, productId="", review={})
        dispatch(productsAction("create"))
    }

    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button
                        className='my-3'
                        onClick={createProductHandler}
                    >
                        <i className='fas fa-plus'></i> Create Product 
                    </Button>
                </Col>
            </Row>

            {loadingDelete && <Loader/>}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

            {loadingCreate && <Loader/>}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            {
                loading ? (
                    <Loader/>
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <div>
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>PRICE</th>
                                    <th>CATEGORY</th>
                                    <th>BRAND</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.map(product => (
                                        <tr key={product._id}>
                                            <td>{product._id}</td>
                                            <td>{product.name}</td>
                                            <td>{product.price}</td>
                                            <td>{product.category}</td>
                                            <td>{product.brand}</td>

                                            <td>
                                                <LinkContainer to={`/admin/product/${product._id}/edit/`}>
                                                    <Button 
                                                        variant='light'
                                                        className='btn-sm'
                                                    >
                                                        <i className='fas fa-edit'></i>
                                                    </Button>
                                                </LinkContainer>
                                                <Button 
                                                        variant='danger'
                                                        className='btn-sm'
                                                        onClick={() => deleteHandler(product._id)}
                                                    >
                                                        <i className='fas fa-trash'></i>
                                                    </Button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                        <Paginate pages={pages} page={page} isAdmin={true}></Paginate>
                    </div>
                )
            }
        </div>
    )
}

export default ProductListScreen
