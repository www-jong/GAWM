/**
 * 하루의 날씨를 간략하게 표현하는 component입니다
 * 
 * - date: 표시할 날의 Date 객체
 * - minTemp: 표시할 날의 최저기온 (°C)
 * - maxTemp: 표시할 날의 최고기온 (°C)
 * - weatherIcon: 날씨를 표현하는 이미지 링크
 * - outfitSummary: 해당 날짜에 착용한 옷을 표현하는 JSX component
 * 
 * @returns 일간 날씨 component
 */
export default function DailyWeather({ date, minTemp, maxTemp, weatherIcon, outfitSummary }) {
	// "월", "화" 등 요일을 표시하는 formatter
	const weekdayFormatter = Intl.DateTimeFormat(
		"ko",
		{ "weekday": "short" }
	);
	// "1월 2일" 등 날짜를 표시하는 formatter
	const dayFormatter = Intl.DateTimeFormat(
		"ko",
		{ "month": "long", "day": "numeric" }
	);

	return (
		<div className="basis-52 shrink-0 flex flex-row items-center gap-1 bg-[#e8e5e5] pl-2.5 p-1.5 rounded-lg whitespace-nowrap">
			<div className="flex flex-col gap-1 shrink-0">
				<div className="flex flex-row gap-1">
					<strong>{weekdayFormatter.format(date)}</strong>
					<span>{dayFormatter.format(date)}</span>
				</div>
				<div className="flex flex-row gap-2">
					<strong>{minTemp} / {maxTemp}&deg;C</strong>
				</div>
			</div>
			<div className={`flex flex-row grow self-stretch ${outfitSummary ? "justify-start" : "justify-end"}`}>
				<img className="size-12 self-end" src={weatherIcon} />
			</div>
			{
				outfitSummary ? (
					<div className="justify-self-end self-stretch aspect-square shrink-0 bg-[#efefef] rounded-lg ml-2"></div>
				) : ""
			}
		</div>
	);
}
