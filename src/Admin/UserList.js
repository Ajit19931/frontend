import React, { useEffect } from 'react'
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getAllUsers, deleteUser } from '../actions/userAction';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import MetaData from '../component/MetaData.js';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import { DELETE_USER_RESET } from '../constants/userConstant';

const UserList = () => {

    const dispatch = useDispatch();
    const { error, users } = useSelector((state) => state.allUsers);

    const { error: deleteError, isDeleted } = useSelector((state) => state.profile);

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
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
             toast.success("User Deleted Successfully ");
            dispatch({ type: DELETE_USER_RESET });
        }

        dispatch(getAllUsers());

    }, [dispatch, error, isDeleted, deleteError]);

    const Columns = [
        { field: "id", headerName: "User ID", minWidth: 150, flex: 0.4  },
        { field: "name", headerName: "Name", minWidth: 200, flex: 0.5 },
        { field: "email", headerName: "Email", minWidth: 200, flex: 0.6, headerAlign: 'left', align: 'left', },
        { field: "role", headerName: "Role", minWidth: 80, flex: 0.3, headerAlign: 'left', align: 'left',cellClassName:(params)=>{
            return params.getValue(params.id, 'role') ==="admin" ?"text-success":"text-danger" ;
          } },
        { field: "createdAt", headerName: "CreateAt", minWidth: 100, flex: 0.3 },

        {
            field: "actions", headerName: "Actions", type: "Number", minWidth: 80, flex: 0.3, sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/admin/user/${params.getValue(params.id, "id")}`} className="me-4"><i class="fas fa-pen"></i></Link>

                        <button onClick={() => deleteUserHandler(params.getValue(params.id, "id"))}><i class="fas fa-trash"></i></button>

                    </>
                )
            }
        },

    ]
    const rows = [];

    users && users.forEach((item) => {
        rows.push({
            id: item._id,
            name: item.name,
            email: item.email,
            role: item.role,
           
            createdAt: String(item.createdAt).substr(0, 10),

        });
    });

    return (
        <>

            <MetaData tittle="Ecommerce | Admin user " />
            <div className="content">
                <AdminHeader />
                <div className="container-fluid pt-4 px-4">
                    <h3 className="mb-2">All Users</h3>
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

export default UserList