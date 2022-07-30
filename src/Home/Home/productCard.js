import React from 'react';
import { Link } from 'react-router-dom';

import { Rating } from '@material-ui/lab';

const productCard = ({ product }) => {
  const options = {

    value: product.ratings,
    size: "small",
    readOnly: true,
    precision:0.5,

  }
  return (
    <>
      <div className="col" key={product._id}>
        <div className="product-card" >
          <div className="product-media">
            <div className="product-label">
              <label className="label-text sale">sale</label>
              <label className="label-text new">new</label>
            </div>
            <button className="product-wish wish"><i className="fas fa-heart"></i></button>
            <Link className="product-image" to="/"><img src={product.images[0].url} alt="product" />
            </Link>
            <div className="product-widget">
              <Link title="Product Compare" to="/" className="fas fa-random"></Link>
              <Link title="Product Video" to="/" className="venobox fas fa-play" ></Link>
              <Link title="Product View" to={`/product/${product._id}`} className="fas fa-eye" ></Link>
            </div>
          </div>
          <div className="product-content">
            <div className="product-rating">
              <Rating {...options} /><Link to={`/product/${product._id}`}>({product.numOfReviews} Reviews)</Link>
              {/* <i className="active icofont-star"></i><i className="active icofont-star"></i><i className="active icofont-star"></i><i className="active icofont-star"></i><i className="icofont-star"></i> */}
            </div>

            <h6 className="product-name"><Link to={`/product/${product._id}`}>{product.name}</Link></h6>

            <h6 className="product-price"><del>{product.mrp}</del><span>{`₹ ${product.price}`}
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

export default productCard;