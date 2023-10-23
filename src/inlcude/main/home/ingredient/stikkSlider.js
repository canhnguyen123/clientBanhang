import React, { useState, useEffect } from 'react';
import { Virtual, Navigation, Pagination } from 'swiper/modules';
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
        modules={[Virtual, Navigation]}
        onSwiper={setSwiperRef}
        slidesPerView={3}
        centeredSlides={false}
        spaceBetween={30}
        navigation={true}
        initialSlide={0}
        virtual
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
