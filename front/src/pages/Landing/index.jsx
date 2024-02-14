import SocialKakao from './SocialKakao.jsx';
import SocialGoogle from './SocialGoogle.jsx';
import landImage1 from '@/assets/images/LandingPage_1.svg';
import landImage2 from '../../assets/images/LandingPage_2.svg';
import landImage3 from '../../assets/images/LandingPage_3.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import './index.css';

import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay, Pagination } from 'swiper/modules';


export default function Landing() {
    return (
        <div className="h-screen">
            <div className="flex justify-center items-center" style={{ height: '70vh' }} >
                <Swiper autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }} pagination={{
                    clickable: true,
                }} modules={[Autoplay, Pagination]} className="mySwiper">
                    <SwiperSlide><img src={landImage1} alt="랜딩이미지1" /></SwiperSlide>
                    <SwiperSlide><img src={landImage2} alt="랜딩이미지2" /></SwiperSlide>
                    <SwiperSlide><img src={landImage3} alt="랜딩이미지3" /></SwiperSlide>
                </Swiper>
            </div>
            <div className="flex flex-col justify-center items-center gap-4" style={{ height: '30vh' }} >
                <SocialKakao />
                <SocialGoogle />
            </div>
        </div>
    );
}