import React from 'react'
// import ProductCard from './Home/productCard.js';
import MetaData from '../component/MetaData.js';

import { useSelector } from "react-redux";
// import Loader from "../component/Loading";

import { Link, useNavigate } from 'react-router-dom';
import HomeSlider from "./HomeSlider.js";
import DealSlider from './DealSlider/DealSlider.jsx';
import HomeCategory from './Home/HomeCategory.js';
import HomeProductSlider from './Home/HomeProductSlider';





const Home = () => {

   const { user } = useSelector((state) => state.user);

 
   const navigate = useNavigate();
  

   if (user && user.role === 'admin') {
      navigate("/admin/dashboard");
   }

   return (
      <>
         {/* {loading ? (<Loader />) :
            (<> */}
               <MetaData title="Online Shopping Site for Mobiles, Electronics, Furniture, Grocery, Lifestyle, Books & More. Best Offers!" />
               <HomeSlider />
               <HomeCategory />
               <HomeProductSlider title={"Suggested for You"} />
               <DealSlider title={"Discounts for You"} />

               <div className="section promo-part">
                  <div className="container-fluid">
                     <div className="row">
                        <div className="col-lg-12">
                           <div className="promo-img">
                              <Link to="/products">
                                 <img src={require('../assets/images/promo/home/03.jpg')} alt="promo" /></Link>
                           </div>
                        </div></div></div></div>
                        <HomeProductSlider title={"You May Also Like..."} />

               {/* <section className="section recent-part mt-5">
                  <div className="container">
                     <div className="row">
                        <div className="col-lg-12">
                           <div className="section-heading">
                              <h2>Our Fetures Products</h2>
                           </div>
                        </div>
                     </div>
                     <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">

                        {products && products.map(product => (
                           <ProductCard key={product._id} product={product} />

                        ))}

                     </div>
                  </div>
               </section> */}

               <DealSlider title={"Top Brands, Best Price"} />
            {/* </>)} */}
      </>
   )
}

export default Home