import React from "react";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import slide1 from "../assets/1.jpg";
import slide2 from "../assets/2.png";
import slide3 from "../assets/3.png";
import slide4 from "../assets/4.png";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
const Slider = () => {
  return (
    <div className="">
      <Swiper
        className="rounded-2xl z-0"
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        autoplay 
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <img src={slide1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          
          <img src={slide2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          
          <img src={slide3} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          
          <img src={slide4} alt="" />
        </SwiperSlide>
      </Swiper>
     
      {/* <div className="absolute top-1/2 right-1/2 translate-x-1/2 z-30">
      <h1 className="bg-gradient-to-r text-center from-blue to-green font-extrabold text-5xl text-green text-transparent bg-clip-text">
        Wrold First Class Hotel <br></br> Mangrove Hotel
      </h1>
    </div> */}

    </div>
    
  );
};

export default Slider;
