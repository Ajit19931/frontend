
import React, { useEffect } from 'react'
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getAllOrders, deleteOrder } from '../actions/orderActions';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import MetaData from '../component/MetaData.js';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import { DELETE_ORDER_RESET } from '../constants/orderConstant';



const OrderList = () => {

  const dispatch = useDispatch();
  const { error, orders } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector((state) => state.Order);


  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
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
      toast.success("Order deleted successfully ");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());

  }, [dispatch, error, isDeleted, deleteError]);

  const Columns = [
    { field: "id", headerName: "order ID", minWidth: 100, flex: 0.3 },
    { field: "name", headerName: "Name", minWidth: 200, flex: 0.5 },
    { field: "status", headerName: "Status", minWidth: 50, flex: 0.4, headerAlign: 'center', align: 'center',cellClassName:(params)=>{
      return params.getValue(params.id, 'status') ==="Delivered" ?"text-success":"text-danger" ;
    } },
    { field: "itemQty", headerName: "item Qty",type: "Number", minWidth: 80, flex: 0.2, headerAlign: 'center', align: 'center', },
    { field: "amount", headerName: "Amount", minWidth: 80, flex: 0.4, headerAlign: 'center', align: 'center', },

    { field: "paidAt", headerName: "Paid At", minWidth: 100, flex: 0.3 },

    {
      field: "actions", headerName: "Actions", type: "Number", minWidth: 80, flex: 0.3, sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`} className="me-4"><i class="fas fa-pen"></i></Link>

            <button onClick={() => deleteOrderHandler(params.getValue(params.id, "id"))}><i class="fas fa-trash"></i></button>

          </>
        )
      }
    },

  ]
  const rows = [];

  orders && orders.forEach((item) => {
    rows.push({
      id: item._id,
      name: item.orderItems[0].name,
      itemQty: item.orderItems.length,
      status: item.orderStatus,
      amount: item.totalPrice,
      paidAt: String(item.paidAt).substr(0, 10),

    });
  });

  return (
    <> <MetaData tittle="Ecommerce | Admin Orders " />
      <div className="content">
        <AdminHeader />
        <div className="container-fluid pt-4 px-4">
          <h3 className="mb-2">All Orders</h3>
          <div className="row g-4">
            <div style={{ width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={Columns}
                pageSize={7}
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

export default OrderList