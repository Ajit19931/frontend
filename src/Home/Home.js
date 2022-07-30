import React, { useEffect } from 'react'
import ProductCard from './Home/productCard.js';
import MetaData from '../component/MetaData.js';
import { getProduct, clearErrors } from "../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../component/Loading";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';





const Home = () => {

   const { loading, error, products } = useSelector((state) => state.products);
   const { user  } = useSelector((state) => state.user);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   useEffect(() => {
      if (error) {
         toast.error(error);
         dispatch(clearErrors());
      }
      dispatch(getProduct());

   }, [dispatch, error]);

   if(user && user.role === 'admin'){
			navigate("/admin/dashboard");
		}

   return (
      <>
         {loading ? (<Loader />) :
            (<>
               <MetaData tittle="Ecommerce | Home " />

               <section className="section recent-part mt-5">
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
               </section>
            </>)}
      </>
   )
}

export default Home