import React, { useEffect, useState } from 'react'
import ProductCard from '../Home/Home/ProductCard';
import MetaData from '../component/MetaData.js';
import { getProduct, clearErrors } from "../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../component/Loading";
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
//import ReactStars from "react-rating-stars-component";
import Slider from "@material-ui/core/Slider";

const categories = [
    "TV",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
];

const Products = () => {
    const [currentPage, SetCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);
    const { loading, error, products, productsCount, resultPerPage, filteredProductsCount } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const { keyword } = useParams();

    const SetCurrentPageNo = (e) => {
        SetCurrentPage(e);
    }

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };


    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct(keyword, currentPage, price, category, ratings));
    }, [dispatch, error, keyword, currentPage, price, category, ratings]);

    let count = filteredProductsCount;
    return (
        <>

            <MetaData tittle="Ecommerce | Products " />
            <section className="inner-section shop-part mt-3">
                <div className="container-fluid">
                    <div className="row content-reverse">
                        <div className="col-lg-3">
                            <div className="bg-white box-shadow-sm rounded">
                                <div className="shop-widget">
                                    <h6 className="shop-widget-title">Filter by Price</h6>

                                    <Slider
                                        value={price}
                                        onChange={priceHandler}
                                        valueLabelDisplay="auto"
                                        aria-labelledby="range-slider"
                                        min={0}
                                        max={25000}
                                    />

                                    <div className="shop-widget-group">
                                        <span className="btn-sm text-muted bg-light w-50 me-2">₹ {price[0].toLocaleString()}</span> to
                                        <span className="btn-sm text-muted bg-light w-50 ms-2"> ₹ {price[1].toLocaleString()} </span>
                                    </div>

                                </div>
                                <div className="shop-widget">
                                    <h6 className="shop-widget-title">Filter by Rating</h6>
                                    <form>
                                        <ul className="shop-widget-list">
                                            <Slider
                                                value={ratings}
                                                onChange={(e, newRating) => {
                                                    setRatings(newRating);
                                                }}
                                                aria-labelledby="continuous-slider"
                                                valueLabelDisplay="auto"
                                                min={0}
                                                max={5}
                                            />


                                            {/* {[5, 4, 3, 2, 1].map((star) => (
                                                    <li className="category-link" key={star}
                                                         >
                                                        <div className="shop-widget-content">
                                                            <ReactStars
                                                        edit={false}
                                                    count={star}
                                                    onChange={() => setRatings(ratings)}
                                                    size={24}
                                                    isHalf={true}
                                                    emptyIcon={<i className="far fa-star"></i>}
                                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                    fullIcon={<i className="fa fa-star"></i>}
                                                    activeColor="#ffd700"
                                                />
                                                            <label>{star}</label>
                                                        </div>
                                                        <span className="shop-widget-number">(3)</span>

                                                    </li>
                                                ))} */}



                                        </ul>
                                    </form>
                                </div>

                                {/* <div className="shop-widget">
                                    <h6 className="shop-widget-title">Filter by Brand</h6>
                                    <form>
                                        <ul className="shop-widget-list shop-widget-scroll">
                                            <li>
                                                <div className="shop-widget-content"><input type="checkbox" id="brand1" /><label
                                                    htmlFor="brand1">mari gold</label></div><span
                                                        className="shop-widget-number">(13)</span>
                                            </li>

                                        </ul>
                                    </form>
                                </div> */}
                                <div className="accordion" id="accordionExample">
                                    <div className="accordion-item">
                                        <h2 class="accordion-header" id="headingOne">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                                data-bs-target="#collapseOne" aria-expanded="true"
                                                aria-controls="collapseOne">
                                                Filter by Category
                                            </button>
                                        </h2>
                                        <div id="collapseOne" className="accordion-collapse collapse show"
                                            aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                            <ul className="shop-widget-list shop-widget-scroll">
                                            {categories.map((category, i) => (
                                                <li className="category-link"
                                                    key={category}
                                                    onClick={() => setCategory(category)}
                                                >
                                                    <div className="shop-widget-content">
                                                        <input type="checkbox" id={`cate ${i}`} />
                                                        <label htmlFor={`cate ${i}`}>{category}</label></div>
                                                    <span className="shop-widget-number">(13)</span>

                                                </li>
                                            ))}



                                        </ul>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                               
                            </div>
                        </div>
                        {loading ? (<Loader />) :
                            (<>
                                <div className="col-lg-9">
                                    <div className="bg-white box-shadow-sm rounded p-3">
                                       
                                            {!loading && products?.length === 0 && (
                                                <div className="text-center p-5">
                                                   
                                                   <img className="img-fluid w-50" src={require('../assets/images/error.png')} alt="error" />
                                                    
                                                    <h3 className="mt-3">Sorry, No Results Found!</h3>
                                                    <p className="text-xl text-center text-primary-grey">Please check the spelling or try searching for something else</p>
                                                </div>
                                            )}
                                       

                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="top-filter">
                                                    <div className="filter-show"><label className="filter-label">Show :</label>
                                                        <select
                                                            className="form-select filter-select" defaultValue={"1"}>
                                                            <option value="1">12</option>
                                                            <option value="2">24</option>
                                                            <option value="3">36</option>
                                                        </select></div>
                                                    <div className="filter-short"><label className="filter-label">Short by :</label>
                                                        <select className="form-select filter-select" defaultValue={"default"}>
                                                            <option value="default">default</option>
                                                            <option value="3">trending</option>
                                                            <option value="1">featured</option>
                                                            <option value="2">recommend</option>
                                                        </select></div>
                                                    <div className="filter-action">
                                                        <Link to="/" title="Three Column"><i className="fas fa-th"></i></Link>
                                                        <Link to="/" title="Two Column"><i className="fas fa-th-large"></i>
                                                        </Link>
                                                        <Link to="/" title="One Column"><i className="fas fa-th-list"></i>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4">

                                            {products && products.map(product => (
                                                <ProductCard key={product._id} product={product} />

                                            ))}

                                        </div>


                                        {resultPerPage < count && (
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="bottom-paginate">
                                                        <p className="page-info">Showing {resultPerPage} of {productsCount} Results</p>
                                                        <Pagination
                                                            activePage={currentPage}
                                                            itemsCountPerPage={resultPerPage}
                                                            totalItemsCount={productsCount}
                                                            onChange={SetCurrentPageNo}
                                                            nextPageText=" >"
                                                            prevPageText="< "
                                                            breakLabel={"..."}
                                                            itemClass="page-item"
                                                            linkClass='page-link'
                                                            activeClass='actives'
                                                            activeLinkClass='active'

                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    </div>
                            </>)
                        }
                    </div>
                </div>
            </section>


        </>
    )
}

export default Products