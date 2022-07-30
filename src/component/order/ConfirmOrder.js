import React from 'react';
import "../../assets/css/checkout.css"
import MetaData from "../MetaData";
import { useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from "../cart/CheckoutSteps";

const ConfirmOrder = () => {
    document.getElementsByClassName('mobile-menu')[0].style.visibility = 'hidden';
    const navigate = useNavigate();
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);


    const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const shippingCharges = subtotal > 1000 ? 0 : 200;
    const tax = subtotal * 0.18;

    const totalPrice = subtotal + tax + shippingCharges;

    const address = `${shippingInfo.address} ,${shippingInfo.city} ${shippingInfo.state}  - ${shippingInfo.pinCode} ,${shippingInfo.country}`;


    const proceedToPayment = () => {

        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice
        }

        sessionStorage.setItem("orderInfo", JSON.stringify(data));
        navigate("/process/payment");
    }

    return (
        <>
            <MetaData title="Order Summary" />
            <section className="inner-section checkout-part  mt-3">
                <div className="container">
                    <CheckoutSteps activeStep={1} />
                    <div className='bg-white1 mt-3'>
                        <div className="row ">
                            <div className="col-lg-8 col-12 ">
                                <div className="account-card">
                                    <div className="account-title">
                                        <h4>Delivery to :</h4> <Link to="/shipping">Change </Link>
                                    </div>
                                    <div className="account-content">
                                        <div className="row">
                                            <div className="col-md-12 col-lg-12 ">
                                                <div className="profile-card address ">
                                                    <h6>{user.name}</h6>

                                                    <p className='pb-2'>{address}</p>
                                                    <p>{shippingInfo.phoneNo}</p>
                                                </div>
                                            </div>


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

                                                    {cartItems && cartItems.map((item) => (
                                                        <li className="cart-item" key={item.product}>
                                                            <div className="cart-media">
                                                                <Link to={`/product/${item.product}`}><img src={item.image} alt="product" /></Link>

                                                            </div>
                                                            <div className="cart-info-group">
                                                                <div className="cart-info d-flex justify-content-between">
                                                                    <h6><Link to="/">{item.name}</Link></h6>
                                                                    {/* <p> Price - ₹ {item.price}</p> */}
                                                                    <button className="cart-delete" ><i className="far fa-trash-alt"></i></button>
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
                            <div className="col-md-4">
                                <div className="bg-white1 sticky-top">
                                    <div className="account-card">
                                        <div className="account-title">
                                            <h4>Total</h4>
                                        </div>
                                        <div className="checkout-charge">
                                            <ul>
                                                <li><span>Sub total</span><span>{subtotal}</span></li>
                                                <li><span>delivery fee</span><span>{shippingCharges}</span></li>
                                                <li><span>tax</span><span>{tax}</span></li>
                                                <li><span>Total
                                                    {/* <small>(Incl. VAT)</small> */}
                                                </span>
                                                    <span>{totalPrice}</span></li>
                                            </ul>
                                        </div>
                                        <div className="cart-footer shadow-none">
                                            <button className="coupon-btn">Do you have a coupon code?</button>
                                            <form className="coupon-form">
                                                <input type="text" placeholder="Enter your coupon code" /><button type="submit"><span>apply</span></button>
                                            </form>
                                            <button className="cart-checkout-btn w-100" onClick={proceedToPayment}><span className="checkout-label">Proceed to Payment</span></button>

                                            <div className='pt-3'>
                                                <h5>WE ACCEPT's</h5>
                                                <span><img src={require('../../assets/images/payment/jpg/01.jpg')} alt="payment" /></span>
                                                <span><img src={require('../../assets/images/payment/jpg/02.jpg')} alt="payment" /></span>
                                                <span><img src={require('../../assets/images/payment/jpg/03.jpg')} alt="payment" /></span>
                                                <span><img src={require('../../assets/images/payment/jpg/04.jpg')} alt="payment" /></span>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}

export default ConfirmOrder