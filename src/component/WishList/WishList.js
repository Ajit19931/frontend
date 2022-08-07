import React from 'react';

import MetaData from '../MetaData';
import { useSelector   } from 'react-redux';
import "../../assets/css/error.css";
import { Link } from 'react-router-dom';
import Product from './Product';

const WishList = () => {


    const { wishlistItems } = useSelector((state) => state.wishlist);
  

    return (
        <>
            <MetaData title="Wishlist " />
            <section className="section newitem-part mt-4 shadow-sm bg-white   mx-2 ">

                <div className="d-flex  justify-content-between align-items-center px-3">

                    <h1 className="fs-5 text-dark mb-0">WishList ({wishlistItems.length})</h1></div>
                <hr />
                
                    {wishlistItems.length === 0 && (
                     <div className="row m-0 error-part pt-3">
 <div className="col-md-4 offset-md-4">
                            {/* <h1>404 | Not Found</h1> */}
                            <img className="img-fluid w-100" src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/mywishlist-empty_39f7a5.png" alt="error" />
                            <h3>Empty Wishlist</h3>
                            <p>You have no items in your wishlist. Start adding!</p>
                            <Link to="/">go to home</Link>
                        </div>
                        </div>


                    )}
              
                <div className="row m-0" >
                {wishlistItems.map((item, index) => (
                   
                   <Product {...item} key={index}/>
              
                )
                ).reverse()}
  </div>
            </section>


        </>
    )
}

export default WishList