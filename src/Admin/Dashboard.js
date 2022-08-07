import React, { useEffect } from 'react'
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import { getAdminProduct } from '../actions/productActions';
import { useSelector, useDispatch } from 'react-redux';
import { Doughnut, Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import { getAllOrders } from '../actions/orderActions';
import { getAllUsers } from '../actions/userAction';
Chart.register(...registerables);



const Dashboard = () => {

    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);
    const { orders } = useSelector((state) => state.allOrders);
    const { users } = useSelector((state) => state.allUsers);


    let outofStock = 0;

    products && products.forEach((item) => {
        if (item.stock === 0) {
            outofStock += 1;
        }
    });

    useEffect(() => {

        dispatch(getAdminProduct());
        dispatch(getAllOrders());
        dispatch(getAllUsers());

    }, [dispatch]);

    let totalAmount = 0;
    orders &&
      orders.forEach((item) => {
        totalAmount += item.totalPrice;
      });

    const lineState = {
        labels: ["Amount", "Amt Earned"],
        datasets: [{
            label: "Total Amount",
            backgroundColor: ["#119744"],
            hoverBackgroundColor: ["#11b76b"],
            data: [0, totalAmount],
        },
        ]
    }

    const doughnutState = {
        labels: ["Out Of Stock", "InStock"],
        datasets: [{
            backgroundColor: ["#11b76b", "#119744"],
            hoverBackgroundColor: ["#119744", "#11b76b"],
            data: [outofStock, products.length - outofStock],
        },
        ]
    }

    return (
        <>
            <div className="content">
                <AdminHeader />
                <div className="container-fluid pt-4 px-4">
                    <div className="row g-4">

                        <div className="col-sm-6 col-xl-3">
                            <div className="bg-white shadow-sm rounded d-flex align-items-center justify-content-between p-4">
                                <i className="fa fa-chart-bar fa-3x text-primary"></i>
                                <div className="ms-3 text-center">
                                    <p className="mb-2">Total Sale</p>
                                    <h4 className="mb-0">₹{totalAmount}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-xl-3">
                            <div className="bg-white shadow-sm rounded d-flex align-items-center justify-content-between p-4">
                                <i className="fa fa-chart-area fa-3x text-primary"></i>
                                <div className="ms-3 text-center">
                                    <p className="mb-2">Total Products</p>
                                    <h4 className="mb-0">{products && products.length}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-xl-3">
                            <div className="bg-white  shadow-sm rounded d-flex align-items-center justify-content-between p-4">
                                <i className="fa fa-chart-pie fa-3x text-primary"></i>
                                <div className="ms-3 text-center">
                                    <p className="mb-2">Total Orders</p>
                                    <h4 className="mb-0">{orders && orders.length}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-xl-3">
                            <div className="bg-white shadow-sm rounded d-flex align-items-center justify-content-between p-4">
                                <i className="fas fa-user fa-3x text-primary"></i>
                                <div className="ms-3 text-center">
                                    <p className="mb-2">Total Users</p>
                                    <h4 className="mb-0">{users && users.length}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="container-fluid pt-4 px-4">
                    <div className="row g-4">
                        <div className="col-sm-12 col-xl-8">
                            <div className="bg-white shadow-sm text-center rounded pt-2 p-3">
                                <div className="d-flex align-items-center justify-content-between mb-2">
                                    <h6 className="mb-0">Sales &amp; Revenue</h6>

                                </div>
                                <Line data={lineState} />
                            </div>
                        </div>
                        <div className="col-sm-12 col-xl-4">
                            <div className="bg-white shadow-sm text-center rounded pt-2 p-3">
                                <div className="d-flex align-items-center justify-content-between pb-1 mb-4">
                                    <h6 className="mb-0">Stocks</h6>

                                </div>
                                <Doughnut data={doughnutState} />

                            </div>
                        </div>
                    </div>
                </div>


                <AdminFooter />
            </div>

        </>
    )
}

export default Dashboard