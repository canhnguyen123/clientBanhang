import React, { useState, useEffect } from 'react';
import { Virtual, Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ItemBoxTheLoai from '../../../component/itemBoxTheLoai';
import axios from 'axios';

export default function App() {
  const [swiperRef, setSwiperRef] = useState(null);
  const [images, setImages] = useState([]);
  const [totalSlides, setTotalSlides] = useState(0);

  useEffect(() => {
    const apiUrl = 'http://localhost:4000/theloai/';

    axios
      .get(apiUrl)
      .then(response => {
        if (response.data.results) {
          setImages(response.data.results);
          setTotalSlides(response.data.results.length);
        }
      })
      .catch(error => console.error('Error fetching images:', error));

  }, []);

  return (
    <div className='mg-50'>
      <div className='titel-session flex_center'><h4>Các thể loại bán chạy</h4></div>
      <Swiper
        modules={[Virtual, Navigation, Autoplay]}  
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          960: {
            spaceBetween: 12,
            slidesPerView: 3,
          },
          0: {
            slidesPerView: 1,
            spaceBetween: 12,
          },
        }}
  
        
       
        navigation={true}
        
        
      >
        {images.map((image, index) => (
          <SwiperSlide key={image.id} virtualIndex={index}>
            <ItemBoxTheLoai
              linkImg={image.linkImg}
              id={image.id}
              titel={image.name}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
