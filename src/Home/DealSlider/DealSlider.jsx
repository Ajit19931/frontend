import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { offerProducts } from '../../utils/constants';
import { getRandomProducts } from '../../utils/functions';
import { Link } from 'react-router-dom';




const DealSlider = ({title}) => {
    return (
        <>

            <section className="section newitem-part mt-4    mx-2 ">

            <div className="d-flex  justify-content-between align-items-center px-3">
                
            <h1 className="fs-5 text-dark mb-0">{title}</h1>
            <Link className="btn-sm btn-success text-white" to="/products">VIEW ALL</Link></div>
            <hr/>
                <div className="row m-0">
                    <Swiper
                       
                        centeredSlides={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        navigation={true}
                      
                        breakpoints={{
                            0: {
                                spaceBetween:5,
                              slidesPerView: 2,
                            },
                            768: {
                                spaceBetween:10,
                              slidesPerView: 2,
                            },
                            1200: {
                                spaceBetween:20,
                              slidesPerView: 6,
                            },
                          }}
                        modules={[Autoplay, Navigation]}
                        className="deal-slider"
                    >

                        {getRandomProducts(offerProducts, 12).map((item, index) => (
                            <SwiperSlide key={index} >

                               
                                    <div className="product-card"  >
                                        <div className="product-media1 items-center ">


                                            <Link className="deal-image"  to={"/products"}>
                                                <div className="dealimg">
                                                <img src={item.image} alt={item.name} />
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="product-content pb-2">

                                            <h6 className="product-name"><Link to="/products">{item.name}</Link></h6>

                                            <span className="text-primary text-sm">{item.offer}</span>
            <span className="text-gray-500 text-sm d-block">{item.tag}</span>


                                        </div>

                                    </div>
                               

                                {/* <img src={item.images[0].url} className="object-cover" alt="slider " /> */}
                            </SwiperSlide>
                        ))}

                    </Swiper>
                </div>
              
            </section>
        </>
    )
}

export default DealSlider