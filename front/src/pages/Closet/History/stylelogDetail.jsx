import { useEffect, useRef, useState } from "react";
import { CheckIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { fetchUserInfo, useUserStore } from "../../../stores/user";
import { getStyleLogDetails } from '../../../apis/stylelog'
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '@/components/Button/BackButton.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import moment from 'moment';
import 'swiper/css';
import 'swiper/css/effect-cards';
/**
 * 스타일로그 디테일페이지
 * 
 * - clothesId: 옷 ID
 * - clothesIdSetter: 뒤로가기 클릭 시 clothesId를 설정할 함수
 * - onDelete: 옷 삭제 시 실행할 함수
 * 
 * @returns 생성된 JSX component
 */
export default function stylelogDetail() {
	const { stylelogId } = useParams();
	const navigate = useNavigate();
	const [styleLogDetails, setStyleLogDetails] = useState(null);
	const { userId } = useUserStore((state) => ({ userId: state.user?.userId }));

	const [location, setLocation] = useState('');
	const [weather, setWeather] = useState('');
	const [temperature, setTemperature] = useState('');
	const [stylelogImg,setStylelogImg] = useState('');

	useEffect(() => {
		if (styleLogDetails) {
		  setLocation(styleLogDetails.location);
		  setWeather(styleLogDetails.weather);
		  setTemperature(styleLogDetails.temperature);
		  setStylelogImg(styleLogDetails.stylelogImg)
		  console.log(styleLogDetails)
		  console.log("장소 :",location)
		}
	  }, [styleLogDetails]); 
	useEffect(() => {
		console.log(stylelogId)
		const fetchStyleLogDetails = async () => {
			try {
				const response = await getStyleLogDetails(stylelogId);
				console.log(response)
				if (response.status === 200) {
					setStyleLogDetails(response.data.data);

				}
			} catch (error) {
				console.error('Error fetching style log details:', error);
			}
		};

		if (stylelogId) {
			fetchStyleLogDetails();
			console.log(styleLogDetails)
		}
	}, [stylelogId]);

	if (!styleLogDetails) {
		return <div>Loading...</div>;
	}

	const handleBack = () => {
		navigate(-1); // 또는 navigate('/some/path')로 특정 경로로 이동
	};
	const handleEdit = () => {
		// clotheset 데이터 준비
		const clotheset = styleLogDetails.clothesDetails.map(clothe => ({
		  clothesId: clothe.clothesInfoResponse.clothesId,
		  x: clothe.x,
		  y: clothe.y,
		  rotate: clothe.rotate,
		  size: clothe.size
		}));
	  console.log(clotheset)
	  console.log(styleLogDetails.date)
		// 수정 페이지로 네비게이션하면서 필요한 데이터 전달
		navigate('/closet/stylelog-edit', {
		  state: {
			stylelogId: styleLogDetails.stylelogId,
			imageUrl: `${import.meta.env.VITE_CLOTHES_BASE_URL}/${styleLogDetails.stylelogImg}`,
			location: location,
			weather: weather,
			temperature: temperature,
			clotheset: clotheset, // clotheset 데이터도 전달
			date:styleLogDetails.date
		  }
		});
	  };


	const handleLocationChange = (e) => {
		setLocation(e.target.value);
	  };
	  
	  const handleWeatherChange = (e) => {
		setWeather(e.target.value);
	  };
	  
	  const handleTemperatureChange = (e) => {
		setTemperature(e.target.value);
	  };


	return (
		<div className="flex flex-col font-pretendard">
			{/* 상단바 영역 */}
			<div className="flex flex-row items-center align-middle justify-between p-4">
				<BackButton />
				<div>
					<p className="text-lg font-semibold">{styleLogDetails.date ? moment(styleLogDetails.date).format('YYYY년 M월 D일') : '날짜 불명'}</p>
				</div>
				<div>
				<button className="text-main font-semibold" onClick={handleEdit}>
    수정
  </button>
				</div>
			</div>

			{/* 이미지 영역 */}
			<div className="w-full h-96 bg-gray-200 flex justify-center items-center">
				<img src={`${import.meta.env.VITE_CLOTHES_BASE_URL}/${styleLogDetails.stylelogImg}`} alt="스타일로그 이미지" />
			</div>



			{/* 장소 */}

  {/* 장소 정보 표시 */}
  <div className="mx-3 my-3">
            <p className="text-lg font-semibold my-2">장소 : {location}</p>
        </div>

        {/* 날씨 정보 표시 */}
        <div className="mx-3 my-3">
            <p className="text-lg font-semibold my-2">날씨 : {weather}</p>
        </div>

        {/* 온도 정보 표시 */}
        <div className="mx-3 my-3">
            <p className="text-lg font-semibold my-2 mt-4">온도 : {temperature}°C</p>
        </div>

			      {/* 옷들의 이미지들을 세로로 슬라이드 가능하게 표시 */}
				  <div className="my-5">
        <Swiper
          slidesPerView={3} // 한 페이지에 3개의 슬라이드를 보여줍니다.
          spaceBetween={10} // 슬라이드 사이의 간격
          //centeredSlides={true} // 활성 슬라이드가 중앙에 위치
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {styleLogDetails.clothesDetails.map((clothe, index) => (
            <SwiperSlide key={index}>
              <img
                src={`${import.meta.env.VITE_CLOTHES_BASE_URL}/${clothe.clothesInfoResponse.clothesImg}`}
                alt={`옷 이미지 ${index}`}
                style={{ width: "100%", objectFit: "cover" }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
		</div>
	);
}
