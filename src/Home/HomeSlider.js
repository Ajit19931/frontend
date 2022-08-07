import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getHomeSlider } from '../actions/homeSliderActions';
import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";


const HomeSlider = () => {

  const dispatch = useDispatch();

  const { error, slider } = useSelector((state) => state.slider);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(getHomeSlider());
  }, [dispatch, error,]);


  return (
    <>


      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        className="home-slider"
      >

        {slider && slider.map((item, index) => (
          <SwiperSlide key={index} >
            <img src={item.images[0].url} className="object-cover" alt="slider " />
          </SwiperSlide>
        ))}

      </Swiper>
    </>
  )
}

export default HomeSlider