import React, { useRef, useEffect } from "react";
import MetaData from "../MetaData";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from "../cart/CheckoutSteps";
import { toast } from 'react-toastify';

import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements, } from '@stripe/react-stripe-js';
import axios from 'axios';
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { createOrder, clearErrors } from "../../actions/orderActions";

const Payment = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    };

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        payBtn.current.disabled = true;

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/api/v1/payment/process",
                paymentData,
                config
            );

            const client_secret = data.client_secret;

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        },
                    },
                },
            });

            if (result.error) {
                payBtn.current.disabled = false;

                toast.error(result.error.message);
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,

                    };
                  localStorage.removeItem("cartItems");
                    dispatch(createOrder(order));

                    navigate("/success");
                } else {
                    toast.error("There's some issue while processing payment ");
                }
            }
        } catch (error) {
            payBtn.current.disabled = false;
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error]);

    return (
        <>
            <MetaData title="Payment" />
            <section className="inner-section checkout-part  mt-3">
                <div className="container">
                    <CheckoutSteps activeStep={2} />
                    <div className='bg-white1 mt-3'>
                        <div className="row ">
                            <div className="col-lg-6 offset-md-3 col-12 ">
                                <div className="account-card">
                                    <div className="account-title">
                                        <h4>Card Info</h4>
                                    </div>
                                    <div className="account-content">
                                        <div className="row">
                                            <div className="col-md-12 col-lg-12 ">

                                                <form onSubmit={(e) => submitHandler(e)}>
                                                    <div className="row">
                                                        <div className="col-lg-12 col-12">
                                                            <div className="form-group ">
                                                                <label className="form-label">Card No</label>
                                                                <div className="paymentForm">
                                                                    <CreditCardIcon />
                                                                    <CardNumberElement className="paymentInput" />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-6 col-12">
                                                            <div className="form-group">
                                                                <label className="form-label">Card Expire Date</label>
                                                                <div className="paymentForm">
                                                                    <EventIcon />
                                                                    <CardExpiryElement className="paymentInput" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-12">
                                                            <div className="form-group">
                                                                <label className="form-label">Card CVV</label>
                                                                <div className="paymentForm">
                                                                    <VpnKeyIcon />
                                                                    <CardCvcElement className="paymentInput" />
                                                                </div>
                                                            </div>
                                                        </div>


                                                    </div>
                                                    <div className='row mt-3'>
                                                        <div className="col-lg-4 offset-md-4 text-center col-12">
                                                            <input className="form-btn" type="submit" value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                                                                ref={payBtn} />
                                                        </div>
                                                    </div>
                                                </form>

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

export default Payment