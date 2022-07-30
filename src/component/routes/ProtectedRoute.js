import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({
    children,
    adminRoute,
    isAdmin,
    redirect = "/login",
    redirectAdmin = "/profile",

}) => {
    const { loading, isAuthenticated } = useSelector((state) => state.user);

    const navigate = useNavigate();
    if (loading === false){
        if (isAuthenticated === false) {
            return navigate(redirect);
        }
        if (adminRoute && !isAdmin) {
            return navigate(redirectAdmin);
        }
        
        // else if (adminRoute && isAdmin){
        //     return navigate("/admin/dashboard");
        // }

}


    


    return (

        <>
            {loading === false && (
                children ? children : <Outlet />
            )}
        </>
    )
};

export default ProtectedRoute;