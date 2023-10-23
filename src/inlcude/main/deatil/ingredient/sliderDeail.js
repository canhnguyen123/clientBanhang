import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';

export default function App(props) {
  const { listImg } = props;
  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper slider-img-deatil"
      > {listImg.map((image, index) => (
        <SwiperSlide>
          <img src={image.link} />
       </SwiperSlide>
      ))}
      </Swiper>
    </>
  );
}
