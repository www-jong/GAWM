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
function LiveThumbnail({ className = "", image, title, createdDate, points, size, href }) {
    const appliedStyle = {"--image-url": `url(${image})`};
    const appliedClassName = `aspect-square flex flex-col-reverse rounded-lg ${className} ${size ? `size-${size}` : ""} bg-[image:var(--image-url)] bg-cover bg-center bg-no-repeat`;

    const element = (
        <div className="flex flex-col gap-1 h-9 bg-black/70 rounded-b-lg leading-[0.5rem] px-1">
            <span className="text-sm text-white truncate">{title}</span>
            <span className="text-[0.6rem] text-tertiary truncate">
                {getRelativeTime(createdDate)} · {points} 감 포인트
            </span>
        </div>
    );

    if("div" in arguments[0])
        return <div style={appliedStyle} className={appliedClassName}>{element}</div>
    else
        return <Link to={href} style={appliedStyle} className={appliedClassName}>{element}</Link>
}

export default LiveThumbnail;
