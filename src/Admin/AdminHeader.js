import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { logout } from "../actions/userAction";
import { toast } from 'react-toastify';



const AdminHeader = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    const logouthandle = () => {
        dispatch(logout());
        toast.success(' Logout Successfully ', { autoClose: 3000, });
    }
    return (
        <>
            <nav className="navbar navbar-expand bg-white navbar-light sticky-top px-4 py-0">
                <Link to="index.html" className="navbar-brand d-flex d-lg-none me-4">
                    <h2 className="text-primary mb-0"><i className="fa fa-hashtag"></i></h2>
                </Link>
                <Link to="/" className="sidebar-toggler flex-shrink-0">
                    <i className="fa fa-bars"></i>
                </Link>
                <form className="d-none d-md-flex ms-4">
                    <input className="form-control border-0" type="search" placeholder="Search" />
                </form>
                <div className="navbar-nav align-items-center ms-auto">
                    <div className="nav-item dropdown">
                        <Link to="/" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                            <i className="fa fa-envelope me-lg-2"></i>
                            {/* <span className="d-none d-lg-inline-flex">Message</span> */}
                        </Link>
                        <div className="dropdown-menu dropdown-menu-end  m-0">
                            <Link to="/" className="dropdown-item">
                                <div className="d-flex align-items-center">
                                    <img src="../Profile.png" className="rounded-circle" alt="logo" width="40px" />
                                    <div className="ms-2">
                                        <h6 className="fw-normal mb-0">Jhon send you a message</h6>
                                        <small>15 minutes ago</small>
                                    </div>
                                </div>
                            </Link>
                            <hr className="dropdown-divider" />
                            <Link to="/" className="dropdown-item">
                                <div className="d-flex align-items-center">
                                    <img src="../Profile.png" className="rounded-circle" alt="logo" width="40px" />
                                    <div className="ms-2">
                                        <h6 className="fw-normal mb-0">Jhon send you a message</h6>
                                        <small>15 minutes ago</small>
                                    </div>
                                </div>
                            </Link>
                            <hr className="dropdown-divider" />
                            <Link to="/" className="dropdown-item">
                                <div className="d-flex align-items-center">
                                    <img src="../Profile.png" className="rounded-circle" alt="logo" width="40px" />
                                    <div className="ms-2">
                                        <h6 className="fw-normal mb-0">Jhon send you a message</h6>
                                        <small>15 minutes ago</small>
                                    </div>
                                </div>
                            </Link>
                            <hr className="dropdown-divider" />
                            <Link to="/" className="dropdown-item text-center">See all message</Link>
                        </div>
                    </div>
                    <div className="nav-item dropdown">
                        <Link to="/" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                            <i className="fa fa-bell me-lg-2"></i>
                            {/* <span className="d-none d-lg-inline-flex">Notificatin</span> */}
                        </Link>
                        <div className="dropdown-menu dropdown-menu-end  m-0">
                            <Link to="/" className="dropdown-item">
                                <h6 className="fw-normal mb-0">Profile updated</h6>
                                <small>15 minutes ago</small>
                            </Link>
                            <hr className="dropdown-divider" />
                            <Link to="/" className="dropdown-item">
                                <h6 className="fw-normal mb-0">New user added</h6>
                                <small>15 minutes ago</small>
                            </Link>
                            <hr className="dropdown-divider" />
                            <Link to="/" className="dropdown-item">
                                <h6 className="fw-normal mb-0">Password changed</h6>
                                <small>15 minutes ago</small>
                            </Link>
                            <hr className="dropdown-divider" />
                            <Link to="/" className="dropdown-item text-center">See all notifications</Link>
                        </div>
                    </div>
                    <div className="nav-item dropdown">
                        <Link to="/" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                            <img src={user.avatar && user.avatar.url} alt={user && user.name} className="rounded-circle"  width="40px" />
                            <span className="d-none d-lg-inline-flex ps-2">{user && user.name}</span>
                        </Link>
                        <div className="dropdown-menu dropdown-menu-end  m-0">
                            <Link to="/" className="dropdown-item">My Profile</Link>
                            <Link to="/" className="dropdown-item">Settings</Link>
                            <Link to="/" onClick={logouthandle} className="dropdown-item">Log Out</Link>
                        </div>
                    </div>
                </div>
            </nav>



        </>
    )
}

export default AdminHeader