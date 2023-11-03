import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination,Autoplay } from 'swiper/modules';

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
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[EffectFade, Navigation, Pagination,Autoplay]}
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
