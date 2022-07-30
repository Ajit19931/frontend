import React from 'react';
 import { Link } from 'react-router-dom';
 import {  useSelector } from "react-redux";
import "../assets/css/admin.css"



const AdminSidebar = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <div className="sidebar shadow-md pb-3">
        <nav className="navbar bg-light navbar-light">
          <Link to="index.html" className="navbar-brand mx-4 mb-3">
            <img src={require('../assets/images/logo.png')} alt="logo" width="100%" />
         </Link>
          <div className="d-flex align-items-center ms-4 mb-4">
            <div className="position-relative">
            <img src={user.avatar && user.avatar.url} alt={user && user.name} className="rounded-circle"  width="40px" />
              <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
            </div>
            <div className="ms-3">
              <h6 className="mb-0">{user && user.name}</h6>
              <span>{user && user.role}</span>
            </div>
          </div>
          <div className="navbar-nav w-100">
            <Link to="/admin/dashboard" className="nav-item nav-link active"><i className="fa fa-tachometer-alt me-2"></i>Dashboard</Link>
            <Link to="/admin/userlist" className="nav-item nav-link "><i className="fas fa-user me-2"></i>User</Link>
            
            <div className="nav-item dropdown">
              <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2"></i>Products</Link>
              <div className="dropdown-menu bg-transparent border-0">
                <Link to="/admin/newproduct" className="dropdown-item">Add Products</Link>
                <Link to="/admin/productlist" className="dropdown-item">All Products</Link>
               
              </div>
            </div>
            <div className="nav-item dropdown">
              <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-th me-2"></i>Category</Link>
              <div className="dropdown-menu bg-transparent border-0">
                <Link to="/admin/dashboard" className="dropdown-item">Add Category</Link>
                <Link to="/admin/dashboard" className="dropdown-item">All Category</Link>
               
              </div>
            </div>
            <Link to="/admin/orders" className="nav-item nav-link"><i className="fa fa-shopping-bag me-2"></i>Orders</Link>
            <Link to="/admin/reviews" className="nav-item nav-link"><i class="fas fa-comments me-2"></i>Reviews</Link>
            
              </div>
        </nav>
      </div>

      
    </>
  )
}

export default AdminSidebar