import React, { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, CreateSlider } from '../actions/homeSliderActions';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import MetaData from '../component/MetaData.js';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import { NEW_SLIDER_RESET } from '../constants/homeSliderConstant';


const NewSlider = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, success } = useSelector((state) => state.newSlider);

    const [name, setName] = useState();
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);


    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            toast.success("Slider Created successfully");
            navigate("/admin/sliderlist");
            dispatch({ type: NEW_SLIDER_RESET });
        }



    }, [dispatch, error, success ,navigate]);

    const createProductSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        images.forEach((image) => {
            myForm.append("images", image);
        })

        dispatch(CreateSlider(myForm));
    }

    const createProductImagesChange = (e) => {
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
            <MetaData tittle="Create slider " />
            <div className="content">
                <AdminHeader />
                <div className="container-fluid pt-4 px-4">
                    <h3 className="mb-2">Create Slider</h3>
                    <div className="row g-4">
                        <div className="col-sm-12 col-xl-12">
                            <div className="bg-white rounded h-100 p-4">
                                <form className="row" encType="multipart/form-data" onSubmit={createProductSubmitHandler}>
                                <div className="mb-3 col-md-6">
                                        <div className="form-floating ">
                                            <input type="text" className="form-control" placeholder="xyz" required value={name} onChange={(e) => setName(e.target.value)} />
                                            <label >Slider Name</label>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="formFileMultiple" className="form-label">Upload Product Images</label>

                                        <input className="form-control" type="file"  accept='images/*' required name="avtar" onChange={createProductImagesChange} />
                                    </div>

                                    <div className="mb-3 d-flex align-items-center overflow-auto overflow-x-hidden">
                                        {imagesPreview.map((image, index) => (
                                            <img key={index} src={image}  height="100" alt="product images" className='me-2 border' />
                                        ))}
                                    </div>

                                    <div className="mb-3 col-md-4">
                                        <button type="submit" className="btn btn-sm btn-success" disabled={loading ? true : false}>Create Slider</button>
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

export default NewSlider