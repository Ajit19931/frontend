import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../component/Loading";
import { getSliderProducts, clearErrors } from '../../actions/productActions';
import { getDiscount, getRandomProducts } from '../../utils/functions';
import { Link } from 'react-router-dom';
import { addToWishlist,removeFromWishlist } from '../../actions/wishlistAction';
import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";






const HomeProductSlider = ({ title }) => {



  const { error, products, loading } = useSelector((state) => state.products);

  const { wishlistItems } = useSelector((state) => state.wishlist);
    
    const itemInWishlist = wishlistItems.some((i) => i.product === products._id);

    const addToWishlistHandler = () => {
        if(itemInWishlist) {
            dispatch(removeFromWishlist(products._id));
            toast.error("Remove From Wishlist");
      } else {
            dispatch(addToWishlist(products._id));
            toast.success("Added To Wishlist");
        }
    }



  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getSliderProducts());

  }, [dispatch, error]);



  return (
    <>

     {loading ? (<Loader />) :
            (<>   <section className="section newitem-part mt-4 shadow-sm1 bg-white1   mx-2 ">

        <div className="d-flex  justify-content-between align-items-center px-3">

          <h1 className="fs-5 text-dark mb-0">{title} </h1>
         
          <Link className="btn-sm btn-success text-white" to="/products">VIEW ALL</Link></div>
        <hr />
        <div className="row m-0">
          {loading ? null :
            <Swiper

              centeredSlides={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              navigation={true}

              breakpoints={{
                0: {
                  spaceBetween: 5,
                  slidesPerView: 2,
                },
                768: {
                  spaceBetween: 10,
                  slidesPerView: 2,
                },
                1200: {
                  spaceBetween: 20,
                  slidesPerView: 6,
                },
              }}
              modules={[Autoplay, Navigation]}
              className="deal-slider"
            >

              {products && getRandomProducts(products, 12).map((product) => (
                <SwiperSlide key={product._id} >
                  <div className="product-card" >
                    <div className="product-media">
                      <div className="product-label">
                        {/* <label className="label-text sale">sale</label> */}
                        <span>{getDiscount(product.price, product.mrpPrice)} % off</span>
                      </div>
                      <button className={`${itemInWishlist ? "active" : " text-gray"} product-wish wish`} onClick={addToWishlistHandler}><i className="fas fa-heart "></i></button>
                      <Link className="product-image" to={`/${product.slug}/${product._id}`}><img src={product.images[0].url} alt="product" />
                      </Link>
                      {/* <div className="product-widget">
              <Link title="Product Compare" to="/" className="fas fa-random"></Link>
              <Link title="Product Video" to="/" className="venobox fas fa-play" ></Link>
              <Link title="Product View" to={`/product/${product._id}`} className="fas fa-eye" ></Link>
            </div> */}
                    </div>
                    <div className="product-content">
                      <div className="product-rating">
                      <label className="label-text sale bg-success me-2">{product.ratings} <i className="icofont-star text-white"></i></label>
                      ({product.numOfReviews})
                        {/* <Rating {...options} /><Link to={`/product/${product._id}`}>({product.numOfReviews} Reviews)</Link> */}
                        {/* <i className="active icofont-star"></i><i className="active icofont-star"></i><i className="active icofont-star"></i><i className="active icofont-star"></i><i className="icofont-star"></i> */}
                      </div>

                      <h6 className="product-name"><Link to={`/${product.slug}/${product._id}`}>{product.name}</Link></h6>

                      <h6 className="product-price">MRP : <del className="text-muted fw-normal ms-2"> ₹ {product.mrpPrice?.toLocaleString()}</del><span>{`₹ ${product.price?.toLocaleString()}`}
            </span></h6>

                      {/* <button className="product-add" title="Add to Cart"><i className="fas fa-shopping-basket"></i><span>BUY NOW</span></button> */}

                      {/* <div className="product-action ">
              <button className="action-minus" title="Quantity Minus"><i className="icofont-minus"></i></button>
              <input className="action-input" title="Quantity Number" type="text" readOnly name="quantity" value="1" />
              <button className="action-plus" title="Quantity Plus"><i className="icofont-plus"></i></button>
            </div> */}

                    </div>
                  </div>
                </SwiperSlide>
              ))}

            </Swiper>
          }
        </div>

      </section>
      </>)}
    </>
  )
}

export default HomeProductSlider