import React, {useState} from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {

  const [visible, setVisible] = useState(false)
  
  const toggleVisible = () => {
    const scrolled = window.scrollY === 0;
    if (scrolled > 300){
      setVisible(true)
    } 
    else if (scrolled <= 300){
      setVisible(false)
    }
  };
  
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };
  
  window.addEventListener('scroll', toggleVisible);
  
  return (

    
    <>
      <section className="news-part" >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-5 col-lg-6 col-xl-7">
              <div className="news-text">
                <h2>Get 20% Discount for Subscriber</h2>
                <p>Lorem ipsum dolor consectetur adipisicing accusantium</p>
              </div>
            </div>
            <div className="col-md-7 col-lg-6 col-xl-5">
              <form className="news-form"><input type="text" placeholder="Enter Your Email Address" /><button><span><i className="icofont-ui-email"></i>Subscribe</span></button></form>
            </div>
          </div>
        </div>
      </section>
      <section className="intro-part">
        <div className="container">
          <div className="row intro-content">
            <div className="col-sm-6 col-lg-3">
              <div className="intro-wrap">
                <div className="intro-icon"><i className="fas fa-truck"></i></div>
                <div className="intro-content">
                  <h5>free home delivery</h5>
                  <p>Lorem ipsum dolor sit amet adipisicing elit nobis.</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="intro-wrap">
                <div className="intro-icon"><i className="fas fa-sync-alt"></i></div>
                <div className="intro-content">
                  <h5>instant return policy</h5>
                  <p>Lorem ipsum dolor sit amet adipisicing elit nobis.</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="intro-wrap">
                <div className="intro-icon"><i className="fas fa-headset"></i></div>
                <div className="intro-content">
                  <h5>quick support system</h5>
                  <p>Lorem ipsum dolor sit amet adipisicing elit nobis.</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="intro-wrap">
                <div className="intro-icon"><i className="fas fa-lock"></i></div>
                <div className="intro-content">
                  <h5>secure payment way</h5>
                  <p>Lorem ipsum dolor sit amet adipisicing elit nobis.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="footer-part">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-xl-3">
              <div className="footer-widget">
                <Link className="footer-logo" to="/"><img src={require('../assets/images/logo.png')} alt="logo" /></Link>
                <p className="footer-desc">Adipisci asperiores ipsum ipsa repellat consequatur repudiandae quisquam assumenda dolor perspiciatis sit ipsum dolor amet.</p>
                <ul className="footer-social">
                  <li><Link className="icofont-facebook" to="/"></Link></li>
                  <li><Link className="icofont-twitter" to="/"></Link></li>
                  <li><Link className="icofont-linkedin" to="/"></Link></li>
                  <li><Link className="icofont-instagram" to="/"></Link></li>
                  <li><Link className="icofont-pinterest" to="/"></Link></li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-xl-3">
              <div className="footer-widget contact">
                <h3 className="footer-title">contact us</h3>
                <ul className="footer-contact">
                  <li>
                    <i className="icofont-ui-email"></i>
                    <p><span>support@example.com</span><span>carrer@example.com</span></p>
                  </li>
                  <li>
                    <i className="icofont-ui-touch-phone"></i>
                    <p><span>+120 279 532 13</span><span>+120 279 532 14</span></p>
                  </li>
                  <li>
                    <i className="icofont-location-pin"></i>
                    <p>1Hd- 50, 010 Avenue, NY 90001 United States</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-xl-3">
              <div className="footer-widget">
                <h3 className="footer-title">quick Links</h3>
                <div className="footer-links">
                  <ul>
                    <li><Link to="/">My Account</Link></li>
                    <li><Link to="/">Order History</Link></li>
                    <li><Link to="/">Order Tracking</Link></li>
                    <li><Link to="/">Best Seller</Link></li>
                    <li><Link to="/">New Arrivals</Link></li>
                  </ul>
                  <ul>
                    <li><Link to="/">Location</Link></li>
                    <li><Link to="/">Affiliates</Link></li>
                    <li><Link to="/">Contact</Link></li>
                    <li><Link to="/">Carrer</Link></li>
                    <li><Link to="/">Faq</Link></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xl-3">
              <div className="footer-widget">
                <h3 className="footer-title">Download App</h3>
                <p className="footer-desc">Lorem ipsum dolor sit amet tenetur dignissimos ipsum eligendi autem obcaecati minus ducimus totam reprehenderit exercitationem!</p>
                <div className="footer-app">
                  <Link to="/"><img src={require('../assets/images/google-store.png')} alt="google" /></Link>
                  <Link to="/"><img src={require('../assets/images/app-store.png')} alt="app" /></Link></div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="footer-bottom">
                <p className="footer-copytext">&copy; All Copyrights Reserved by <Link to="/">Ajit  Gupta</Link></p>
                <div className="footer-card">
                  <Link to="/"><img src={require('../assets/images/payment/jpg/01.jpg')} alt="payment" /></Link>
                  <Link to="/"><img src={require('../assets/images/payment/jpg/02.jpg')} alt="payment" /></Link>
                  <Link to="/"><img src={require('../assets/images/payment/jpg/03.jpg')} alt="payment" /></Link>
                  <Link to="/"><img src={require('../assets/images/payment/jpg/04.jpg')} alt="payment" /></Link></div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <Link to="/" className="backtop fas fa-arrow-up" onClick={scrollToTop} 
     style={{display: visible ? 'inline' : 'none'}} ></Link>
    </>
  )
}

export default Footer