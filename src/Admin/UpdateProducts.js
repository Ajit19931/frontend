import React, { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, UpdateProduct, getProductDetails } from '../actions/productActions';
import {  getAdminBrand } from '../actions/brandActions';
import {  getAdminMainCategory,getAdminSubCategory ,getAdminChildSubCategory } from '../actions/categoryActions';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import MetaData from '../component/MetaData.js';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import { UPDATE_PRODUCT_RESET } from '../constants/productConstant';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Loader from "../component/Loading";

const UpdateProducts = () => {
    // const categories = [
    //     "TV",
    //     "Footwear",
    //     "Bottom",
    //     "Tops",
    //     "Attire",
    //     "Camera",
    //     "SmartPhones",
    // ];

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { loading, error: updateError, isUpdated } = useSelector((state) => state.deleteProduct);
    const { loading:updateload, error, product } = useSelector((state) => state.productDetails);
    const { brands } = useSelector((state) => state.getbrand);
    const {  categoryList } = useSelector((state) => state.allMainCategories);
    const { subCategorys } = useSelector((state) => state.getSubcate);
  const { childsubCategorys } = useSelector((state) => state.getChildSubcate);

    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [mrpPrice, setMrpPrice] = useState();
    const [description, setDescription] = useState("");
    const [specification, setSpecification] = useState("");
    const [maincategory, setMainCategory] = useState("");
    const [subcategory, setSubCategory] = useState("");
    const [childsubcategory, setChildSubcategory] = useState("");
    const [brand, setBrand] = useState("");
    const [stock, setStock] = useState("");
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    useEffect(() => {
        if (product && product._id !== id) {
            dispatch(getProductDetails(id))
        }else{
            setName(product.name);
            setDescription(product.description);
            setSpecification(product.specification);
            setPrice(product.price);
            setMrpPrice(product.mrpPrice);
            setStock(product.stock);
            setMainCategory(product.maincategory);
            setSubCategory(product.subcategory);
            setChildSubcategory(product.childsubcategory);
            setBrand(product.brand);
            setOldImages(product.images);
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
            navigate("/admin/productlist");
            dispatch({ type: UPDATE_PRODUCT_RESET });
        }

        dispatch(getAdminBrand());
        dispatch(getAdminMainCategory());
        dispatch(getAdminSubCategory());
        dispatch(getAdminChildSubCategory());

    }, [dispatch, error, isUpdated, navigate ,id ,product ,updateError]);

    const updateProductSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("mrpPrice", mrpPrice);
        myForm.set("description", description);
        myForm.set("specification", specification);
        myForm.set("stock", stock);

        myForm.set("maincategory", maincategory);
        myForm.set("subcategory", subcategory);
        myForm.set("childsubcategory", childsubcategory);
        myForm.set("brand", brand);

        images.forEach((image) => {
            myForm.append("images", image);
        })

        dispatch(UpdateProduct(id,myForm));
    }

    const updateProductImagesChange = (e) => {
        debugger;
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

        files.forEach((file) => {

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            }

            reader.readAsDataURL(file)
        }
        )
    }

    return (
        <>
         {updateload ? (<Loader />) :
                (<>
            <MetaData tittle="Create Products " />
            <div className="content">
                <AdminHeader />
                <div className="container-fluid pt-4 px-4">
                    <h3 className="mb-2">Update Product</h3>
                    <div className="row g-4">
                        <div className="col-sm-12 col-xl-12">
                            <div className="bg-white rounded h-100 p-4">
                                <form className="row" encType="multipart/form-data" onSubmit={updateProductSubmitHandler} >
                                    <div className="mb-3 col-md-6">
                                        <div className="form-floating ">
                                            <input type="text" className="form-control" placeholder="xyz" required value={name} onChange={(e) => setName(e.target.value)} />
                                            <label >Product Name</label>
                                        </div>
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <div className="form-floating ">
                                            <input type="number" className="form-control" placeholder="Product Price" required value={price} onChange={(e) => setPrice(e.target.value)} />
                                            <label>Price</label>
                                        </div>
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <div className="form-floating ">
                                            <input type="number" className="form-control" placeholder="Product Price" required value={mrpPrice} onChange={(e) => setMrpPrice(e.target.value)} />
                                            <label>MRP Price</label>
                                        </div>
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <div className="form-floating mb-3">
                                            <select className="form-select" 
                                                required value={maincategory} onChange={(e) => setMainCategory(e.target.value)} aria-label="Floating label select example">
                                                <option value="" disabled  > -- select an option -- </option>

                                                {categoryList && categoryList.map((cate) => (
                                                    <option key={cate._id} value={cate._id} >{cate.categoryName}</option>
                                                ))}
                                            </select>
                                            <label >Main Category</label>
                                        </div>
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <div className="form-floating mb-3">
                                            <select className="form-select" 
                                                required value={subcategory} onChange={(e) => setSubCategory(e.target.value)} aria-label="Floating label select example">
                                                <option value="" disabled  > -- select an option -- </option>

                                                {subCategorys && subCategorys.map((subcate) => (
                                                    <option key={subcate._id} value={subcate._id} >{subcate.subCategoryName}</option>
                                                ))}
                                            </select>
                                            <label >Sub Category</label>
                                        </div>
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <div className="form-floating mb-3">
                                            <select className="form-select" 
                                                required value={childsubcategory} onChange={(e) => setChildSubcategory(e.target.value)} aria-label="Floating label select example">
                                                <option value="" disabled  > -- select an option -- </option>

                                                {childsubCategorys && childsubCategorys.map((childcate) => (
                                                    <option key={childcate._id} value={childcate._id} >{childcate.childSubCategoryName}</option>
                                                ))}
                                            </select>
                                            <label >Child Sub Category</label>
                                        </div>
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <div className="form-floating mb-3">
                                            <select className="form-select" 
                                                required value={brand} onChange={(e) => setBrand(e.target.value)} aria-label="Floating label select example" >
                                                <option value=""   disabled > -- select an option -- </option>

                                                {brands && brands.map((bran) => (
                                                    <option key={bran._id} value={bran._id} >{bran.brandName}</option>
                                                ))}

                                            </select>
                                            <label >Brand</label>
                                        </div>
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <div className="form-floating ">
                                            <input type="number" className="form-control" placeholder="Product Price" required value={stock} onChange={(e) => setStock(e.target.value)} />
                                            <label>Stock</label>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="formFileMultiple" className="form-label">Upload Product Images</label>

                                        <input className="form-control" type="file" multiple accept='images/*'  name="avtar" onChange={updateProductImagesChange} />
                                    </div>
                                    <div className="mb-3 d-flex align-items-center overflow-auto overflow-x-hidden">
                                        {oldImages && oldImages.map((image, index) => (
                                            <img key={index} src={image.url} width="100" height="100" alt="product images" className='me-2 border' />
                                        ))}
                                    </div>
                                    <div className="mb-3 d-flex align-items-center overflow-auto overflow-x-hidden">
                                        {imagesPreview.map((image, index) => (
                                            <img key={index} src={image} width="100" height="100" alt="product images" className='me-2 border' />
                                        ))}
                                    </div>
                                    {/* <div className="mb-3 col-md-12">
                                        <div className="form-floating">
                                            <textarea className="form-control" placeholder="Leave a comment here" required value={description} cols="30" rows="2" onChange={(e) => setDescription(e.target.value)} style={{ height: "150px" }} ></textarea>
                                            <label>Description</label>
                                        </div>
                                    </div>
                                    <div className="mb-3 col-md-12">
                                        <div className="form-floating">
                                            <textarea className="form-control" placeholder="Leave a comment here" required value={specification} cols="30" rows="2" onChange={(e) => setSpecification(e.target.value)} style={{ height: "150px" }} ></textarea>
                                            <label>Description</label>
                                        </div>
                                    </div> */}
                                    <div className='mb-3 col-md-12'>
                                    <label className="form-label">Description</label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={description}
                                            
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                               
                                                setDescription(data) ;
                                            }}
                                        />

                                    </div>
                                    <div className='mb-3 col-md-12'>
                                    <label className="form-label">specification</label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={specification}
                                          
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                // console.log({ event, editor, data });
                                                setSpecification(data) ;
                                            }}
                                        />

                                    </div>
                                    <div className="mb-3 col-md-4">
                                        <button type="submit" className="btn btn-sm btn-success" disabled={loading ? true : false}>Update Product</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <AdminFooter />
            </div>
            </>
                )}
        </>
    )
}

export default UpdateProducts