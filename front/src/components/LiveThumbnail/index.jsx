import { Link } from "react-router-dom";

/**
 * 현재 시각으로부터 상대적인 시간을 포맷하여 반환합니다
 * 
 * @param from 상대적 시간을 비교할 Date 객체
 * @returns 상대적인 시간을 표현하는 string
 */
function getRelativeTime(from) {
    // Date값 예외처리
    if (!(from instanceof Date) || isNaN(from)) {
        return 'Invalid date';
    }

    const units = {
        "day": 24 * 60 * 60 * 1000,
        "hour": 60 * 60 * 1000,
        "minute": 60 * 1000,
        "second": 1000
    }

    const formatter = new Intl.RelativeTimeFormat(
        "ko",
        { style: "short" }
    );
    const elapsed = from - new Date();

    for(const [unit, value] of Object.entries(units)) {
        if(Math.abs(elapsed) > value || unit === "second")
            return formatter.format(Math.round(elapsed / value), unit);
    }
}

/**
 * 한 라이브 방송을 표시하는 component를 생성합니다
 * 
 * - className: 내부 요소에 적용할 className
 * - title: 라이브 방송의 제목
 * - createdDate: 라이브 방송이 생성된 시각의 Date 객체
 * - points: 라이브 방송을 진행하는 사용자의 감 포인트
 * - size: Tailwind CSS의 size- 클래스에 적용될 정수
 * - div: 속성 존재 시 <Link> 대신 <div> 생성
 * - href: <Link>의 to 속성
 * 
 * @returns 생성된 JSX component
 */
function LiveThumbnail({ image, title, createdDate, points, size, href }) {
    const appliedStyle = "https://gwwmbucket.s3.ap-northeast-2.amazonaws.com/" + image;
    return (
        <div className="w-26 h-26 rounded-lg relative">
            <img className="w-full h-full object-cover rounded-lg" src={appliedStyle} alt={title} />
            <div className="absolute bottom-0 left-0 right-0 h-9 bg-black opacity-70 rounded-b-lg leading-[0.5rem] px-0.5">
                <span className="inline-block text-sm text-white">{title}</span>
                <span className="inline-block text-[0.6rem] text-tertiary">
                    {getRelativeTime(createdDate)} · {points} 포인트
                </span>
            </div>
        </div>
    );
}

export default LiveThumbnail;
