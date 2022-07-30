import "./assets/fonts/flaticon/flaticon.css";
import "./assets/fonts/icofont/icofont.min.css";
import "./assets/fonts/fontawesome/fontawesome.min.css";
import "./assets/css/main.css";
import "./assets/css/index.css";
import './App.css';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from './component/Header';
import Footer from './component/Footer';
import Navbar from './component/Navbar';
import Home from './Home/Home';
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword";
import Error from "./component/Error";
import ProductDetails from "./component/ProductDetails";
import Products from "./Product/Products";
import store from "./store";
import { loadUser } from "./actions/userAction";
import Profile from "./component/user/Profile";
import ProtectedRoute from "./component/routes/ProtectedRoute";
import UpdatePassword from "./component/user/UpdatePassword";
import Cart from "./component/cart/Cart";
import Shipping from "./component/cart/Shipping";
import ConfirmOrder from "./component/order/ConfirmOrder.js";
import Payment from "./component/cart/Payment.js";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import OrderSuccess from "./component/cart/OrderSuccess";
import MyOrders from "./component/order/MyOrders";
import OrderDetails from "./component/order/OrderDetails";
import AdminSidebar from "./Admin/AdminSidebar";
// import  AdminHeader from "./Admin/AdminHeader.js";
// import AdminFooter from "./Admin/AdminFooter.js";
import Dashboard from "./Admin/Dashboard";
import ProductList from "./Admin/ProductList";
import NewProduct from "./Admin/NewProduct";
import UpdateProduct from "./Admin/UpdateProducts";
import OrderList from "./Admin/OrderList";
import UpdateOrdersList from "./Admin/UpdateOrdersList";
import UserList from "./Admin/UserList";
import UserDetails from "./Admin/UserDetails";
import ProductReviews from "./Admin/ProductReviews.js";

function App() {

  const { user, isAuthenticated } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);



  return (
    <Router>

      {user && user.role === 'admin' ? (<AdminSidebar />) : (<><Header /> <Navbar /></>)}
      {/* {window.pathname!=='/login' ? (<><Header /> <Navbar /></>) :""}  */}


      <Routes>

        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />

        <Route exact path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/cart" element={<Cart />} />

        <Route exact path="*" element={<Error />} />


        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/password/updatepassword" element={<UpdatePassword />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/order/confirm" element={<ConfirmOrder />} />
          <Route path="/success" element={<OrderSuccess />} />
          <Route exact path="/orders" element={<MyOrders />} />
          <Route exact path="/order/:id" element={<OrderDetails />} />
          <Route exact path="*" element={<Error />} />
        </Route>

        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === "admin" ? true : false} />}>

          <Route exact path='/admin/dashboard' element={<Dashboard />} />
          <Route exact path='/admin/productlist' element={<ProductList />} />
          <Route exact path='/admin/newproduct' element={<NewProduct />} />
          <Route exact path='/admin/product/:id' element={<UpdateProduct />} />

          <Route exact path='/admin/orders' element={<OrderList />} />
          <Route exact path='/admin/order/:id' element={<UpdateOrdersList />} />
          <Route exact path='/admin/userlist' element={<UserList />} />
          <Route exact path='/admin/user/:id' element={<UserDetails />} />
          <Route exact path='/admin/reviews' element={<ProductReviews />} />
          <Route exact path="*" element={<Error />} />
        </Route>
        {/* <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} >
              <Dashboard />
            </ProtectedRoute>
          }
        /> */}

        {/* {stripeApiKey && (<Elements stripe={loadStripe(stripeApiKey)}>
          <Route element={<ProtectedRoute />}>
            <Route path="/process/payment" element={<Payment />} />
          </Route>
        </Elements>)} */}

        {/* <Route
          element={
            window.location.pathname === "/process/payment" ? null : <Error />
          }
        /> */}

      </Routes>

      <Elements stripe={loadStripe(stripeApiKey)}>
        <Routes>
          <Route exact path="/process/payment" element={<ProtectedRoute />}>
            <Route exact path="/process/payment" element={<Payment />} />
          </Route>
        </Routes>
      </Elements>


      {user && user.role === 'admin' ? "" : (<Footer />)}

    </Router>



  );
}

export default App;
