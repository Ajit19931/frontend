import React from 'react';
import { Link } from 'react-router-dom';
import MobNavbar from './MobNavbar';


const Navbar = () => {
  return (
   <>
    <nav className="navbar-part">
         <div className="container">
            <div className="row">
               <div className="col-lg-12">
                  <div className="navbar-content">
                     <ul className="navbar-list">
                        <li className="navbar-item dropdown">
                           <Link className="navbar-link" to="/">home</Link></li>
                        <li className="navbar-item dropdown-megamenu">
                           <Link className="navbar-link dropdown-arrow" to="/">shop</Link>
                           <div className="megamenu">
                              <div className="container">
                                 <div className="row">
                                    <div className="col-lg-3">
                                       <div className="megamenu-wrap">
                                          <h5 className="megamenu-title">shop pages</h5>
                                          <ul className="megamenu-list">
                                             <li><Link to="shop-5column.html">shop 5 column</Link></li>
                                             <li><Link to="shop-4column.html">shop 4 column</Link></li>
                                             <li><Link to="shop-3column.html">shop 3 column</Link></li>
                                             <li><Link to="shop-2column.html">shop 2 column</Link></li>
                                             <li><Link to="shop-1column.html">shop 1 column</Link></li>
                                          </ul>
                                       </div>
                                    </div>
                                    <div className="col-lg-3">
                                       <div className="megamenu-wrap">
                                          <h5 className="megamenu-title">product pages</h5>
                                          <ul className="megamenu-list">
                                             <li><Link to="product-tab.html">product single tab</Link></li>
                                             <li><Link to="product-grid.html">product single grid</Link></li>
                                             <li><Link to="product-video.html">product single video</Link></li>
                                             <li><Link to="product-simple.html">product single simple</Link></li>
                                          </ul>
                                       </div>
                                    </div>
                                    <div className="col-lg-3">
                                       <div className="megamenu-wrap">
                                          <h5 className="megamenu-title">user action</h5>
                                          <ul className="megamenu-list">
                                             <li><Link to="wishlist.html">wishlist</Link></li>
                                             <li><Link to="compare.html">compare</Link></li>
                                             <li><Link to="checkout.html">checkout</Link></li>
                                             <li><Link to="orderlist.html">order history</Link></li>
                                             <li><Link to="invoice.html">order invoice</Link></li>
                                          </ul>
                                       </div>
                                    </div>
                                    <div className="col-lg-3">
                                       <div className="megamenu-wrap">
                                          <h5 className="megamenu-title">other pages</h5>
                                          <ul className="megamenu-list">
                                             <li><Link to="all-category.html">all Category</Link></li>
                                             <li><Link to="brand-list.html">brand list</Link></li>
                                             <li><Link to="brand-single.html">brand single</Link></li>
                                          </ul>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </li>
                        <li className="navbar-item dropdown-megamenu">
                           <Link className="navbar-link dropdown-arrow" to="/">category</Link>
                           <div className="megamenu">
                              <div className="container megamenu-scroll">
                                 <div className="row row-cols-5">
                                    <div className="col">
                                       <div className="megamenu-wrap">
                                          <h5 className="megamenu-title">vegetables</h5>
                                          <ul className="megamenu-list">
                                             <li><Link to="/">carrot</Link></li>
                                             <li><Link to="/">broccoli</Link></li>
                                             <li><Link to="/">asparagus</Link></li>
                                             <li><Link to="/">cauliflower</Link></li>
                                             <li><Link to="/">eggplant</Link></li>
                                          </ul>
                                       </div>
                                    </div>
                                    <div className="col">
                                       <div className="megamenu-wrap">
                                          <h5 className="megamenu-title">fruits</h5>
                                          <ul className="megamenu-list">
                                             <li><Link to="/">Apple</Link></li>
                                             <li><Link to="/">orange</Link></li>
                                             <li><Link to="/">banana</Link></li>
                                             <li><Link to="/">strawberrie</Link></li>
                                             <li><Link to="/">watermelon</Link></li>
                                          </ul>
                                       </div>
                                    </div>
                                    <div className="col">
                                       <div className="megamenu-wrap">
                                          <h5 className="megamenu-title">dairy farms</h5>
                                          <ul className="megamenu-list">
                                             <li><Link to="/">Butter</Link></li>
                                             <li><Link to="/">Cheese</Link></li>
                                             <li><Link to="/">Milk</Link></li>
                                             <li><Link to="/">Eggs</Link></li>
                                             <li><Link to="/">cream</Link></li>
                                          </ul>
                                       </div>
                                    </div>
                                    <div className="col">
                                       <div className="megamenu-wrap">
                                          <h5 className="megamenu-title">seafoods</h5>
                                          <ul className="megamenu-list">
                                             <li><Link to="/">Lobster</Link></li>
                                             <li><Link to="/">Octopus</Link></li>
                                             <li><Link to="/">Shrimp</Link></li>
                                             <li><Link to="/">Halabos</Link></li>
                                             <li><Link to="/">Maeuntang</Link></li>
                                          </ul>
                                       </div>
                                    </div>
                                    <div className="col">
                                       <div className="megamenu-wrap">
                                          <h5 className="megamenu-title">diet foods</h5>
                                          <ul className="megamenu-list">
                                             <li><Link to="/">Salmon</Link></li>
                                             <li><Link to="/">Avocados</Link></li>
                                             <li><Link to="/">Leafy Greens</Link></li>
                                             <li><Link to="/">Boiled Potatoes</Link></li>
                                             <li><Link to="/">Cottage Cheese</Link></li>
                                          </ul>
                                       </div>
                                    </div>
                                    <div className="col">
                                       <div className="megamenu-wrap">
                                          <h5 className="megamenu-title">fast foods</h5>
                                          <ul className="megamenu-list">
                                             <li><Link to="/">burger</Link></li>
                                             <li><Link to="/">milkshake</Link></li>
                                             <li><Link to="/">sandwich</Link></li>
                                             <li><Link to="/">doughnut</Link></li>
                                             <li><Link to="/">pizza</Link></li>
                                          </ul>
                                       </div>
                                    </div>
                                    <div className="col">
                                       <div className="megamenu-wrap">
                                          <h5 className="megamenu-title">drinks</h5>
                                          <ul className="megamenu-list">
                                             <li><Link to="/">cocktail</Link></li>
                                             <li><Link to="/">hard soda</Link></li>
                                             <li><Link to="/">shampain</Link></li>
                                             <li><Link to="/">Wine</Link></li>
                                             <li><Link to="/">barley</Link></li>
                                          </ul>
                                       </div>
                                    </div>
                                    <div className="col">
                                       <div className="megamenu-wrap">
                                          <h5 className="megamenu-title">meats</h5>
                                          <ul className="megamenu-list">
                                             <li><Link to="/">Meatball</Link></li>
                                             <li><Link to="/">Sausage</Link></li>
                                             <li><Link to="/">Poultry</Link></li>
                                             <li><Link to="/">chicken</Link></li>
                                             <li><Link to="/">Cows</Link></li>
                                          </ul>
                                       </div>
                                    </div>
                                    <div className="col">
                                       <div className="megamenu-wrap">
                                          <h5 className="megamenu-title">fishes</h5>
                                          <ul className="megamenu-list">
                                             <li><Link to="/">scads</Link></li>
                                             <li><Link to="/">pomfret</Link></li>
                                             <li><Link to="/">groupers</Link></li>
                                             <li><Link to="/">anchovy</Link></li>
                                             <li><Link to="/">mackerel</Link></li>
                                          </ul>
                                       </div>
                                    </div>
                                    <div className="col">
                                       <div className="megamenu-wrap">
                                          <h5 className="megamenu-title">dry foods</h5>
                                          <ul className="megamenu-list">
                                             <li><Link to="/">noodles</Link></li>
                                             <li><Link to="/">Powdered milk</Link></li>
                                             <li><Link to="/">nut & yeast</Link></li>
                                             <li><Link to="/">almonds</Link></li>
                                             <li><Link to="/">pumpkin</Link></li>
                                          </ul>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </li>
                        <li className="navbar-item dropdown">
                           <Link className="navbar-link dropdown-arrow" to="/">pages</Link>
                           <ul className="dropdown-position-list">
                              <li><Link to="faq.html">faqs</Link></li>
                              <li><Link to="offer.html">offers</Link></li>
                              <li><Link to="profile.html">my profile</Link></li>
                              <li><Link to="wallet.html">my wallet</Link></li>
                              <li><Link to="about.html">about us</Link></li>
                              <li><Link to="contact.html">contact us</Link></li>
                              <li><Link to="privacy.html">privacy policy</Link></li>
                              <li><Link to="coming-soon.html">coming soon</Link></li>
                              <li><Link to="blank-page.html">blank page</Link></li>
                              <li><Link to="error.html">404 Error</Link></li>
                              <li><Link to="email-template.html">email template</Link></li>
                           </ul>
                        </li>
                        <li className="navbar-item dropdown">
                           <Link className="navbar-link dropdown-arrow" to="/">authentic</Link>
                           <ul className="dropdown-position-list">
                              <li><Link to="login.html">login</Link></li>
                              <li><Link to="register.html">register</Link></li>
                              <li><Link to="reset-password.html">reset password</Link></li>
                              <li><Link to="change-password.html">change password</Link></li>
                           </ul>
                        </li>
                        <li className="navbar-item dropdown">
                           <Link className="navbar-link dropdown-arrow" to="/">blogs</Link>
                           <ul className="dropdown-position-list">
                              <li><Link to="blog-grid.html">blog grid</Link></li>
                              <li><Link to="blog-standard.html">blog standard</Link></li>
                              <li><Link to="blog-details.html">blog details</Link></li>
                              <li><Link to="blog-author.html">blog author</Link></li>
                           </ul>
                        </li>
                     </ul>
                     <div className="navbar-info-group">
                        <div className="navbar-info">
                           <i className="icofont-ui-touch-phone"></i>
                           <p><small>call us</small><span>(+880) 183 8288 389</span></p>
                        </div>
                        <div className="navbar-info">
                           <i className="icofont-ui-email"></i>
                           <p><small>email us</small><span>support@example.com</span></p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </nav>
      <MobNavbar/>
   </>
  )
}

export default Navbar