import "../../assets/css/orderlist.css"
import React, { useEffect } from 'react';
import MetaData from "../MetaData";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
// import {  useNavigate } from 'react-router-dom';
import { getOrderDetails, clearErrors } from '../../actions/orderActions';

import Loader from "../../component/Loading";
import { useParams, Link } from 'react-router-dom';
import { formatDate } from "../../utils/functions";

const OrderDetails = () => {
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const { loading, error, order } = useSelector((state) => state.orderDetails);


    const { id } = useParams();
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        dispatch(getOrderDetails(id));
    }, [dispatch, error, id]);

    // if(order.orderStatus && order.orderStatus === "Delivered" ){
    //     document.getElementsByClassName("order-track-item").classList.add("active"); 
    // }


    return (
        <>
            {loading ? (<Loader />) :
                (<>
                    <MetaData title="order Details" />
                    <section className='inner-section orderlist-part mt-3'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <div className="orderlist">
                                        <div className="orderlist-head">
                                            <h6>O.ID :{order && order._id}</h6>
                                            <h5> {order && order.orderStatus}</h5>
                                        </div>
                                        <div className="orderlist-body">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="order-track">



                                                        <ul className="order-track-list">
                                                            <li className="order-track-item active">
                                                                <i className="icofont-check"></i><span>order recieved 
                                                                <div className="text-muted">{order && formatDate(order.createdAt)}</div>
                                                                    </span> </li>

                                                            <li className={order.orderStatus && order.orderStatus === "Processing" ? "order-track-item active" : order.orderStatus && order.orderStatus === "Shipped" ? "order-track-item active" : order.orderStatus && order.orderStatus === "Delivered" ? "order-track-item active" : "order-track-item"}> <i className={order.orderStatus && order.orderStatus === "Processing" ? "icofont-check" : order.orderStatus && order.orderStatus === "Shipped" ? "icofont-check" : order.orderStatus && order.orderStatus === "Delivered" ? "icofont-check" : "icofont-close"}></i><span>order processed<div className="text-muted">
                                                            {order.processAt !== "Invalid Date" && (
                                                                <span>{order  && formatDate(order.processAt)}</span>
                                                            )}
                                                            </div>
                                                                    </span></li>

                                                            <li className={order.orderStatus && order.orderStatus === "Shipped" ? "order-track-item active" : order.orderStatus && order.orderStatus === "Delivered" ? "order-track-item active" : "order-track-item"}><i className={order.orderStatus && order.orderStatus === "Shipped" ? "icofont-check" : order.orderStatus && order.orderStatus === "Delivered" ? "icofont-check" : "icofont-close"}></i><span>order shipped
                                                                
                                                            {order && order.shippedAt !== "Invalid Date" ?
                                                                
                                                             (<div className="text-muted"> {formatDate(order.shippedAt)}</div>
                                                            ) : (<div className="text-muted"></div>)}
                                                                
                                                                    </span></li>

                                                            <li className={order.orderStatus && order.orderStatus === "Delivered" ? "order-track-item active" : "order-track-item"}> <i className={order.orderStatus && order.orderStatus === "Delivered" ? "icofont-check" : "icofont-close"}></i><span>order delivered<div className="text-muted">{order && formatDate(order.deliveredAt)}</div>
                                                                    </span></li>
                                                        </ul>

                                                    </div>
                                                </div>
                                                <div className="col-lg-5">
                                                    <ul className="orderlist-details">
                                                        <li>
                                                            <h6>order id</h6>
                                                            <p>{order._id}</p>
                                                        </li>
                                                        {/* <li>
                                                            <h6>Total Item</h6>
                                                            <p> Items</p>
                                                        </li> */}
                                                        <li>
                                                            <h6>Order Time</h6>
                                                            <p>{formatDate(order.createdAt)} </p>
                                                        </li>
                                                        <li>
                                                            <h6>Delivery Time</h6>
                                                            <p>{formatDate(order.createdAt)} </p>
                                                        </li>
                                                        <li>
                                                            <h6>Payment Method</h6>
                                                            <p className={order.paymentInfo && order.paymentInfo.status === 'succeeded' ? 'text-success' : 'text-danger'}>{order.paymentInfo && order.paymentInfo.status === 'succeeded' ? 'Paid' : 'NOT PAID'}</p>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="col-lg-4">
                                                    <ul className="orderlist-details">
                                                        <li>
                                                            <h6>Sub Total</h6>
                                                            <p>{order.itemsPrice}</p>
                                                        </li>
                                                        <li>
                                                            <h6>discount</h6>
                                                            <p>0</p>
                                                        </li>
                                                        <li>
                                                            <h6>delivery fee</h6>
                                                            <p>{order.taxPrice}</p>
                                                        </li>
                                                        <li>
                                                            <h6>Total</h6>
                                                            <p>{order.totalPrice}</p>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="col-lg-3">
                                                    <div className="orderlist-deliver">
                                                        <h6>Delivery location</h6>
                                                        <p>{order.user && order.user.name}</p>
                                                        <p>{order.shippingInfo && `${order.shippingInfo.address} ,${order.shippingInfo.city} ${order.shippingInfo.state}  - ${order.shippingInfo.pinCode} ,${order.shippingInfo.country}`}</p>
                                                        <p>{order.shippingInfo && order.shippingInfo.phoneNo}</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <ul className="cart-list1">

                                                        {order.orderItems && order.orderItems.map((item) => (
                                                            <li className="cart-item" key={item.product}>
                                                                <div className="cart-media">
                                                                    <Link to={`/product/${item.product}`}><img src={item.image} alt="product" /></Link>

                                                                </div>
                                                                <div className="cart-info-group">
                                                                    <div className="cart-info d-flex justify-content-between">
                                                                        <h6><Link to={`/product/${item.product}`}>{item.name}</Link></h6>
                                                                        {/* <p> Price - ₹ {item.price}</p> */}

                                                                    </div>
                                                                    <p>{item.description}</p>
                                                                    <div className="cart-action-group">
                                                                        <div className="product-action">
                                                                            <p> {` ${item.quantity}  X ₹ ${item.price} `}  </p>
                                                                        </div>
                                                                        <h6>₹ {` ${item.price * item.quantity} `}</h6>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))}



                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </section>
                </>
                )}
        </>
    )
}

export default OrderDetails