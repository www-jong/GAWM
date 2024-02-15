import { MapPinIcon } from "@heroicons/react/16/solid";
import DailyWeather from "./DailyWeather";
import React, { useEffect, useState } from 'react';
export default function WeeklyWeather() {
    const [weeklyWeather, setWeeklyWeather] = useState([]);
    const [location, setLocation] = useState("강서구 녹산동"); // 가정

	async function reverseGeocodeOSM(latitude, longitude) {
		const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
	  
		try {
		  const response = await fetch(url);
		  const data = await response.json();
		  if (data.address) {
			// 일부 주요 정보만 추출
			const addressParts = [data.address.city, data.address.borough,data.address.quarter].filter(Boolean);
			console.log(data.address)
			const address = addressParts.join(", ");
			return address;
		  }
		} catch (error) {
		  console.error("Geocoding error:", error);
		}
	  }
	  
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
			reverseGeocodeOSM(latitude, longitude).then(address => setLocation(address));
            const API_KEY = import.meta.env.VITE_WEATHER_API;
            const apiUrl = `https://api.openweathermap.org/data/2.8/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&units=metric&appid=${API_KEY}`;

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                setWeeklyWeather(data.daily);
            } catch (error) {
                console.error("Failed to fetch weather data:", error);
            }
        });
    }, []);

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-start items-center gap-2">
                {/* MapPinIcon 여기서는 직접적으로 표시하지 않음 */}
                <span>{location}</span>
            </div>
            <div className="flex flex-nowrap gap-2.5 scroll-pl-2.5 pr-2.5 snap-x overflow-x-auto">
                {weeklyWeather.slice(0, 5).map((weather, index) => {
                    const day = new Date(weather.dt * 1000);
                    return <DailyWeather
                        date={day}
						minTemp={Math.round(weather.temp.min)}
						maxTemp={Math.round(weather.temp.max)}
                        weatherIcon={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        outfitSummary={undefined}
                        key={index}
                    />
                })}
            </div>
        </div>
    );
}