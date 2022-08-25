import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, updateMainCategory, getMainCategoryDetails } from '../../actions/categoryActions';
import { toast } from 'react-toastify';
import MetaData from '../../component/MetaData.js';
import AdminHeader from '../AdminHeader';
import AdminFooter from '../AdminFooter';
import { useNavigate, useParams } from 'react-router-dom';
import { UPDATE_MAINCATEGORIES_RESET } from '../../constants/categoryConstant';



const UpdateMaincategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const { loading, error: updateError, isUpdated } = useSelector((state) => state.MainCategory);
    const { error, mainCategory } = useSelector((state) => state.mainCategoryDetails);



    const [categoryName, setCategoryName] = useState();
    // const [categoryImage, setCategoryImage] = useState("");
    // const [categoryImgPreview, setCategoryImgPreview] = useState("/Profile.png");

    useEffect(() => {
        
        if (mainCategory && mainCategory._id !== id) {
            dispatch(getMainCategoryDetails(id));
        }else{
          
       setCategoryName(mainCategory.categoryName);
            
        }

        if (error) {
            toast.error(error , {
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
            toast.error(updateError , {
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
            toast.success("Product Updated successfully" , {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            navigate("/admin/newcategory");
            dispatch({ type: UPDATE_MAINCATEGORIES_RESET });
        }



    }, [dispatch, error, isUpdated, navigate ,id ,mainCategory ,updateError]);



    const createCategorySubmit = (e) => {
        e.preventDefault();
        if (!categoryName.trim()) {
            toast.error("Please Enter Main Category", {
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
        myForm.set("categoryName", categoryName);
        // myForm.set("categoryImage", categoryImage);
        dispatch(updateMainCategory(id, myForm));


    };

    return (
        <>
            <MetaData tittle="Ecommerce | Admin update Main category " />
            <div className="content">
                <AdminHeader />
                <div className="container-fluid pt-4 px-4">
                    <div className="d-flex justify-content-between mb-3 align-content-center">
                        <h3 className="mb-2">Update Main Category</h3>

                    </div>
                    <div className="row g-4">
                        <div style={{ width: '100%' }}>
                            <form className="modal-form p-2 pme-3" encType="multipart/form-data"
                                onSubmit={createCategorySubmit}>
                                {/* <div className="col-lg-12 text-center">
                            <div className="profile-image">
                                <img src={categoryImgPreview} alt="category Name" className="rounded-circle" width={100} height={100} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Category image</label><input type="file" className="form-control w-75 h-50 col-md-12 " name="categoryImage" accept="image/*" value={categoryImage} onChange={registerDataChange} />
                        </div> */}
                                <div className="form-group">
                                    <label className="form-label">Category Name</label>
                                    <input className="form-control"
                                        type="text" name="categoryName" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} /></div>

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

export default UpdateMaincategory