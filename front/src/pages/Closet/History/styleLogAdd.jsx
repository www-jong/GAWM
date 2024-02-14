import React, { useEffect, useState } from 'react';
import BackButton from '@/components/Button/BackButton.jsx';
import { createStyleLog } from '@/apis/stylelog.js';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function styleLogAdd() {
    const location = useLocation();
    const navigate = useNavigate();
    const { date } = location.state || {};

    const [weatherData, setWeatherData] = useState(null);
    const [locationInput, setLocationInput] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const lat = 35.09;
            const lon = 128.85;
            const lang = 'kr';
            const apiKey = import.meta.env.VITE_WEATHER_API;

            const { data } = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=kr&units=metric`
            );
            setWeatherData(data);
        };
        fetchData();
    }, []);

    const handleSave = async () => {
        const formData = new FormData();

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

    return (
        <div className="flex flex-col font-pretendard">
            {/* 상단바 영역 */}
            <div className="flex flex-row items-center align-middle justify-between p-4">
                <BackButton />
                <div>
                    <p className="text-lg font-semibold">{date ? date : '날짜 불명'}</p>
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
            <div className="w-full h-80 bg-gray-200 flex justify-center items-center">
                <p className="text-gray-500">캔버스이미지</p>
            </div>

            {/* 날씨 */}
            {weatherData && (
                <div className="mx-3 my-3">
                    <p className="text-lg font-semibold my-2 mt-4">
                        날씨: {weatherData.weather[0].main} ({weatherData.weather[0].description})
                    </p>
                    <p>온도: {weatherData.main.temp}°C</p>
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
        </div>
    );
}