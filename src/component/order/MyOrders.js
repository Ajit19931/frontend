
import React, { useEffect } from 'react';
import MetaData from "../MetaData";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
// import {  useNavigate } from 'react-router-dom';
import { myOrders, clearErrors } from '../../actions/orderActions';

import Loader from "../../component/Loading";
import { Link } from 'react-router-dom';


const MyOrders = () => {
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const { loading, error, orders } = useSelector((state) => state.myOrders);
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        dispatch(myOrders());
    }, [dispatch, error]);

    return (
        <>
            {loading ? (<Loader />) :
                (<>
                    <MetaData title={`${user} -- orders`} />
                    <section className="inner-section shop-part m-3 m-md-5">

                        <div className="row">
                            <h4 className="mb-3">Our Orders</h4>
                            {/* ? (

<div class="error-part p-0"><div class="container"><h1>Your  Order Is Empty</h1><img class="img-fluid" src={require('../../assets/images/error.png')}  alt="error" /><div class="mt-3"><a href="/">Shop Now</a></div></div></div>


) : */}
                            {orders && orders.map((item) =>
                                <div className="col-md-12 p-0" key={item._id}>
                                    <Link to={`/order/${item._id}`} className='w-100'>
                                        <div className="product-standard mb-md-3 ">
                                            <div className="standard-media">
                                                {item.orderItems.length === 1 && item.orderItems.map((orders, i) =>
                                                    <span className="standard-image" >
                                                        <img src={orders.image} alt="product" /></span>
                                                )}

                                                {item.orderItems.length >= 2 &&
                                                    <div className="p-relative">
                                                        <span className="standard-image" >
                                                            <img src={item.orderItems[0].image} alt="product" width={"20px"} /></span>
                                                        <span className="badge bg-danger moreimg ">{item.orderItems.length}</span>
                                                    </div>}



                                            </div>
                                            <div className="standard-content">
                                                <h4 className="standard-name">
                                                    orderId #{item._id}</h4>
                                                <h5 className="standard-price d-flex justify-content-between"> <span><b className='text-muted fw-normal'>Total :</b> {item.totalPrice}</span>   <span><b className='text-muted fw-normal'>Qty : </b> {item.orderItems.length}</span></h5>
                                                <div className="standard-rating">
                                                    <small className='text-muted'>
                                                        <span className={item.orderStatus === "Delivered" ? "text-success" : "text-danger"} >
                                                            {item.orderStatus}
                                                        </span>  at {String(item.createdAt).substr(0, 10)} ,{String(item.createdAt).substr(11, 8)}</small>
                                                </div>


                                            </div>
                                        </div>
                                    </Link>
                                </div>

                            )}

                        </div>
                    </section>
                </>
                )}
        </>
    )
}

export default MyOrders