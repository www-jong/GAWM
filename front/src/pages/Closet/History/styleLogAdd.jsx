import React, { useEffect, useState } from 'react';
import BackButton from '@/components/Button/BackButton.jsx';
import { createStyleLog } from '@/apis/stylelog.js';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
export default function styleLogAdd() {

    const { state } = useLocation();
    const navigate = useNavigate();
    const { date, imageBlob, clotheset  } = state;

    const [weatherData, setWeatherData] = useState(null);
    const [locationInput, setLocationInput] = useState('');
    const [weatherInput, setWeatherInput] = useState('');
    const [temperatureInput, setTemperatureInput] = useState('');

    const [imageURL, setImageURL] = useState('');
  useEffect(() => {
    if (imageBlob) {
      const url = URL.createObjectURL(imageBlob);
      setImageURL(url);
      return () => URL.revokeObjectURL(url); // 컴포넌트 언마운트 시 URL 해제
    }
  }, [imageBlob]);

    const handleSave = async () => {
        const formData = new FormData();
        const data = {
            date: date,
            location: locationInput,
            weather: weatherInput,
            temperature: temperatureInput,
            clotheset: clotheset
          };
    
          formData.append('image', imageBlob, 'image.png'); // Blob 형태의 이미지 데이터
          formData.append('data', JSON.stringify(data)); // 나머지 데이터를 문자열로 변환하여 추가
    
        try {
            await createStyleLog(formData);
            console.log("스타일로그가 등록 성공.");
            navigate('/closet');  // 스타일로그 id별 페이지가 따로 있으면 좋을텐데
        } catch (error) {
            console.error("스타일로그 등록 중 오류 발생:", error);
        }
    };

    const handleLocationChange = (e) => {
        setLocationInput(e.target.value);
    };
    const handleWeatherChange = (e) => {
        setWeatherInput(e.target.value);
    };
    const handleTemperatureChange = (e) => {
        setTemperatureInput(e.target.value);
    };
    return (
        <div className="flex flex-col font-pretendard">
            {/* 상단바 영역 */}
            <div className="flex flex-row items-center align-middle justify-between p-4">
                <BackButton />
                <div>
                    <p className="text-lg font-semibold">{date ? moment(date).format('YYYY년 M월 D일') : '날짜 불명'}</p>
                </div>
                <div>
                    <button
                        className="text-main font-semibold"
                        onClick={handleSave}
                    >
                        완료
                    </button>
                </div>
            </div>

            {/* 이미지 영역 */}
            <div className="w-full h-96 bg-gray-200 flex justify-center items-center">
            {imageURL ? <img src={imageURL} alt="스타일로그 이미지" /> : <p className="text-gray-500">캔버스이미지</p>}
            </div>

            {/* 날씨 */}
            {weatherData && (
                <div className="mx-3 my-3">
                    <p className="text-lg font-semibold my-2 mt-4">
                        날씨: {weatherData.weather[0].main} ({weatherData.weather[0].description})
                    </p>
                    <p>온도: {weatherData.main.temp}°C</p>
                    <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="날씨이미지" />
                </div>
            )}

            {/* 장소 */}
            <div className="mx-3 my-3">
                <p className="text-lg font-semibold my-2 mt-4">장소</p>
                <input
                    type="text"
                    value={locationInput}
                    onChange={handleLocationChange}
                    placeholder="장소를 입력하세요"
                    className="border border-gray-300 p-2 rounded-md w-full"
                />
            </div>
            <div className="mx-3 my-3">
                <p className="text-lg font-semibold my-2 mt-4">날씨</p>
                <input
                    type="text"
                    value={weatherInput}
                    onChange={handleWeatherChange}
                    placeholder="날씨를 입력하세요"
                    className="border border-gray-300 p-2 rounded-md w-full"
                />
            </div>
            <div className="mx-3 my-3">
                <p className="text-lg font-semibold my-2 mt-4">온도</p>
                <input
                    type="text"
                    value={temperatureInput}
                    onChange={handleTemperatureChange}
                    placeholder="온도를 입력하세요"
                    className="border border-gray-300 p-2 rounded-md w-full"
                />
            </div>
        </div>
    );
}