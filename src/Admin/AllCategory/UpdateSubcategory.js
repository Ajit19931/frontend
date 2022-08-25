import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, updateSubCategory ,getSubCategoryDetails ,getAdminMainCategory} from '../../actions/categoryActions';
import { toast } from 'react-toastify';
import MetaData from '../../component/MetaData.js';
import AdminHeader from '../AdminHeader';
import AdminFooter from '../AdminFooter';
import { useNavigate, useParams } from 'react-router-dom';
import { UPDATE_SUBCATEGORIES_RESET } from '../../constants/categoryConstant';



const UpdateSubcategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { categoryList } = useSelector((state) => state.allMainCategories);
    const { loading, error: updateError, isUpdated } = useSelector((state) => state.SubCategory);
    const { error ,subCategory } = useSelector((state) => state.subCategoryDetails);
    const [subCategoryName, setSubCategoryName] = useState("");
    const [categoryId, setCategoryId] = useState();
   

    useEffect(() => {

        if (subCategory && subCategory._id !== id) {
            dispatch(getSubCategoryDetails(id));
        } else {
            setCategoryId(subCategory.categoryId);
          setSubCategoryName(subCategory.subCategoryName);

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
            navigate("/admin/subcategory");
            dispatch({ type: UPDATE_SUBCATEGORIES_RESET });
        }

        dispatch(getAdminMainCategory());

    }, [dispatch, error, isUpdated, navigate, id, updateError ,subCategory]);



    const createCategorySubmit = (e) => {
        e.preventDefault();
        if (!subCategoryName.trim()) {
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
        myForm.set("categoryId", categoryId);
        myForm.set("subCategoryName", subCategoryName);
      
        dispatch(updateSubCategory(id, myForm));


    };

    return (
        <>
            <MetaData tittle="Ecommerce | Admin update Sub category " />
            <div className="content">
                <AdminHeader />
                <div className="container-fluid pt-4 px-4">
                    <div className="d-flex justify-content-between mb-3 align-content-center">
                        <h3 className="mb-2">Update Sub Category</h3>

                    </div>
                    <div className="row g-4">
                        <div style={{ width: '100%' }}>
                            <form className="modal-form p-2 pme-3" encType="multipart/form-data"
                                onSubmit={createCategorySubmit}>

                                <div className="form-group">
                                    <label className="form-label">Main Category Name</label>
                                    <select className="form-control" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} >
                                        <option value="main">Select Main cate</option>
                                        {categoryList && categoryList.map((cate) => (
                                            <option value={cate._id} >{cate.categoryName}</option>
                                        ))}
                                    </select>

                                </div>
                                <div className="form-group">
                                    <label className="form-label">Sub Category Name</label>
                                    <input className="form-control"
                                        type="text" name="subCategoryName" value={subCategoryName} onChange={(e) => setSubCategoryName(e.target.value)} /></div>

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



export default UpdateSubcategory