import React, { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getOrderDetails, updateOrder } from '../actions/orderActions';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import MetaData from '../component/MetaData.js';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import Loader from "../component/Loading";
import { UPDATE_ORDER_RESET } from '../constants/orderConstant';

const UpdateOrdersList = () => {

  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const { error: updateError, isUpdated } = useSelector((state) => state.Order);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { id } = useParams();
  const [status, setStatus] = useState("");


  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, error, id, isUpdated, updateError]);

  return (
    <>
      <MetaData tittle="Ecommerce | Admin Update Orders " />
      <div className="content">
        <AdminHeader />
        <div className="container-fluid pt-4 px-4">
          <h3 className="mb-2">Update Order</h3>

          {loading ? (
            <Loader />
          ) : (
            <div className="row ">
              <div className='bg-white1 mt-3'>
                <div className="row ">
                  <div className= {order.orderStatus === "Delivered" ? "col-md-12" :"col-md-8"}>
                    <div className="account-card">
                      <div className="account-title">
                        <h4>Delivery to :</h4>
                      </div>
                      <div className="account-content">
                        <div className="row">
                          <div className="col-md-12 col-lg-12 ">
                            <div className="profile-card address ">
                              <h6>{order.user && order.user.name}</h6>

                              <p className='pb-2'>{order.shippingInfo &&
                                `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}</p>
                              <p>{order.shippingInfo && order.shippingInfo.phoneNo}</p>
                            </div>
                          </div>

                          <div className="col-lg-12">
                            <ul className="orderlist-details">
                              <li>
                                <h6>order id</h6>
                                <p>{order._id}</p>
                              </li>
                              <li><h6>Order Time</h6><p>{String(order.createdAt).substr(0, 10)} ,{String(order.createdAt).substr(11, 8)}</p></li>
                              <li>
                                <h6>Delivery Time</h6>
                                <p>{String(order.createdAt).substr(0, 10)} ,{String(order.createdAt).substr(11, 8)}</p>
                              </li>
                              <li><h6>Payment Method</h6>
                                <p className={order.paymentInfo && order.paymentInfo.status === 'succeeded' ? 'text-success' : 'text-danger'}>{order.paymentInfo && order.paymentInfo.status === 'succeeded' ? 'Paid' : 'NOT PAID'}</p></li>
                                <li><h6>Order Status </h6>
                                <p className={order.orderStatus && order.orderStatus === 'Delivered' ? 'text-success' : 'text-danger'}>{order.orderStatus && order.orderStatus}</p></li>
                            </ul>
                          </div>

                          <div className="col-lg-12">
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
                                <h6>tax</h6>
                                <p>{order.taxPrice}</p>
                              </li>
                              <li>
                                <h6>Total</h6>
                                <p>{order.totalPrice}</p>
                              </li>
                            </ul></div>

                        </div>
                      </div>
                    </div>
                    <div className="account-card">
                      <div className="account-title">
                        <h4>Your Cart Items</h4>
                      </div>
                      <div className="account-content">
                        <div className="row">
                          <div className="col-md-12 col-lg-12 ">


                            <ul className="cart-list1">

                              {order.orderItems && order.orderItems.map((item) => (
                                <li className="cart-item" key={item.product}>
                                  <div className="cart-media">
                                    <img src={item.image} width="80" alt="product" />

                                  </div>
                                  <div className="cart-info-group">
                                    <div className="cart-info d-flex justify-content-between">
                                      <h6>{item.name}</h6>

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
                 
                  <div className={order.orderStatus === "Delivered" ? "col-md-4 d-none" :"col-md-4 d-block"}>
                    <div className="bg-white1 sticky-top">
                      <div className="account-card">
                        <div className="account-title">
                          <h4>Update order Status</h4>
                        </div>
                        <form
                          className="updateOrderForm"
                          onSubmit={updateOrderSubmitHandler}
                        >
                          <div className="form-floating mb-3">
                            <select className="form-select" defaultValue="choose" onChange={(e) => setStatus(e.target.value)} aria-label="Floating label select example">
                              <option value="choose">Choose Status</option>
                              {order.orderStatus === "Recieved" && (
                                <option value="Processing">Processing</option>
                              )}
                              {order.orderStatus === "Processing" && (
                                <option value="Shipped">Shipped</option>
                              )}

                              {order.orderStatus === "Shipped" && (
                                <option value="Delivered">Delivered</option>
                              )}
                            </select>
                            <label >Status</label>
                          </div>

                          <button
                            id="createProductBtn"
                            type="submit"
                            className="cart-checkout-btn w-100"
                            disabled={
                              loading ? true : false || status === "" ? true : false
                            }
                          >
                            <span className="checkout-label">Process</span>
                          </button>
                        </form>
                        {/* <div className="checkout-charge">
                          <ul>
                            <li><span>Sub total</span><span>{subtotal}</span></li>
                            <li><span>delivery fee</span><span>{shippingCharges}</span></li>
                            <li><span>tax</span><span>{tax}</span></li>
                            <li><span>Total
                             
                            </span>
                              <span>{totalPrice}</span></li>
                          </ul>
                        </div> */}

                        {/* <button className="cart-checkout-btn w-100" ><span className="checkout-label">Proceed to Payment</span></button> */}


                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>



          )}
        </div>
        <AdminFooter />
      </div>
    </>
  )
}

export default UpdateOrdersList