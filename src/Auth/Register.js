
import React, { useEffect, useState } from 'react'
import MetaData from '../component/MetaData.js';
import { clearErrors, register } from "../actions/userAction";
import { useSelector, useDispatch } from "react-redux";
//import Loader from "../component/Loading";
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    debugger;
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { name, email, password } = user;

    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, loading, isAuthenticated } = useSelector(
        (state) => state.user
    );
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (isAuthenticated) {
            navigate("/login");
        }
    }, [dispatch, error, isAuthenticated, navigate]);
    const registerSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        dispatch(register(myForm));
        toast.success(' Register Successfully created !');
    };

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };
    return (
        <>
            {/* {loading ? (<Loader />) :
            (<> */}
            <MetaData tittle="Ecommerce | Register " />
            <section className="user-form-part">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-10 col-md-12 col-lg-12 col-xl-10">
                            <div className="user-form-logo">
                                <Link to="/"><img src={require('../assets/images/logo.png')} alt="logo" /></Link>
                            </div>
                            <div className="user-form-card">
                                <div className="user-form-title">
                                    <h2>Join Now!</h2>
                                    <p>Setup A New Account In A Minute</p>
                                </div>
                                <div className="user-form-group">
                                    <ul className="user-form-social">
                                        <li><Link to="/" className="facebook"><i className="fab fa-facebook-f"></i>login with facebook</Link></li>
                                        <li><Link to="/" className="twitter"><i className="fab fa-twitter"></i>login with twitter</Link></li>
                                        <li><Link to="/" className="google"><i className="fab fa-google"></i>login with google</Link></li>
                                        <li><Link to="/" className="instagram"><i className="fab fa-instagram"></i>login with instagram</Link></li>
                                    </ul>
                                    <div className="user-form-divider">
                                        <p>or</p>
                                    </div>
                                    <form className="user-form" encType="multipart/form-data"
                                        onSubmit={registerSubmit}>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Enter your Name" name="name"
                                                value={name}
                                                onChange={registerDataChange} />
                                        </div>
                                        <div className="form-group">
                                            <input type="email" className="form-control" placeholder="Enter your email" required
                                                name="email"
                                                value={email}
                                                onChange={registerDataChange} />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control" placeholder="Enter your password"
                                                name="password"
                                                value={password}
                                                onChange={registerDataChange} />
                                        </div>
                                        <div className="form-group row justify-content-center align-items-center">
                                            <img src={avatarPreview} alt="Avatar Preview" width={75} height={75} className="rounded-circle col-md-3" />

                                            <input type="file" className="form-control w-75 h-50 col-md-9 " name="avatar" accept="image/*" onChange={registerDataChange} />
                                        </div>

                                        <div className="form-check mb-3">
                                            <input className="form-check-input" type="checkbox" value="" id="check" />
                                            <label className="form-check-label" htmlFor="check">Accept all the <Link to="#">Terms &amp; Conditions</Link></label></div>
                                        <div className="form-button">
                                            <button id="register_button" type="submit" disabled={loading ? true : false}>register</button>

                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="user-form-remind">
                                <p>Already Have An Account?<Link to="/login">Login here</Link></p>
                            </div>
                            <div className="user-form-footer">
                                <p>Greeny | &COPY; Copyright by <Link to="/">Ajit</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* </>)} */}
        </>
    )
}

export default Register