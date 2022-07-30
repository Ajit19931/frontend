import React from 'react';
import { Link } from 'react-router-dom';


const MobNavbar = () => {
    return (
        <>
            <div className="category-sidebar">
                <div className="category-header">
                    <h4 className="category-title"><i className="fas fa-align-left"></i><span>categories</span></h4>
                    <button className="category-close"><i className="icofont-close"></i></button>
                </div>
                <ul className="category-list">
                    <li className="category-item">
                        <Link className="category-link dropdown-link" to="/"><i className="flaticon-vegetable"></i><span>vegetables</span></Link>
                        <ul className="dropdown-list">
                            <li><Link to="/">asparagus</Link></li>
                            <li><Link to="/">broccoli</Link></li>
                            <li><Link to="/">carrot</Link></li>
                        </ul>
                    </li>
                    <li className="category-item">
                        <Link className="category-link dropdown-link" to="/"><i className="flaticon-groceries"></i><span>groceries</span></Link>
                        <ul className="dropdown-list">
                            <li><Link to="/">Grains & Bread</Link></li>
                            <li><Link to="/">Dairy & Eggs</Link></li>
                            <li><Link to="/">Oil & Fat</Link></li>
                        </ul>
                    </li>
                    <li className="category-item">
                        <Link className="category-link dropdown-link" to="/"><i className="flaticon-fruit"></i><span>fruits</span></Link>
                        <ul className="dropdown-list">
                            <li><Link to="/">Apple</Link></li>
                            <li><Link to="/">Orange</Link></li>
                            <li><Link to="/">Strawberry</Link></li>
                        </ul>
                    </li>
                    <li className="category-item">
                        <Link className="category-link dropdown-link" to="/"><i className="flaticon-dairy-products"></i><span>dairy farm</span></Link>
                        <ul className="dropdown-list">
                            <li><Link to="/">Egg</Link></li>
                            <li><Link to="/">milk</Link></li>
                            <li><Link to="/">butter</Link></li>
                        </ul>
                    </li>
                    <li className="category-item">
                        <Link className="category-link dropdown-link" to="/"><i className="flaticon-crab"></i><span>sea foods</span></Link>
                        <ul className="dropdown-list">
                            <li><Link to="/">Lobster</Link></li>
                            <li><Link to="/">Octopus</Link></li>
                            <li><Link to="/">Shrimp</Link></li>
                        </ul>
                    </li>
                    <li className="category-item">
                        <Link className="category-link dropdown-link" to="/"><i className="flaticon-salad"></i><span>diet foods</span></Link>
                        <ul className="dropdown-list">
                            <li><Link to="/">Salmon</Link></li>
                            <li><Link to="/">Potatoes</Link></li>
                            <li><Link to="/">Greens</Link></li>
                        </ul>
                    </li>
                    <li className="category-item">
                        <Link className="category-link dropdown-link" to="/"><i className="flaticon-dried-fruit"></i><span>dry foods</span></Link>
                        <ul className="dropdown-list">
                            <li><Link to="/">noodles</Link></li>
                            <li><Link to="/">Powdered milk</Link></li>
                            <li><Link to="/">nut & yeast</Link></li>
                        </ul>
                    </li>
                    <li className="category-item">
                        <Link className="category-link dropdown-link" to="/"><i className="flaticon-fast-food"></i><span>fast foods</span></Link>
                        <ul className="dropdown-list">
                            <li><Link to="/">mango</Link></li>
                            <li><Link to="/">plumsor</Link></li>
                            <li><Link to="/">raisins</Link></li>
                        </ul>
                    </li>
                    <li className="category-item">
                        <Link className="category-link dropdown-link" to="/"><i className="flaticon-cheers"></i><span>drinks</span></Link>
                        <ul className="dropdown-list">
                            <li><Link to="/">Wine</Link></li>
                            <li><Link to="/">Juice</Link></li>
                            <li><Link to="/">Water</Link></li>
                        </ul>
                    </li>
                    <li className="category-item">
                        <Link className="category-link dropdown-link" to="/"><i className="flaticon-beverage"></i><span>coffee</span></Link>
                        <ul className="dropdown-list">
                            <li><Link to="/">Cappuchino</Link></li>
                            <li><Link to="/">Espresso</Link></li>
                            <li><Link to="/">Latte</Link></li>
                        </ul>
                    </li>
                    <li className="category-item">
                        <Link className="category-link dropdown-link" to="/"><i className="flaticon-barbecue"></i><span>meats</span></Link>
                        <ul className="dropdown-list">
                            <li><Link to="/">Meatball</Link></li>
                            <li><Link to="/">Sausage</Link></li>
                            <li><Link to="/">Poultry</Link></li>
                        </ul>
                    </li>
                    <li className="category-item">
                        <Link className="category-link dropdown-link" to="/"><i className="flaticon-fish"></i><span>fishes</span></Link>
                        <ul className="dropdown-list">
                            <li><Link to="/">Agujjim</Link></li>
                            <li><Link to="/">saltfish</Link></li>
                            <li><Link to="/">pazza</Link></li>
                        </ul>
                    </li>
                </ul>
                <div className="category-footer">
                    <p>All Rights Reserved by <Link to="/">Mironcoder</Link></p>
                </div>
            </div>
            
            <div className="nav-sidebar">
                <div className="nav-header"><Link to="/"><img src={require('../assets/images/user.png')} alt="logo" /></Link><button className="nav-close"><i className="icofont-close"></i></button></div>
                <div className="nav-content">
                    <div className="nav-btn"><Link to="login.html" className="btn btn-inline"><i className="fa fa-unlock-alt"></i><span>join here</span></Link></div>
                    <div className="nav-select-group">
                        <div className="nav-select">
                            <i className="icofont-world"></i>
                            <select className="select" defaultValue={'english'}>
                                <option value="english" >English</option>
                                <option value="bangali">Bangali</option>
                                <option value="arabic">Arabic</option>
                            </select>
                        </div>
                        <div className="nav-select">
                            <i className="icofont-money"></i>
                            <select className="select" defaultValue={'english'}>
                                <option value="english" >Doller</option>
                                <option value="bangali">Pound</option>
                                <option value="arabic">Taka</option>
                            </select>
                        </div>
                    </div>
                    <ul className="nav-list">
                        <li>
                            <Link className="nav-link dropdown-link" to="/"><i className="icofont-home"></i>Home</Link>
                            <ul className="dropdown-list">
                                <li><Link to="home-grid.html">Home grid</Link></li>
                                <li><Link to="index.html">Home index</Link></li>
                                <li><Link to="home-classNameic.html">Home classNameic</Link></li>
                                <li><Link to="home-standard.html">Home standard</Link></li>
                                <li><Link to="home-category.html">Home category</Link></li>
                            </ul>
                        </li>
                        <li>
                            <Link className="nav-link dropdown-link" to="/"><i className="icofont-food-cart"></i>shop</Link>
                            <ul className="dropdown-list">
                                <li><Link to="shop-5column.html">shop 5 column</Link></li>
                                <li><Link to="shop-4column.html">shop 4 column</Link></li>
                                <li><Link to="shop-3column.html">shop 3 column</Link></li>
                                <li><Link to="shop-2column.html">shop 2 column</Link></li>
                                <li><Link to="shop-1column.html">shop 1 column</Link></li>
                            </ul>
                        </li>
                        <li>
                            <Link className="nav-link dropdown-link" to="/"><i className="icofont-page"></i>product</Link>
                            <ul className="dropdown-list">
                                <li><Link to="product-tab.html">product tab</Link></li>
                                <li><Link to="product-grid.html">product grid</Link></li>
                                <li><Link to="product-video.html">product video</Link></li>
                                <li><Link to="product-simple.html">product simple</Link></li>
                            </ul>
                        </li>
                        <li>
                            <Link className="nav-link dropdown-link" to="/"><i className="icofont-bag-alt"></i>my account</Link>
                            <ul className="dropdown-list">
                                <li><Link to="profile.html">profile</Link></li>
                                <li><Link to="wallet.html">wallet</Link></li>
                                <li><Link to="wishlist.html">wishlist</Link></li>
                                <li><Link to="compare.html">compare</Link></li>
                                <li><Link to="checkout.html">checkout</Link></li>
                                <li><Link to="orderlist.html">order history</Link></li>
                                <li><Link to="invoice.html">order invoice</Link></li>
                                <li><Link to="email-template.html">email template</Link></li>
                            </ul>
                        </li>
                        <li>
                            <Link className="nav-link dropdown-link" to="/"><i className="icofont-lock"></i>authentication</Link>
                            <ul className="dropdown-list">
                                <li><Link to="login.html">login</Link></li>
                                <li><Link to="register.html">register</Link></li>
                                <li><Link to="reset-password.html">reset password</Link></li>
                                <li><Link to="change-password.html">change password</Link></li>
                            </ul>
                        </li>
                        <li>
                            <Link className="nav-link dropdown-link" to="/"><i className="icofont-book-alt"></i>blogs</Link>
                            <ul className="dropdown-list">
                                <li><Link to="blog-grid.html">blog grid</Link></li>
                                <li><Link to="blog-standard.html">blog standard</Link></li>
                                <li><Link to="blog-details.html">blog details</Link></li>
                                <li><Link to="blog-author.html">blog author</Link></li>
                            </ul>
                        </li>
                        <li><Link className="nav-link" to="offer.html"><i className="icofont-sale-discount"></i>offers</Link></li>
                        <li><Link className="nav-link" to="about.html"><i className="icofont-info-circle"></i>about us</Link></li>
                        <li><Link className="nav-link" to="faq.html"><i className="icofont-support-faq"></i>need help</Link></li>
                        <li><Link className="nav-link" to="contact.html"><i className="icofont-contacts"></i>contact us</Link></li>
                        <li><Link className="nav-link" to="privacy.html"><i className="icofont-warning"></i>privacy policy</Link></li>
                        <li><Link className="nav-link" to="coming-soon.html"><i className="icofont-options"></i>coming soon</Link></li>
                        <li><Link className="nav-link" to="error.html"><i className="icofont-ui-block"></i>404 error</Link></li>
                        <li><Link className="nav-link" to="login.html"><i className="icofont-logout"></i>logout</Link></li>
                    </ul>
                    <div className="nav-info-group">
                        <div className="nav-info">
                            <i className="icofont-ui-touch-phone"></i>
                            <p><small>call us</small><span>(+880) 183 8288 389</span></p>
                        </div>
                        <div className="nav-info">
                            <i className="icofont-ui-email"></i>
                            <p><small>email us</small><span>support@example.com</span></p>
                        </div>
                    </div>
                    <div className="nav-footer">
                        <p>All Rights Reserved by <Link to="/">Mironcoder</Link></p>
                    </div>
                </div>
            </div>
           
        </>
    )
}

export default MobNavbar