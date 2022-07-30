
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getUserDetails, updateUser } from '../actions/userAction';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import MetaData from '../component/MetaData.js';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import { UPDATE_USER_RESET } from '../constants/userConstant';
import Loader from "../component/Loading";


const UserDetails = () => {
  const dispatch = useDispatch();
  const { error, user, loading } = useSelector((state) => state.userDetails);
  const { error: updateError, isUpdated, loading: updateloading } = useSelector((state) => state.profile);

  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [role, setRole] = useState();


  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(getUserDetails(id))
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }


    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("user Updated successfully");
      navigate("/admin/userlist");
      dispatch({ type: UPDATE_USER_RESET });
    }


  }, [dispatch, error, isUpdated, navigate, updateError, user, id]);


  const updateUserSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(id, myForm));
  }

  return (
    <> <MetaData tittle="Ecommerce | update user " />
      <div className="content">
        <AdminHeader />
        <div className="container-fluid pt-4 px-4">
          <h3 className="mb-2">Update User </h3>
          {loading ? (
            <Loader />
          ) : (
            <div className="row g-4">
              <div className="col-sm-12 col-xl-12">
                <div className="bg-white rounded h-100 p-4">
                  <form className="row" encType="multipart/form-data" onSubmit={updateUserSubmitHandler} >
                    <div className="mb-3 col-md-6">
                      <div className="form-floating ">
                        <input type="text" className="form-control" placeholder="xyz" required value={name} onChange={(e) => setName(e.target.value)} />
                        <label >User Name</label>
                      </div>
                    </div>
                    <div className="mb-3 col-md-6">
                      <div className="form-floating ">
                        <input type="email" className="form-control" placeholder="Product email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label>Email</label>
                      </div>
                    </div>
                    <div className="mb-3 col-md-6">
                      <div className="form-floating mb-3">
                        <select className="form-select" defaultValue="secate"
                          required value={role} onChange={(e) => setRole(e.target.value)} aria-label="Floating label select example">
                          <option value="" disabled selected > -- select an option -- </option>
                          <option value="user" >User</option>
                          <option value="admin" >Admin</option>
                        </select>
                        <label >Role</label>
                      </div>
                    </div>



                    <div className="mb-3 col-md-4">
                      <button type="submit" className="btn btn-sm btn-success" disabled={updateloading ? true : false || role === "" ? true : false}>Update User</button>
                    </div>

                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
        <AdminFooter />
      </div>
    </>
  )
}

export default UserDetails