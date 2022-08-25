import React, { useEffect } from 'react'
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getAdminProduct, deleteProduct } from '../actions/productActions';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import MetaData from '../component/MetaData.js';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import { DELETE_PRODUCT_RESET } from '../constants/productConstant';

const ProductList = () => {
    const dispatch = useDispatch();
    const { error, products } = useSelector((state) => state.products);

    const { error: deleteError, isDeleted } = useSelector((state) => state.deleteProduct);

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (deleteError) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            toast.success("Product delete successfully ");
            dispatch({ type: DELETE_PRODUCT_RESET });
        }

        dispatch(getAdminProduct());

    }, [dispatch, error, isDeleted, deleteError]);

    const Columns = [
        { field: "id", headerName: "Product ID", minWidth: 100, flex: 0.3 },
        { field: "name", headerName: "Name", minWidth: 200, flex: 0.7 },
        { field: "stock", headerName: "Stock", type: "Number", minWidth: 50, flex: 0.2, headerAlign: 'center', align: 'center', },
        { field: "price", headerName: "Price", type: "Number", minWidth: 80, flex: 0.3, headerAlign: 'center', align: 'center', },
        { field: "createAt", headerName: "CreateAt", minWidth: 100, flex: 0.3 },

        {
            field: "actions", headerName: "Actions", type: "Number", minWidth: 80, flex: 0.3, sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/admin/product/${params.getValue(params.id, "id")}`} className="me-4"><i class="fas fa-pen"></i></Link>

                        <button onClick={() => deleteProductHandler(params.getValue(params.id, "id"))}><i class="fas fa-trash"></i></button>

                    </>
                )
            }
        },

    ]
    const rows = [];

    products && products.forEach((item) => {
        rows.push({
            id: item._id,
            stock: item.stock,
            price: item.price,
            name: item.name,
            createAt: String(item.createAt).substr(0, 10),

        });
    });

    return (
        <>
            <MetaData tittle="Ecommerce | Admin Products " />
            <div className="content">
                <AdminHeader />
                <div className="container-fluid pt-4 px-4">
                    <h3 className="mb-2">All Products</h3>
                    <div className="row g-4">
                        <div style={{ width: '100%' }}>
                            <DataGrid
                                rows={rows}
                                columns={Columns}
                                pageSize={5}
                                // rowsPerPageOptions={[5]}
                                autoHeight
                                disableSelectionOnClick

                            />
                        </div>
                    </div>
                </div>
                <AdminFooter />
            </div>
        </>
    )
}

export default ProductList