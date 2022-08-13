import React from 'react';
import MetaData from "../MetaData";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartActions';



const Cart = () => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);
    const increseQuantity = (id, quantity, stock) => {

        const newQty = quantity + 1;

        if (stock <= quantity) {
            return toast.error('stock is out of range' , {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

        }
        dispatch(addItemsToCart(id, newQty));
    }
    const decreseQuantity = (id, quantity,) => {
        const newQty = quantity - 1;

        if (1 >= quantity) {
            return toast.error('stock more than 1 quantity' , {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

        }
        dispatch(addItemsToCart(id, newQty));

    }
    const deleteCartItems = (id,) => {

        dispatch(removeItemsFromCart(id));

    }
    return (
        <>
            <MetaData tittle="update Cart" />

            {cartItems.length === 0 ? (
                <aside className="cart-sidebar1 d-block text-center m-md-5 m-2 p-md-5 bg-white p-2">
                    <h3 className="mb-3">Your Cart Is Empty !</h3>
                    <p className="mb-3">Add items to it now </p>
                    <img src={require('../../assets/images/empty-cart.png')} alt="img"/>
                    <Link className="cart-checkout-btn w-25 m-auto mt-5" to="/">
                        <span className="checkout-label">Shop Now</span></Link>
                </aside>
            )
                : (
                    <aside className="cart-sidebar1 d-block m-md-5 m-2 p-md-5 bg-white p-2">
                        <div className="cart-header">
                            <div className="cart-total"><i className="fas fa-shopping-basket"></i><span>total item ({cartItems.length})</span></div>
                            {/* <button className="cart-close"><i className="icofont-close"></i></button> */}
                        </div>

                        <ul className="cart-list1">

                            {cartItems && cartItems.map((item) => (
                                <li className="cart-item" key={item.product}>
                                    <div className="cart-media"><Link to="/"><img src={item.image} alt="product" /></Link>

                                        <button className="cart-delete" onClick={() => deleteCartItems(item.product)}><i className="far fa-trash-alt"></i></button></div>

                                    <div className="cart-info-group">
                                        <div className="cart-info">
                                            <h6><Link to="/">{item.name}</Link></h6>
                                            <p> Price - ₹ {item.price}</p>
                                        </div>
                                        <div className="cart-action-group">
                                            <div className="product-action">

                                                <button onClick={() => decreseQuantity(item.product, item.quantity)} className="action-minus" title="Quantity Minus"><i className="icofont-minus"></i></button>

                                                <input className="action-input" title="Quantity Number" readOnly type="text" name="quantity" value={item.quantity} />

                                                <button className="action-plus" onClick={() => increseQuantity(item.product, item.quantity, item.stock)} title="Quantity Plus"><i className="icofont-plus"></i></button></div>

                                            <h6>₹ {` ${item.price * item.quantity} `}</h6>
                                        </div>
                                    </div>
                                </li>
                            ))}



                        </ul>
                        <div className="cart-footer shadow-none">
                            <button className="coupon-btn">Do you have a coupon code?</button>
                            <form className="coupon-form"><input type="text" placeholder="Enter your coupon code" /><button type="submit"><span>apply</span></button></form>
                            <Link className="cart-checkout-btn" to="checkout.html"><span className="checkout-label">Proceed to Checkout</span><span className="checkout-price">$369.78</span></Link>
                        </div>
                    </aside>

                )}


        </>
    )
}

export default Cart