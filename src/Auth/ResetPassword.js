import React, { useEffect, useState } from 'react'
import "../assets/css/user-auth.css"
import MetaData from '../component/MetaData.js';
import { clearErrors, resetPassword } from "../actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { Link , useNavigate , useParams} from 'react-router-dom';
import Loader from "../component/Loading";


const ResetPassword = () => {
     const {token} = useParams();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, success, loading } = useSelector((state) => state.forgotPassword);

    useEffect(() => {
      
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            toast.success("Password Updated successfully ");
            navigate("/login");
            
        }
    }, [dispatch, error, success, navigate]);


    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(resetPassword( token ,myForm));
       
    };

    return (
        <>
        {loading ? (<Loader />) :
            (<>
                <MetaData title={"Change Password"} />
            <section className="user-form-part">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
                            <div className="user-form-logo"><Link to="/"><img src={require('../assets/images/logo.png')} alt="logo" /></Link></div>
                            <div className="user-form-card">
                                <div className="user-form-title">
                                    <h2>any issue?</h2>
                                    <p>Make sure your current password is strong</p>
                                </div>
                                <form className="user-form" onSubmit={resetPasswordSubmit}>
                                  
                                    <div className="form-group">
                                        <input type="password" className="form-control"
                                         value={password} onChange={(e) => setPassword(e.target.value)}
                                            placeholder="New password" required />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control"
                                         value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="confirm password" required />
                                    </div>
                                    <div className="form-button">
                                        <button type="submit">change password</button>
                                    </div>
                                </form>
                            </div>
                            <div className="user-form-remind">
                                <p>Go Back To<Link to="/">login here</Link></p>
                            </div>
                            <div className="user-form-footer">
                                <p>Greeny | &COPY; Copyright by <Link to="/">Mironcoder</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </>)}
        </>
    )
}

export default ResetPassword