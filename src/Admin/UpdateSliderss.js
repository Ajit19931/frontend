import React, { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getHomeSlider, UpdateSlider } from '../actions/homeSliderActions';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import MetaData from '../component/MetaData.js';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import { UPDATE_SLIDER_RESET } from '../constants/homeSliderConstant';

const UpdateSliderss = () => {

  const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const {  error, slider } = useSelector((state) => state.slider);
    const { loading, error: updateError, isUpdated } = useSelector((state) => state.delupSlider);
  
   

    const [name, setName] = useState();
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    useEffect(() => {
        if (slider && slider._id !== id) {
          dispatch(getHomeSlider(id))
        }else{

          //  setName(slider.name);
         //   setOldImages(slider.images);
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
            toast.success("Slider Updated successfully");
            navigate("/admin/sliderlist");
            dispatch({ type: UPDATE_SLIDER_RESET });
        }



    }, [dispatch, error, isUpdated, navigate ,id ,slider ,updateError]);

    const updateProductSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("name", name);

        images.forEach((image) => {
            myForm.append("images", image);
        })

        dispatch(UpdateSlider(id,myForm));
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
            <MetaData tittle="Create Products " />
            <div className="content">
                <AdminHeader />
                <div className="container-fluid pt-4 px-4">
                    <h3 className="mb-2">Update home Slider</h3>
                    <div className="row g-4">
                        <div className="col-sm-12 col-xl-12">
                            <div className="bg-white rounded h-100 p-4">
                                <form className="row" encType="multipart/form-data" onSubmit={updateProductSubmitHandler} >
                                    <div className="mb-3 col-md-6">
                                        <div className="form-floating ">
                                            <input type="text" className="form-control" placeholder="xyz" required value={name} onChange={(e) => setName(e.target.value)} />
                                            <label >Slider Name</label>
                                        </div>
                                    </div>
                                   
                                    
                                   

                                    <div className="mb-3">
                                        <label htmlFor="formFileMultiple" className="form-label">Upload home Slider Images</label>

                                        <input className="form-control" type="file"  accept='images/*' required name="avtar" onChange={updateProductImagesChange} />
                                    </div>
                                    <div className="mb-3 d-flex align-items-center overflow-auto overflow-x-hidden">
                                        {oldImages && oldImages.map((image, index) => (
                                            <img key={index} src={image.url}  height="100" alt="product images" className='me-2 border' />
                                        ))}
                                    </div>
                                    <div className="mb-3 d-flex align-items-center overflow-auto overflow-x-hidden">
                                        {imagesPreview.map((image, index) => (
                                            <img key={index} src={image}  height="100" alt="product images" className='me-2 border' />
                                        ))}
                                    </div>
                                    
                                    <div className="mb-3 col-md-4">
                                        <button type="submit" className="btn btn-sm btn-success" disabled={loading ? true : false}>Update Slider</button>
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

export default UpdateSliderss