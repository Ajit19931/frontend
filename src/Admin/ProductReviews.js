import React, { useEffect, useState } from 'react'
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getAllReview, deleteReview } from '../actions/productActions';
import { toast } from 'react-toastify';
import MetaData from '../component/MetaData.js';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import { DELETE_REVIEW_RESET } from '../constants/productConstant';

const ProductReviews = () => {

    const dispatch = useDispatch();
    const { error, reviews, loading } = useSelector((state) => state.productReview);

    const { error: deleteError, isDeleted } = useSelector((state) => state.Review);

    const [productId, setProductId] = useState("")

    const deleteReviewHandler = (reviewId) => {
        dispatch(deleteReview(reviewId ,productId));
    }


    const productReviewSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(getAllReview(productId));

    }
    useEffect(() => {

        if (productId.length === 24) {
            dispatch(getAllReview(productId));
        }

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (deleteError) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            toast.success("Review delete successfully ");
            dispatch({ type: DELETE_REVIEW_RESET });
        }

     

    }, [dispatch, error, isDeleted, deleteError ,productId]);



    const Columns = [
        { field: "id", headerName: "Review ID", minWidth: 100, flex: 0.5 },
        { field: "name", headerName: "user", minWidth: 110, flex: 0.5 },
        { field: "comment", headerName: "comment", type: "Number", minWidth: 250, flex: 1, headerAlign: 'left', align: 'left', },
        {
            field: "rating", headerName: "Rating", type: "Number", minWidth: 80, flex: 0.3, headerAlign: 'center', align: 'center', cellClassName: (params) => {
                return params.getValue(params.id, "rating") >= 3 ? "text-success" : "text-danger";
            }
        },

        // { field: "createAt", headerName: "CreateAt", minWidth: 100, flex: 0.3 },

        {
            field: "actions", headerName: "Actions",  minWidth: 50, flex: 0.2, sortable: false,headerAlign: 'center', align: 'center', 
            renderCell: (params) => {
                return (
                    <>
                        <button onClick={() => deleteReviewHandler(params.getValue(params.id, "id"))}><i class="fas fa-trash"></i></button>

                    </>
                )
            }
        },

    ]
    const rows = [];

    reviews && reviews.forEach((item) => {
        rows.push({
            id: item._id,
            name: item.name,
            comment: item.comment,
            rating: item.rating,

            // createAt: String(item.createAt).substr(0, 10),

        });
    });

    return (
        <>
            <MetaData tittle="Ecommerce | All Reviews" />
            <div className="content">
                <AdminHeader />
                <div className="container-fluid pt-4 px-4">
                    <h3 className="mb-2">All Products Reviews</h3>
                   
                    <div className="row">
                    <div className="col-md-6 offset-md-3">
                    <div className="account-card p-4">
                    <form onSubmit={productReviewSubmitHandler}>
                       
                        <div className="form-group">
                            <label className="form-label">Enter Product Id</label>
                            <input className="form-control" type="text" required value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                                placeholder="Enter Product Id" />

                        </div>
                        <button className="form-btn" disabled={
                            loading ? true : false || productId === "" ? true : false
                        } type="submit">Search</button>
                    </form>
                    </div> </div>  </div>

                    {reviews && reviews.length > 0 ? (<><div className="row g-4">
                        <div style={{ width: '100%' }}>
                            <DataGrid
                                rows={rows}
                                columns={Columns}
                                pageSize={7}
                                autoHeight
                                disableSelectionOnClick

                            />
                        </div>
                    </div></>) : (<h3 className="mt-3 text-center">No Review Found</h3>)}
                </div>
                <AdminFooter />
            </div>
        </>
    )
}

export default ProductReviews