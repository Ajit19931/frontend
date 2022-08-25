import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, updateChildSubCategory, getchildSubCategoryDetails, getAdminSubCategory } from '../../actions/categoryActions';
import { toast } from 'react-toastify';
import MetaData from '../../component/MetaData.js';
import AdminHeader from '../AdminHeader';
import AdminFooter from '../AdminFooter';
import { useNavigate, useParams } from 'react-router-dom';
import { UPDATE_CHILDSUBCATEGORIES_RESET } from '../../constants/categoryConstant';



const UpdateSubChildCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { subCategorys } = useSelector((state) => state.getSubcate);
  const { loading, error: updateError, isUpdated } = useSelector((state) => state.ChildSubCategory);
  const { error, childSubCategory } = useSelector((state) => state.childsubCategoryDetails);

  const [childSubCategoryName, setChildSubCategoryName] = useState("");
  const [subCategoryId, setSubCategoryId] = useState();


  useEffect(() => {

    if (childSubCategory && childSubCategory._id !== id) {
      dispatch(getchildSubCategoryDetails(id));
    } else {
      setSubCategoryId(childSubCategory.subCategoryId);
      setChildSubCategoryName(childSubCategory.childSubCategoryName);

    }

    if (error) {
      toast.error(error, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(updateError, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("sub categories Updated successfully", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate("/admin/childsubcategory");
      dispatch({ type: UPDATE_CHILDSUBCATEGORIES_RESET });
    }

    dispatch(getAdminSubCategory());

  }, [dispatch, error, isUpdated, navigate, id, updateError, childSubCategory]);



  const createCategorySubmit = (e) => {
    e.preventDefault();
    if (!childSubCategoryName.trim()) {
      toast.error("Please Enter Sub Category", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;

    }
    const myForm = new FormData();
    myForm.set("childSubCategoryName", childSubCategoryName);
    myForm.set("subCategoryId", subCategoryId);

    dispatch(updateChildSubCategory(id, myForm));


  };

  return (
    <>
      <MetaData tittle="Ecommerce | Admin update Sub category " />
      <div className="content">
        <AdminHeader />
        <div className="container-fluid pt-4 px-4">
          <div className="d-flex justify-content-between mb-3 align-content-center">
            <h3 className="mb-2">Update Child Sub Category</h3>

          </div>
          <div className="row g-4">
            <div style={{ width: '100%' }}>
              <form className="modal-form p-2 pme-3" encType="multipart/form-data"
                onSubmit={createCategorySubmit}>
                <div className="form-group">
                  <label className="form-label">Sub Category Name</label>
                  <select className="form-control" value={subCategoryId} onChange={(e) => setSubCategoryId(e.target.value)} >
                    <option value="main">Select Sub cate</option>
                    {subCategorys && subCategorys.map((cate) => (
                      <option value={cate._id} >{cate.subCategoryName}</option>
                    ))}
                  </select>

                </div>
                <div className="form-group">
                  <label className="form-label">child Sub Category Name</label>
                  <input className="form-control"
                    type="text" name="childSubCategoryName" value={childSubCategoryName} onChange={(e) => setChildSubCategoryName(e.target.value)} /></div>

                <button type="submit" className="btn btn-sm btn-success" disabled={loading ? true : false}>Update Category</button>
              </form>
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>


    </>
  )
}




export default UpdateSubChildCategory