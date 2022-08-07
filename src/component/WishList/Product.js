import { Link } from 'react-router-dom';
import { getDiscount } from '../../utils/functions';
import { removeFromWishlist } from '../../actions/wishlistAction';
import { useDispatch } from 'react-redux';

const Product = (props) => {

    const { product, name, price, mrpPrice, image, ratings, reviews } = props;

    const dispatch = useDispatch();

    const deleteHandler = () => {
        dispatch(removeFromWishlist(product));
    }

    return (
        <div className="col-md-12 " >
                  
        <div className="product-standard  ">
          <div className="standard-media">
            <div className="p-relative">
              <span className="standard-image">
                <img src={image} alt={name} width="20px" />
              </span>
             
            </div>
          </div>
          <div className="standard-content">
          <Link to={`/product/`} ><h4 className="standard-name">{name.length > 85 ? `${name.substring(0, 85)}...` : name}</h4></Link>
            <div className="standard-rating">
              <small className="text-muted">
                <span className="text-white btn-sm btn-success">{ratings} <i className="icofont-star text-white"></i></span> ({reviews.toLocaleString()}) </small>
            </div>
            <h5 className="standard-price d-flex justify-content-between">
              <span>
                <b className="text-muted fw-normal"><del>₹ {mrpPrice}</del></b> ₹ {price} </span>
                <span className="text-sm text-primary-green mt-1">{getDiscount(price, mrpPrice)}%&nbsp;off</span>
              <span>
              
               <button onClick={deleteHandler}><i className='far fa-trash-alt'></i></button>
               </span>
            </h5>
           
          </div>
        </div>
        
    </div> 
    );
};

export default Product;