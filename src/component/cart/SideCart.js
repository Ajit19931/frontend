import React from 'react';

import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { Link  ,useNavigate} from 'react-router-dom';
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartActions';

const SideCart = ({ ToggleClass1 }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const increseQuantity = (id, quantity, stock) => {

    const newQty = quantity + 1;

    if (stock <= quantity) {
      return toast.error('stock is out of range');

    }
    dispatch(addItemsToCart(id, newQty));
  }
  const decreseQuantity = (id, quantity,) => {
    const newQty = quantity - 1;

    if (1 >= quantity) {
      return toast.error('stock more than 1 quantity');

    }
    dispatch(addItemsToCart(id, newQty));

  }
  const deleteCartItems = (id,) => {

    dispatch(removeItemsFromCart(id));

  }
const chekoutHandler =() => {
  navigate("/login?redirect=/shipping");
  ToggleClass1();
}
  return (
    <>

      {cartItems.length === 0 ? (
        <span>
          {/* <div className="cart-header">
        <div className="cart-total"><i className="fas fa-shopping-basket"></i><span>No item </span></div>
        <button className="cart-close" onClick={ToggleClass}><i className="icofont-close"></i></button>
      </div> */}
          <div className="text-center pt-5  m-2  bg-white p-2">

            <h3 className="mb-3">Your Cart Is Empty !</h3>
            <p className="mb-3">Add items to it now </p>
            <img src={require('../../assets/images/empty-cart.png')} className="w-100" alt="img" />
            <button className="cart-checkout-btn w-75 m-auto mt-5" onClick={ToggleClass1}>
              <span className="checkout-label">Shop Now</span></button>
          </div>
        </span>
      )
        : (
          <span>


            <ul className="cart-list">

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
            <div className="cart-footer ">
              <button className="coupon-btn">Do you have a coupon code?</button>

              <form className="coupon-form">

                <input type="text" placeholder="Enter your coupon code" />
                <button type="submit"><span>apply</span></button></form>

              <button className="cart-checkout-btn w-100" onClick={chekoutHandler}><span className="checkout-label">Proceed to Checkout</span>
                <span className="checkout-price">{`₹ ${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)}`}</span></button>
            </div>
          </span>

        )}


    </>
  )
}

export default SideCart