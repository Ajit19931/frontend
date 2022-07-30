import React, { useState } from "react";
import MetaData from "./MetaData";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { logout } from "../actions/userAction";
import { toast } from 'react-toastify';
import SideCart from "./cart/SideCart";

const Header = () => {

  const [isActive, setActive] = useState("false");
  const [isActiveCart, setActiveCart] = useState("false");

  const ToggleClass = () => {
    setActive(!isActive);
   
  };
  const ToggleClass1 = () => {
    setActiveCart(!isActiveCart);

    // if(setActiveCart === true){
    //   document.body.style.overflow = 'hidden';
    // }
 

 
  };
  const dispatch = useDispatch();
  const { user, loading } = useSelector(
    (state) => state.user
  );
  const { cartItems } = useSelector((state) => state.cart);

  const logouthandle = () => {
    dispatch(logout());
    toast.success(' Logout Successfully ', { autoClose: 3000, });
  }
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
      document.querySelector('.header-form input').defaultValue = '';
    } else {
      navigate("/products");

    }
  };


  return (
    <>
      <MetaData title="Search A Product -- ECOMMERCE" />


      <div className="header-top">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-5">
              <div className="header-top-welcome">
                <p>Welcome to Ecomart in Your Dream Online Store!</p>
              </div>
            </div>
            <div className="col-md-5 col-lg-3">
              <div className="header-top-select">
                <div className="header-select">
                  <i className="icofont-world"></i>
                  <select className="select" defaultValue={'english'}>
                    <option value="english" >english</option>

                  </select>
                </div>
                <div className="header-select">
                  <i className="icofont-money"></i>
                  <select className="select" defaultValue={'inr'}>
                    <option value="inr" >INR</option>

                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-7 col-lg-4">
              <ul className="header-top-list">
                <li><Link to="/">offers</Link></li>
                <li><Link to="/">need help</Link></li>
                <li><Link to="/">contact us</Link></li>
                {user ? (<li><Link to="/" onClick={logouthandle}>logout</Link></li>) : (<li><Link to="/login">login</Link></li>)}

              </ul>
            </div>
          </div>
        </div>
      </div>
      <header className="header-part">
        <div className="container">
          <div className="header-content">
            <div className="header-media-group">
              <button className="header-user">
                {user ? (<img src={user.avatar && user.avatar.url} alt={user.name} />) : (<img src={require('../assets/images/user.png')} alt="user" />)}

              </button>
              <Link to="/"><img src={require('../assets/images/logo.png')} alt="logo" /></Link>
              <button className="header-src" onClick={ToggleClass}>
                <i className="fas fa-search"></i></button>
            </div>

            <Link to="/" className="header-logo ">
              <img src={require('../assets/images/logo.png')} alt="logo" /></Link>
            <form className={!isActive ? "header-form mx-4 active" : "header-form mx-4 inactive"} onSubmit={searchSubmitHandler}>
              <input type="text" onChange={(e) => setKeyword(e.target.value)} placeholder="Search anything..." />
              <button type="submit"><i className="fas fa-search"></i></button>
            </form>
            {user ? (

              <div className="navbar-item dropdown">
                <Link className="navbar-link dropdown-arrow p-0 header-widget" to="/"><img src={user.avatar && user.avatar.url} alt={user && user.name} /><span>{user && user.name}</span></Link>
                <ul className="dropdown-position-list">
                  {user && user.role === 'admin' ? (
                    <li><Link to="/admin/dashboard"> <i className="fa fa-th-large text-color me-2"></i>Dashboard</Link></li>
                  ) : (<li><Link to="/profile"> <i className="fas fa-user-circle text-color me-2"></i>My Profile</Link></li>)}

                  <li><Link to="/orders"><i className="fas fa-shopping-bag text-color me-2"></i> Orders</Link></li>
                  <li><Link to="/" onClick={logouthandle}><i className="fas fa-power-off text-color me-2"></i>  Logout</Link></li>

                </ul>
              </div>

              // <Link to="/account" className="header-widget" title="My Account">
              //   <img src={user.avatar && user.avatar.url} alt={user && user.name} /><span>{user && user.name}</span></Link>

            ) : (!loading && <Link to="/login" className="header-widget me-4" title="My Account"><img src={require('../assets/images/user.png')} alt="user" /><span>Login</span></Link>
            )}




            <div className="header-widget-group">

              <Link to="/" className="header-widget" title="Compare List">
                <i className="fas fa-random"></i><sup>0</sup></Link>
              <Link to="/" className="header-widget" title="Wishlist">
                <i className="fas fa-heart"></i><sup>0</sup></Link>
              <button className="header-widget header-cart" title="Cartlist" onClick={ToggleClass1}>
                <i className="fas fa-shopping-basket"></i><sup>{cartItems.length}</sup><span>total price<small>{`₹ ${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)}`}</small>
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <aside className={!isActiveCart ? "cart-sidebar active" : "cart-sidebar inactive"}>
        <div className="cart-header">
          <div className="cart-total"><i className="fas fa-shopping-basket"></i><span>total item ({cartItems.length})</span></div>
          <button className="cart-close" onClick={ToggleClass1} ><i className="icofont-close"></i></button>
        </div>
        <SideCart ToggleClass1={ToggleClass1} />
      </aside>
      <div className={!isActiveCart ? "backdrop d-block" : "backdrop "}></div>
      <div className="mobile-menu">
        <Link to="/" title="Home Page"><i className="fas fa-home"></i><span>Home</span>
        </Link>
        <button className="cate-btn" title="Category List"><i className="fas fa-list"></i><span>category</span></button>
        <button className="cart-btn" title="Cartlist" onClick={ToggleClass1}><i className="fas fa-shopping-basket"></i><span>cartlist</span><sup>{cartItems.length}</sup></button>
        <Link to="/" title="Wishlist"><i className="fas fa-heart"></i><span>wishlist</span><sup>0</sup></Link>
        <Link to="/" title="Compare List"><i className="fas fa-random"></i><span>compare</span><sup>0</sup></Link></div>
    </>
  )
}

export default Header