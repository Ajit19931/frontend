import React from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../actions/wishlistAction';
import { Rating } from '@material-ui/lab';
import { getDiscount } from '../../utils/functions';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const options = {

    value: product.ratings,
    size: "small",
    readOnly: true,
    precision:0.5,

  }

  const dispatch = useDispatch();

  const { wishlistItems } = useSelector((state) => state.wishlist);
  
  const itemInWishlist = wishlistItems.some((i) => i.product === product._id);

  const addToWishlistHandler = () => {
       
    if (itemInWishlist) {
        dispatch(removeFromWishlist(product._id));
        toast.error("Remove From Wishlist", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    } else {
        dispatch(addToWishlist(product._id));
        toast.success("Added To Wishlist", {
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
}

  return (
    <>
      <div className="col" key={product._id}>
        <div className="product-card mb-3" >
          <div className="product-media">
            <div className="product-label">
              {/* <label className="label-text sale">sale</label> */}
              <label className=" new">{getDiscount(product.price, product.mrpPrice)}% off</label>
            </div>
            <button onClick={addToWishlistHandler} className={`${itemInWishlist ? "active" : ""} product-wish wish`} ><i className="fas fa-heart"></i></button>
            <Link className="product-image deal-slider" to={`/p/${product.slug}/${product._id}`}><img src={product.images[0].url} alt={product.name} />
            </Link>
            {/* <div className="product-widget">
              <Link title="Product Compare" to="/" className="fas fa-random"></Link>
              <Link title="Product Video" to="/" className="venobox fas fa-play" ></Link>
              <Link title="Product View" to={`/product/${product._id}`} className="fas fa-eye" ></Link>
            </div> */}
          </div>
          <div className="product-content">
            <div className="product-rating">
              <Rating {...options} /><Link to={`/p/${product.slug}/${product._id}`}>({product.numOfReviews} Reviews)</Link>
              {/* <i className="active icofont-star"></i><i className="active icofont-star"></i><i className="active icofont-star"></i><i className="active icofont-star"></i><i className="icofont-star"></i> */}
            </div>

            <h6 className="product-name"><Link to={`/p/${product.slug}/${product._id}`}>{product.name}</Link></h6>

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
      </div>
    </>
  )
}

export default ProductCard;