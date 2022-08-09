
import "../assets/css/user-auth.css"
import React, { useEffect, useState } from 'react'
import MetaData from '../component/MetaData.js';
import { clearErrors, login } from "../actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../component/Loading";
import { toast } from 'react-toastify';
import { Link, useNavigate ,useLocation } from 'react-router-dom';



const Login = () => {
	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { error, loading, isAuthenticated  } = useSelector((state) => state.user);
	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(login(loginEmail, loginPassword));

		
		// toast.success(' login Successfully  !');

		
	}
	let location = useLocation();
	const redirect = location.search ? location.search.split("=")[1] : "/";

	useEffect(() => {
		if (error) {
			toast.error(error ,{
				position: "bottom-center",
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
				}) ;
			dispatch(clearErrors());
		}
		// if(user.role === 'admin'){
		// 	navigate("/admin/dashboard");
		// }
		if (isAuthenticated) {
			navigate(redirect);
		}

		

	}, [dispatch, error, isAuthenticated, navigate ,redirect ]);


	return (
		<>
			{loading ? (<Loader />) :
				(<>
					<MetaData tittle="Ecommerce | Login  " />
					<section className="user-form-part">
						<div className="container">
							<div className="row justify-content-center ">
								<div className="col-12 col-sm-6 col-md-12 col-lg-12 col-xl-5">
									<div className="user-form-logo">
										<Link to="/"><img src={require('../assets/images/logo.png')} alt="logo" /></Link>
									</div>
									<div className="user-form-card">
										<div className="user-form-title">
											<h2>welcome!</h2>
											<p>Use your credentials to access</p>
										</div>
										<div className="user-form-group">
											{/* <ul className="user-form-social">
												<li><Link to="/" className="facebook"><i className="fab fa-facebook-f"></i>login with facebook</Link></li>
												<li><Link to="/" className="twitter"><i className="fab fa-twitter"></i>login with twitter</Link></li>
												<li><Link to="/" className="google"><i className="fab fa-google"></i>login with google</Link></li>
												<li><Link to="/" className="instagram"><i className="fab fa-instagram"></i>login with instagram</Link></li>
											</ul>
											<div className="user-form-divider">
												<p>or</p>
											</div> */}
											<form className="user-form" onSubmit={submitHandler}>
												<div className="form-group">
													<input type="email" className="form-control" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="Enter your email" />
												</div>
												<div className="form-group">
													<input type="password" className="form-control" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="Enter your password" />
												</div>
												<div className="form-check mb-3">
													<input className="form-check-input" type="checkbox" value="" id="check" />
													<label className="form-check-label" htmlFor="check">Remember Me</label>
												</div>
												<div className="form-button">
													<button type="submit">login</button>
													<p>Forgot your password?<Link to="/forgot">reset here</Link></p>
												</div>
											</form>
										</div>
									</div>
									<div className="user-form-remind mb-5">
										<p>Don't have any account?<Link to="/register">register here</Link></p>
									</div>
									{/* <div className="user-form-footer">
										<p>Greeny | &COPY; Copyright by <Link to="/">Ajit</Link></p>
									</div> */}
								</div>
							</div>
						</div>
					</section>

				</>)}

		</>
	)
}

export default Login