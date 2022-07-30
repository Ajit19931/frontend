import React, { useEffect, useState } from 'react'
import MetaData from '../component/MetaData.js';
import { clearErrors, forgotPassword } from "../actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Loader from "../component/Loading";


const ForgotPassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, message, loading, isAuthenticated } = useSelector((state) => state.forgotPassword);
    const [email, setEmail] = useState("");

    useEffect(() => {


        if (isAuthenticated === true) {

            navigate("/");
        }

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (message) {
            toast.success(message);

        }

    }, [dispatch, error, message, isAuthenticated, navigate]);


    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("email", email);
        dispatch(forgotPassword(myForm));

    };
    return (
        <>
            {loading ? (<Loader />) :
                (<>
                    <MetaData title={"forgot Password"} />
                    <section className="user-form-part">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
                                    <div className="user-form-logo">
                                        <Link to="index.html"><img src={require('../assets/images/logo.png')} alt="logo" /></Link>
                                    </div>
                                    <div className="user-form-card">
                                        <div className="user-form-title">
                                            <h2>Worried?</h2>
                                            <p>No Problem! Just Follow The Simple Way</p>
                                        </div>
                                        <div className="user-form-group">

                                            <form className="user-form" onSubmit={resetPasswordSubmit}>
                                                <div className="form-group">
                                                    <input type="email" className="form-control" placeholder="Enter your email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                                </div>

                                                <div className="form-button">
                                                    <button type="submit">get reset link</button>

                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="user-form-remind">
                                        <p>Go Back To<Link to="/login">Login Here</Link></p>
                                    </div>
                                    <div className="user-form-footer">
                                        <p>Greeny | &COPY; Copyright by <Link to="/">Ajit</Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </>)}
        </>
    )
}

export default ForgotPassword