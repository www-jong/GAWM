import React, { useEffect, useState } from 'react';
import BackButton from '@/components/Button/BackButton.jsx';
import { createStyleLog } from '@/apis/stylelog.js';
import { useLocation, useNavigate } from 'react-router-dom';
import {updateStyleLog} from '../../../apis/stylelog';

export default function StyleLogEdit() {
    const location = useLocation();
    const navigate = useNavigate();
    const { stylelogId, imageUrl, location: initialLocation, weather: initialWeather, temperature: initialTemperature, clotheset,date } = location.state;

    const [locationInput, setLocationInput] = useState(initialLocation);
    const [weatherInput, setWeatherInput] = useState(initialWeather);
    const [temperatureInput, setTemperatureInput] = useState(initialTemperature);
    const [imageURL, setImageURL] = useState(imageUrl);
    const [dateV,setDate] = useState(date);
    const handleSave = async () => {
        console.log(dateV)
        const data = {
            stylelogId,
            stylelogImg:imageUrl,
            date:dateV,
            location: locationInput,
            weather: weatherInput,
            temperature: temperatureInput,
            clotheset // 수정된 clotheset 데이터도 포함
          };
        console.log(data)
      try {
        const response = await updateStyleLog(stylelogId, data); // 스타일로그 업데이트 API 호출
        console.log("스타일로그 업데이트 성공.",response);
        navigate('/closet'); // 업데이트 성공 후, 사용자를 클로젯 페이지로 리디렉션
      } catch (error) {
        console.error("스타일로그 업데이트 중 오류 발생:", error);
      }
    };
  
    // 핸들러 함수들
    const handleLocationChange = (e) => setLocationInput(e.target.value);
    const handleWeatherChange = (e) => setWeatherInput(e.target.value);
    const handleTemperatureChange = (e) => setTemperatureInput(e.target.value);
    
    return (
        <div className="flex flex-col font-pretendard">
          <div className="flex flex-row items-center align-middle justify-between p-4">
            <BackButton onClick={() => navigate(-1)} />
            <div><p className="text-lg font-semibold">스타일로그 수정</p></div>
            <button className="text-main font-semibold" onClick={handleSave}>저장</button>
          </div>
    
          <div className="w-full h-96 bg-gray-200 flex justify-center items-center">
            {imageURL ? <img src={imageURL} alt="스타일로그 이미지" /> : <p className="text-gray-500">이미지 로딩 중...</p>}
          </div>
    
          <div className="mx-3 my-3">
            <p className="text-lg font-semibold my-2 mt-4">장소</p>
            <input type="text" value={locationInput} onChange={handleLocationChange} className="border border-gray-300 p-2 rounded-md w-full" />
          </div>
    
          <div className="mx-3 my-3">
            <p className="text-lg font-semibold my-2 mt-4">날씨</p>
            <input type="text" value={weatherInput} onChange={handleWeatherChange} className="border border-gray-300 p-2 rounded-md w-full" />
          </div>
    
          <div className="mx-3 my-3">
            <p className="text-lg font-semibold my-2 mt-4">온도</p>
            <input type="text" value={temperatureInput} onChange={handleTemperatureChange} className="border border-gray-300 p-2 rounded-md w-full" />
          </div>
        </div>
    );
}