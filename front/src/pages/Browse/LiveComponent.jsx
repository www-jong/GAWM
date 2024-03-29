import React from "react";
import EnterLive from "../Live/EnterLive/App";
import { useNavigate, useLocation } from "react-router-dom";

function getRelativeTime(from) {
  if (!(from instanceof Date) || isNaN(from)) {
    return "Invalid date";
  }

  const units = {
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000,
  };

  const formatter = new Intl.RelativeTimeFormat("ko", { style: "short" });
  const now = new Date();
  const elapsed = from.getTime() - now.getTime();

  for (const [unit, value] of Object.entries(units)) {
    if (Math.abs(elapsed) > value || unit === "second") {
      return formatter.format(Math.round(elapsed / value), unit);
    }
  }
}

function LiveComponent({ sessionId, image, title, createdDate, points, size, href }) {
  const appliedImg = "https://gwwmbucket.s3.ap-northeast-2.amazonaws.com/" + image;
  const navigate = useNavigate();

  const navigateToNewPage = () => {
    const appliedDate = getRelativeTime(createdDate);

    navigate("/enter", {
      state: {
        sessionId: sessionId,
        image: image,
        title: title,
        createdDate: appliedDate,
        points: points,
      },
    });
  };

  return (
    <div className="w-26 h-26 rounded-lg relative" onClick={navigateToNewPage}>
      <img className="w-full h-full object-cover rounded-lg" src={appliedImg} alt={title} />
      <div className="absolute bottom-0 left-0 right-0 h-9 bg-black opacity-70 rounded-b-lg leading-[0.5rem] px-0.5">
        <span className="inline-block text-sm text-white">{title}</span>
        <span className="inline-block text-[0.6rem] text-tertiary">
          {getRelativeTime(createdDate)} · {points} 포인트
        </span>
      </div>
    </div>

    // <EnterLive
    //   sessionId={sessionId}
    //   navigate={navigate}
    //   image={image}
    //   title={title}
    //   createdDate={getRelativeTime(createdDate)}
    //   points={points}
    // />
  );
}

export default LiveComponent;
