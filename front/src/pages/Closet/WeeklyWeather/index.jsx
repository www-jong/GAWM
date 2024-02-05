import { MapPinIcon } from "@heroicons/react/16/solid";
import DailyWeather from "./DailyWeather";

/**
 * 한 주의 날씨를 표현하는 component입니다
 * 
 * @returns 주간 날씨 component
 */
export default function WeeklyWeather() {
	return (
		<div className="flex flex-col gap-2">
			<div className="flex justify-start items-center gap-2">
				<MapPinIcon className="text-main h-4" />
				<span>
					{ "강서구 녹산동" /* 테스트 코드 */ }
				</span>
			</div>
			<div className="flex flex-nowrap gap-2.5 scroll-pl-2.5 pr-2.5 snap-x overflow-x-auto">
				{
					// 테스트 코드
					[0, 1, 2, 3, 4, 5].map(
						(offset) => {
							const day = new Date();
							day.setDate(day.getDate() + offset);

							return <DailyWeather
								date={day}
								minTemp={-2}
								maxTemp={6}
								weatherIcon="https://openweathermap.org/img/wn/10d@2x.png"
								outfitSummary={offset === 1 ? (<div></div>) : undefined}
								key={`${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`}
							/>
						}
					)
				}
			</div>
		</div>
	);
}
