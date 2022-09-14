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
import CatProducts from "./Product/CatProducts";
import store from "./store";
import { loadUser } from "./actions/userAction";
import Profile from "./component/user/Profile";
import ProtectedRoute from "./component/routes/ProtectedRoute";
import UpdatePassword from "./component/user/UpdatePassword";
import Cart from "./component/cart/Cart";
import Shipping from "./component/cart/Shipping";
import ConfirmOrder from "./component/order/ConfirmOrder.js";
import Payment from "./component/cart/Payment.js";

import {  Routes, Route ,useLocation } from "react-router-dom";
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
import NewSlider from "./Admin/NewSlider";
import SliderList from "./Admin/SliderList";
import UpdateSliderss from "./Admin/UpdateSliderss";
import CategoryList from "./Admin/AllCategoryList";
import NewCategory from "./Admin/NewCategory";
import WishList from "./component/WishList/WishList";
import UpdateMaincategory from "./Admin/AllCategory/UpdateMaincategory";
import NewSubCategory from "./Admin/AllCategory/NewSubCategory";
import UpdateSubcategory from "./Admin/AllCategory/UpdateSubcategory";
import NewSubChildCategory from "./Admin/AllCategory/NewSubChildCategory";
import UpdateSubChildCategory from "./Admin/AllCategory/UpdateSubChildCategory";
import NewBrand from './Admin/Brand/NewBrand.js';
import UpdateBrand from "./Admin/Brand/UpdateBrand.js";


function App() {

  const { user, isAuthenticated } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");
  // const dispatch = useDispatch();
  const { pathname } = useLocation();

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();

  }, []);

   // always scroll to top on route/path change
   useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [pathname]);



  
//  // disable right click
//  window.addEventListener("contextmenu", (e) => e.preventDefault());
//  window.addEventListener("keydown", (e) => {
//    if (e.keyCode == 123) e.preventDefault();
//    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) e.preventDefault();
//    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) e.preventDefault();
//  });

  return (
    // <Router>
    <>

      {user && user.role === 'admin' ? (<AdminSidebar />) : (<><Header /> <Navbar /></>)}
      {/* {window.pathname!=='/login' ? (<><Header /> <Navbar /></>) :""}  */}

   {stripeApiKey && 
    <Elements stripe={loadStripe(stripeApiKey)}>
    <Routes>
      <Route exact path="/process/payment" element={<ProtectedRoute />}>
        <Route exact path="/process/payment" element={<Payment />} />
      </Route>
    </Routes>
  </Elements>
   }  

      <Routes>

        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />

        <Route exact path="/" element={<Home />} />
        <Route path="/p/:productSlug/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/c/:slug" element={<CatProducts />} />
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
         
          <Route path="/wishlist" element={<WishList />} />
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
          <Route exact path='/admin/slider' element={<NewSlider />} />
          <Route exact path='/admin/sliderlist' element={<SliderList />} />
          <Route exact path='/admin/updateslider/:id' element={<UpdateSliderss />} />

          <Route exact path='/admin/categorieslist' element={<CategoryList />} />
          <Route exact path='/admin/newcategory' element={<NewCategory />} /> 
          <Route exact path='/admin/updatemaincate/:id' element={<UpdateMaincategory />} />
          <Route exact path='/admin/subcategory/' element={<NewSubCategory />} />
          <Route exact path='/admin/updatesubcategory/:id' element={<UpdateSubcategory />} />
          <Route exact path='/admin/childsubcategory/' element={<NewSubChildCategory />} />
          <Route exact path='/admin/updatechildsubcat/:id' element={<UpdateSubChildCategory />} />
          
          <Route exact path='/admin/brands/' element={<NewBrand/>} />
          <Route exact path='/admin/updatebrand/:id' element={<UpdateBrand />} />
         

        </Route>

        {/* {
            window.location.pathname === "/process/payment" ? null : <Route exact path="*" element={ <Error /> } /> 
          } */}
       
         {/* <Route  element={window.location.pathname === "/process/payment" ? "" : <Error /> } /> */}

      </Routes>

      


      {user && user.role === 'admin' ? "" : (<Footer />)}

    {/* // </Router> */}

</>

  );
}

export default App;
