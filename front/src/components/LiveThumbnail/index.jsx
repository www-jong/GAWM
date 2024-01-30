function getRelativeTime(from) {
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

function LiveThumbnail({ image, title, createdDate, points }) {
    return (
        <div className="size-32 rounded-lg relative">
            <img className="size-32 object-cover rounded-lg" src={image} />
            <div className="absolute bottom-0 left-0 right-0 h-9 bg-black opacity-70 rounded-b-lg leading-[0.5rem] px-0.5">
                <span className="inline-block text-sm text-white">{title}</span>
                <span className="inline-block text-[0.6rem] text-tertiary">
                    {getRelativeTime(createdDate)} · {points} 감 포인트
                </span>
            </div>
        </div>
    );
}

export default LiveThumbnail;
