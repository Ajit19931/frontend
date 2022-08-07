import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs } from "swiper";
import "swiper/css";
import ReactImageMagnify from 'react-image-magnify';
import "../../src/assets/css/privacy.css"


const ProSlider = ({ product }) => {

    const rows = [];
  
    product.images && product.images.forEach((item) => {
      rows.push({
      
        image: item.url,
  
      });
    });

    const [img, setImg] = useState(rows[0]);

    // const hoverHandler = (image, i) => {
    //     setImg(image);
    //     refs.current[i].classList.add('active');
    //     for (var j = 0; j < product.images.length; j++) {
    //         if (i !== j) {
    //             refs.current[j].classList.remove('active');
    //         }
    //     }
    // };
    // const refs = useRef([]);
    // refs.current = [];
    // const addRefs = (el) => {
    //     if (el && !refs.current.includes(el)) {
    //         refs.current.push(el);
    //     }
    // };

    const [activeThumb, setActiveThumb] = useState("")

    return (
        <>

{/* <img src="rows[0]" /> */}
            <div >
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

                    {product.images && product.images.map((item, index) => (
                        <SwiperSlide key={index} >
                            <img src={item.url} alt="product" />
                        </SwiperSlide>
                    ))}

                </Swiper>
                <Swiper
                    onSwiper={setActiveThumb}
                    loop={true}
                    spaceBetween={10}
                    slidesPerView={6}
                    modules={[Navigation, Thumbs]}
                    className='thumb-slider '
                >
                    {product.images && product.images.map((item, index) => (
                        <SwiperSlide key={index} >
                            <img src={item.url} alt="product" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="left d-none">
                <div className="left_1">
                    {product.images && product.images.map((image, index) => (
                        <div
                            className={index === 0 ? 'img_wrap active' : 'img_wrap'}

                            key={index}
                            onClick={() => setImg(image.url)}

                        >
                            <img src={image.url} alt="" />
                        </div>
                    ))}
                </div>
                {/* <img src={product.images[0].url} alt="" /> */}

                <div className="left_2">
                    <ReactImageMagnify
                        {...{
                            smallImage: {
                                alt: 'Wristwatch by Ted Baker London',
                                isFluidWidth: true,
                                
                                src: img,
                            },
                            largeImage: {
                                src: img,
                                width: 1200,
                                height: 1800,
                            },
                            enlargedImageContainerDimensions: {
                                width: '150%',
                                height: '150%',
                            },
                            isHintEnabled: true,
                            shouldHideHintAfterFirstActivation: false
                        }}
                    />
                </div>
            </div>
        </>
    )
}

export default ProSlider