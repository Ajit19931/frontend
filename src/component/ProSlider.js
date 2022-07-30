import React , { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation ,Thumbs } from "swiper";
import "swiper/css";


const ProSlider = ({ product }) => {

    const [activeThumb, setActiveThumb] = useState()
    
    return (
        <>
            <Swiper
                loop={true}
                spaceBetween={10}
                navigation={true}
                modules={[Navigation, Thumbs]}
                grabCursor={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  
                thumbs={{ swiper: activeThumb }}
                
                className="preview-slider"
            >

                {product.images && product.images.map((item, i) => (
                    <SwiperSlide key="{item}" >
                        <img src={item.url} alt="product" />
                    </SwiperSlide>
                ))}

            </Swiper>
            <Swiper
            onSwiper={setActiveThumb}
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            modules={[Navigation, Thumbs]}
            className='thumb-slider '
        >
            {product.images && product.images.map((item, i) => (
                    <SwiperSlide key="{item}" >
                        <img src={item.url} alt="product" />
                    </SwiperSlide>
                ))}
        </Swiper>
        </>
    )
}

export default ProSlider