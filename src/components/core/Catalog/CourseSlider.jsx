import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import Course_Card from './Course_Card'

const CourseSlider = ({courses}) => {
  return (
    <div>
      {courses.length > 0 ? (
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          breakpoints={{
                1024:{slidesPerView:3}
          }}
        >
          {courses.map((course, index) => (
            <SwiperSlide key={index}>
              <Course_Card course={course} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>No Course Found</p>
      )}
    </div>
  );
}

export default CourseSlider