import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Swiper 스타일

const ClothesSwiper = ({ clothes }) => {
  return (
    <Swiper
      slidesPerView={3} // 한 번에 보여줄 슬라이드 수
      spaceBetween={10} // 슬라이드 사이의 간격
    >
      {clothes.map((item, index) => (
        <SwiperSlide key={index}>
          <img src={item.imgUrl} alt={item.name} style={{ width: '100%', height: 'auto' }} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ClothesSwiper;