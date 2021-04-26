import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
//import products from '../products'
import Product from '../components/Product'
//import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts, productsAction } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'

 
function HomeScreen({history}) {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productsStore.list)
    const {error, loading, products, page, pages} = productList
    
    let keyword = history.location.search
    
    useEffect(() => {
        // NEEW dispatch(listProducts(keyword))
        //(type="", keyword="", id="", product={}, productId="", review={})
        if(keyword.substring(0,1) == "?"){
            const xd = "&"
            keyword=keyword.split("?")[1]
            keyword = xd.concat(keyword)
        }
        dispatch(productsAction("list", keyword))
    }, [dispatch, keyword])

    return (
        <div>
            {(keyword.split('&')[0].split('=')[1] == '' || !keyword) && <ProductCarousel/>}
            
            <h1>Latest Products</h1>
            {loading ? <Loader/>
                : error ? <Message variant="danger">{error}</Message> 
                : 
                <div>
                    <Row>
                        {products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate page={page} pages={pages} keyword={keyword} />
                </div>
            }
            
        </div>
    )
}

export default HomeScreen
