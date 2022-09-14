import React, { useEffect, useState } from 'react';
import "../assets/css/product-details.css";
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProductDetails, newReview } from '../actions/productActions';
import { toast } from 'react-toastify';
import Loader from "../component/Loading";
import MetaData from '../component/MetaData.js';
import ReviewCard from "../component/ReviewCard.js";
import { addItemsToCart } from '../actions/cartActions';
import { Rating } from '@material-ui/lab';
import { NEW_REVIEW_RESET } from '../constants/productConstant';
import ProSlider from './ProSlider';
import { getDiscount, getDeliveryDate } from '../utils/functions';
import { addToWishlist, removeFromWishlist } from '../actions/wishlistAction';
import HomeProductSlider from '../Home/Home/HomeProductSlider';



const ProductDetails = () => {

    // const labels = {
    //     1: 'Useless',
    //     2: 'Poor',
    //     3: 'Ok',
    //     4: 'Good',
    //     5: 'Excellent',
    // };

    const dispatch = useDispatch();

    const { loading, error, product } = useSelector((state) => state.productDetails);
    const { success, error: reviewError } = useSelector((state) => state.newReview);
    const { wishlistItems } = useSelector((state) => state.wishlist);
    const { user } = useSelector((state) => state.user);
    const { id } = useParams();

    const itemInWishlist = wishlistItems.some((i) => i.product === id);

    const addToWishlistHandler = () => {

        if (itemInWishlist) {
            dispatch(removeFromWishlist(id));
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
            dispatch(addToWishlist(id));
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

    const options = {
        size: "small",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    }


    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);

    const [comment, setComment] = useState("");

    const increseQuantity = () => {
        if (product.stock <= quantity)
            return;

        const qty = quantity + 1;
        setQuantity(qty);
    }
    const decreseQuantity = () => {
        if (1 >= quantity)
            return;
        const qty = quantity - 1;
        setQuantity(qty);
    }

    const addTocarthandler = () => {
        dispatch(addItemsToCart(id, quantity));
        toast.success('Item Added to cart',  {
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

    const reviewSubmitHandler = () => {
        if (rating === 0 || !comment.trim()) {
            toast.error("Please enter a review comment", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }
      

        const myForm = new FormData();
        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);

        dispatch(newReview(myForm));
        setRating(0);
        setComment("")


    }

    useEffect(() => {
        if (error) {
            toast.error(error , {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            dispatch(clearErrors());
        }
        if (reviewError) {
            toast.error(reviewError , {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            dispatch(clearErrors());
        }
        if (success) {
            toast.success("Review  Submitted successfully" , {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            dispatch({ type: NEW_REVIEW_RESET });
        }
        dispatch(getProductDetails(id));
    }, [dispatch, id, error, reviewError, success]);

    return (
        <>
            {loading ? (<Loader />) :
                (<>
                    <MetaData tittle={product.name} />
                    <section className="inner-section mt-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="details-gallery ">
                                        <div className="details-label-group">

                                            {/* <label className="details-label new">new</label> */}
                                            <label className="details-label off">{getDiscount(product.price, product.mrpPrice)}%</label>


                                        </div>
                                        {/* <button class="product-details-wish  wish"><i class="fas fa-heart"></i></button> */}

                                        <button className={`${itemInWishlist ? "product-details-wish active" : "product-details-wish"}`} onClick={addToWishlistHandler} title="Add Your Wishlist"><i className="icofont-heart"></i></button>

                                        <ProSlider product={product} />


                                        {/* <ul className="details-preview">
                                            {product.images && product.images.map((item, i) => (
                                                <li key="{item}" >
                                                    <img src={item.url} alt="product" />
                                                </li>
                                            ))}


                                        </ul> */}
                                        {/* <ul className="details-thumb">
                                            {product.images && product.images.map((item, i) => (
                                                <li key="{item}" >
                                                    <img src={item.url} alt="product" width="50" />
                                                </li>
                                            ))}
                                        </ul> */}
                                    </div>
                                </div>
                                <div className="col-lg-6">

                                    <div className="details-content">
                                        <h3 className="details-name">{product.name}</h3>
                                        <div className="details-meta">  
                                            <p>SKU:<span>1234567</span></p>
                                            {/* <p>BRAND:<Link to="/">{product.brand.brandName}</Link></p> */}
                                        </div>
                                        <div className="details-rating">
                                            <Rating {...options} />
                                            <span to="/">({product.numOfReviews} Reviews)</span></div>
                                        <h3 className="details-price"><del>₹ {product.mrpPrice?.toLocaleString()}</del><span>₹ {product.price?.toLocaleString()}</span>  <small className="fs-6 ms-3 off text-muted">{getDiscount(product.price, product.mrpPrice)}% off</small></h3>

                                        <p className="text-muted">Status : <b className={product.stock < 1 ? 'text-danger' : 'text-success'}>{product.stock < 1 ? 'Out Of Stock' : 'In Stock'}</b></p>

                                        <p className="text-muted mt-2">Delivery : <b className="text-dark fw-normal">Delivery by {getDeliveryDate()}</b></p>
                                        <p className="details-desc mt-2" >
                                            <span dangerouslySetInnerHTML={{ __html: (product.description) }}></span></p>



                                        <div className="details-add-group row">

                                            <div className="product-action d-flex col-6">

                                                <button className="action-minus" title="Quantity Minus" onClick={decreseQuantity}><i className="icofont-minus"></i></button>

                                                <input className="action-input" readOnly title="Quantity Number" type="text" name="quantity" value={quantity} />

                                                <button className="action-plus" title="Quantity Plus" onClick={increseQuantity}><i className="icofont-plus"></i></button></div>

                                            <div className='col-6'>
                                                <button disabled={product.stock < 1 ? true : false} onClick={addTocarthandler} className="product-add" title="Add to Cart"><i className="fas fa-shopping-basket"></i><span>add to cart</span></button>
                                            </div>
                                        </div>
                                        {/* <div className="details-action-group  ">
                                            <div className="row">
                                                <div className='col-6'>
                                                   
                                                </div>
                                                <div className='col-6'>
                                                    <Link className="details-compare " to="/" title="Compare This Item"><i className="fas fa-random"></i><span>Compare This</span></Link></div>
                                            </div>
                                        </div> */}
                                        <div className="details-list-group mt-3">
                                            <label className="details-list-title">tags:</label>
                                            <ul className="details-tag-list">
                                                <li><Link to="/">organic</Link></li>
                                                <li><Link to="/">fruits</Link></li>
                                                <li><Link to="/">chilis</Link></li>
                                            </ul>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="inner-section">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <ul className="nav nav-tabs">
                                        <li><Link to="#tab-desc" className="tab-link active" data-bs-toggle="tab">descriptions</Link></li>
                                        <li><Link to="#tab-spec" className="tab-link" data-bs-toggle="tab">Specifications</Link></li>
                                        <li><Link to="#tab-reve" className="tab-link" data-bs-toggle="tab">reviews ({product.numOfReviews})</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="tab-pane fade show active" id="tab-desc">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="product-details-frame">
                                            <div className="tab-descrip">
                                                <p><span dangerouslySetInnerHTML={{ __html: (product.description) }}></span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="tab-spec">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="product-details-frame">
                                        <p><span dangerouslySetInnerHTML={{ __html: (product.specification) }}></span></p>
                                            {/* <table className="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">Product code</th>
                                                        <td>SKU: 101783</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Weight</th>
                                                        <td>1kg, 2kg</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Styles</th>
                                                        <td>@Girly</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Properties</th>
                                                        <td>Short Dress</td>
                                                    </tr>
                                                </tbody>
                                            </table> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="tab-reve">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="product-details-frame">
                                            {product.reviews && product.reviews[0] ? (

                                                <ul className="review-list">
                                                    {product.reviews && product.reviews.map((reviw) =>
                                                        <ReviewCard reviw={reviw} key="{reviw}" />

                                                    )}

                                                </ul>

                                            ) : (
                                                <p> No Reviews for this product. </p>
                                            )}

                                        </div>
                                        {user &&
                                            <div className="product-details-frame">
                                                <h3 className="frame-title">add your review</h3>
                                                <div className="review-form">
                                                    <div className="row">
                                                        <div className="col-lg-12 mb-3 text-center">

                                                            <Rating
                                                                value={rating}
                                                                name="rating"
                                                                size="large"
                                                                onChange={(e) =>
                                                                    setRating(e.target.value)
                                                                } />


                                                        </div>
                                                        <div className="col-lg-12">
                                                            <div className="form-group"><textarea className="form-control" placeholder="Describe" value={comment} required onChange={(e) => setComment(e.target.value)}></textarea></div>
                                                        </div>

                                                        <div className="col-lg-6 offset-md-3"><button onClick={reviewSubmitHandler} className="btn btn-inline"><i className="icofont-water-drop"></i><span>drop your review</span></button></div>
                                                    </div>
                                                </div>
                                            </div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <HomeProductSlider title={"Suggested for You"} />
                </>
                )}
        </>
    )
}

export default ProductDetails