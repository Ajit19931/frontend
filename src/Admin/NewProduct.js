import React, { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, CreateProduct } from '../actions/productActions';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import MetaData from '../component/MetaData.js';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import { NEW_PRODUCT_RESET } from '../constants/productConstant';


const NewProduct = () => {
    const categories = [
        "TV",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
    ];

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, success } = useSelector((state) => state.newProduct);

    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("");
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            toast.success("Product Created successfully");
            navigate("/admin/dashboard");
            dispatch({ type: NEW_PRODUCT_RESET });
        }



    }, [dispatch, error, success, navigate]);

    const createProductSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("stock", stock);

        myForm.set("category", category);

        images.forEach((image) => {
            myForm.append("images", image);
        })

        dispatch(CreateProduct(myForm));
    }

    const createProductImagesChange = (e) => {
        debugger;
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

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
            <MetaData tittle="Create Products " />
            <div className="content">
                <AdminHeader />
                <div className="container-fluid pt-4 px-4">
                    <h3 className="mb-2">Create Products</h3>
                    <div className="row g-4">
                        <div className="col-sm-12 col-xl-12">
                            <div className="bg-white rounded h-100 p-4">
                                <form className="row" encType="multipart/form-data" onSubmit={createProductSubmitHandler}>
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
                                        <div className="form-floating mb-3">
                                            <select className="form-select" defaultValue="secate"
                                                required value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Floating label select example">
                                                <option value="" disabled selected > -- select an option -- </option>

                                                {categories.map((cate) => (
                                                    <option key={cate} value={cate} >{cate}</option>
                                                ))}
                                            </select>
                                            <label >Category</label>
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

                                        <input className="form-control" type="file" multiple accept='images/*' required name="avtar" onChange={createProductImagesChange} />
                                    </div>

                                    <div className="mb-3 d-flex align-items-center overflow-auto overflow-x-hidden">
                                        {imagesPreview.map((image, index) => (
                                            <img key={index} src={image} width="100" height="100" alt="product images" className='me-2 border' />
                                        ))}
                                    </div>
                                    <div className="mb-3 col-md-12">
                                        <div className="form-floating">
                                            <textarea className="form-control" placeholder="Leave a comment here" required value={description} cols="30" rows="2" onChange={(e) => setDescription(e.target.value)} style={{ height: "150px" }} ></textarea>
                                            <label>Description</label>
                                        </div>
                                    </div>
                                    <div className="mb-3 col-md-4">
                                        <button type="submit" className="btn btn-sm btn-success" disabled={loading ? true : false}>Create Product</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <AdminFooter />
            </div>
        </>
    )
}

export default NewProduct