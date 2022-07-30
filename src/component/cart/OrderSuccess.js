import { Link } from 'react-router-dom';
import "../../assets/css/error.css";

const OrderSuccess = () => {
  return (
    <>
      <section className="error-part bg-white m-md-5 m-3 border-radius">
        <div className="container">

          {/* <img className="img-fluid" src={require('../../assets/images/ch')} alt="check" /> */}

          <h1 style={{ fontSize: '7rem' }}><i class="fas fa-check-circle"></i></h1>

          <h4 className="mb-4">Thank you for your order!</h4>
          <p>You will receive an order confirmation email with details of your order and a link to track its progress.

            All necessary information about the delivery, we sent to your email</p>
          <Link to="/orders">view Orders</Link>


        </div>
      </section>
    </>
  )
}

export default OrderSuccess