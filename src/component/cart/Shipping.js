import React, { useState } from 'react';
import MetaData from "../MetaData";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { saveShippingInfo } from '../../actions/cartActions';
import { Country, State, City } from 'country-state-city';
import CheckoutSteps from "../cart/CheckoutSteps";


const Shipping = () => {
    document.getElementsByClassName('mobile-menu')[0].style.visibility = 'hidden';
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { shippingInfo } = useSelector((state) => state.cart);
    const [address, setAddress] = useState(shippingInfo.address);
    const [state, setState] = useState(shippingInfo.state);
    const [city, setCity] = useState(shippingInfo.city);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);


    const shippingSubmit = (e) => {
        e.preventDefault();

        if (phoneNo.length < 10 || phoneNo.length > 10) {
            toast.error("Phone Number should be 10 digits Long");
            return;
        }
        dispatch(
            saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
        );
        toast.success("Address saved successfully")
        navigate("/order/confirm");
    }
    return (
        <>
            <MetaData title="Add Address" />
            <section className="inner-section checkout-part mt-5">
                <div className="container">
                    <CheckoutSteps activeStep={0} />
                    <div className="row mt-3">
                        <div className="col-lg-12 col-12">

                            <div className="account-card">
                                <div className="account-title">
                                    <h4>Add Address</h4>
                                </div>
                                <div className="account-content">
                                    <form>
                                        <div className="row">
                                            <div className="col-lg-12 col-12">
                                                <div className="form-group">
                                                    <label className="form-label">Full Address</label>
                                                    <textarea className="form-control" type="text" placeholder="Enter Full Address" required value={address} onChange={(e) => setAddress(e.target.value)}  ></textarea>
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-12">
                                                <div className="form-group">
                                                    <label className="form-label">Pincode</label>
                                                    <input className="form-control" type="number" placeholder="Enter Pincode" required value={pinCode} onChange={(e) => setPinCode(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-12">
                                                <div className="form-group">
                                                    <label className="form-label">Phone Number</label>
                                                    <input className="form-control" type="number" placeholder="Enter Phone Number" required value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-12">

                                                <div className="form-group">
                                                    <label className="form-label">Country</label>
                                                    <select className="form-select" required defaultValue="contry" value={country} onChange={(e) => setCountry(e.target.value)}>
                                                        <option value="contry">Country</option>
                                                        {Country && Country.getAllCountries().map((item) => (
                                                            <option key={item.isoCode} value={item.isoCode}>{item.name}</option>

                                                        ))}

                                                    </select>
                                                </div>
                                            </div>
                                            {country && (

                                                <div className="col-lg-6 col-12">

                                                    <div className="form-group">
                                                        <label className="form-label">State</label>
                                                        <select className="form-select" value={state} onChange={(e) => setState(e.target.value)}>
                                                            {State && State.getStatesOfCountry(country).map((item) => (
                                                                <option key={item.isoCode} value={item.isoCode}>{item.name}</option>

                                                            ))}


                                                        </select>
                                                    </div>
                                                </div>
                                            )}
                                            {state && (<div className="col-lg-6 col-12">
                                                <div className="form-group">
                                                    <label className="form-label">City</label>
                                                    <select className="form-select" required value={city} onChange={(e) => setCity(e.target.value)}>
                                                        {City && City.getCitiesOfState(country, state).map((item) => (
                                                            <option key={item.isoCode} value={item.isoCode}>{item.name}</option>

                                                        ))}


                                                    </select>

                                                </div>
                                            </div>)}

                                        </div>
                                        <div className='row mt-3'>
                                            <div className="col-lg-4 offset-md-4 text-center col-12">
                                                <button className="form-btn" type="submit" onClick={shippingSubmit} disabled={state ? false : true}>save Shipping Address</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Shipping