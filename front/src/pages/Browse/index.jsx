import React, { useState, useEffect } from "react";
import axios from "axios";
import logoImage from "../../assets/images/HomeLogo.svg";
import LiveImg from "./LiveImg.png";
import TodayLookComponent from "./TodayLookComponent.jsx";
import AllLookComponent from "./AllLookComponent.jsx";
import LiveComponent from "./LiveComponent.jsx";
import { get_top_list, fetchLookbooks } from "../../apis/lookbook";
import { gawmApiAxios } from "../../utilities/http-commons";
import { fetchUserInfo, useUserStore } from "../../stores/user.js";
import Gawm from "../../assets/Gawm.svg";
const gawmapiAxios = gawmApiAxios();
export default function Browse() {
  const [todayLooks, setTodayLooks] = useState([]);
  const [allLooks, setAllLooks] = useState([]);

  const [liveRooms, setLiveRooms] = useState([]);
  const user = useUserStore();

  //유저 정보
  useEffect(() => {
    fetchUserInfo();
  }, []);
  console.log(user.user.nickname);

  useEffect(() => {
    const fetchTodayLooks = async () => {
      try {
        const response = await get_top_list();
        setTodayLooks(response.data.content);
      } catch (error) {
        console.error("Today Looks 데이터를 불러오는데 실패했습니다.", error);
      }
    };

    fetchTodayLooks();
  }, []);

  useEffect(() => {
    const fetchLiveRooms = async () => {
      try {
        const response = await gawmapiAxios.get("/live-room/list");
        console.log(response);
        setLiveRooms(response.data.content);
      } catch (error) {
        console.error("Live Rooms 데이터를 불러오는데 실패했습니다.", error);
      }
    };
    fetchLiveRooms();
  }, []);

  //내감어때 모든데이터
  useEffect(() => {
    const fetchAllLooks = async () => {
      try {
        const response = await fetchLookbooks({ page: 0, size: 10, sort: "createdAt,desc" });
        console.log("모든내감어떄", response);
        const filteredLooks = response.data.content.filter((look) => look.isPublic === true);

        setAllLooks(filteredLooks);
      } catch (error) {
        console.error("Today Looks 데이터를 불러오는데 실패했습니다.", error);
      }
    };

    fetchAllLooks();
  }, []);

  const Header = () => {
    return (
      <div className="fixed mt-1.5 ml-2.5">
        <img src={logoImage} alt="Logo" className="w-auto display: block" />
      </div>
    );
  };

  const TodayLookSection = ({ title }) => {
    return (
      <div className="today-look-section mt-4">
        <h2 className="h2-nps">{title}</h2>
        <div className="grid grid-cols-2 gap-4 px-4">
          {todayLooks?.slice(0, 2).map((look) => (
            <TodayLookComponent
              key={look.lookbook_id}
              lookImage={look.lookbook_img}
              userId={look.user_id}
              profileImage={
                look.profile_img
                  ? import.meta.env.VITE_CLOTHES_BASE_URL + "/" + look.profile_img
                  : Gawm
              }
            />
          ))}
        </div>
      </div>
    );
  };

  const AllLookSection = ({ title }) => {
    return (
      <div className="today-look-section mt-4">
        <h2 className="h2-nps">{title}</h2>
        <div className="grid grid-cols-2 gap-4 px-4">
          {allLooks?.map((look) => (
            <AllLookComponent
              key={look.lookbookId}
              lookbookId={look.lookbookId}
              lookImage={import.meta.env.VITE_CLOTHES_BASE_URL + "/" + look.images[0]}
              userId={look.userNickname}
              profileImage={
                look.userProfileImg
                  ? import.meta.env.VITE_CLOTHES_BASE_URL + "/" + look.userProfileImg
                  : Gawm
              }
            />
          ))}
        </div>
      </div>
    );
  };

  const LiveSection = ({ title }) => {
    return (
      <div className="live-section mt-4">
        <div className="flex items-center">
          <h2 className="h2-nps">{title}</h2>
          <img src={LiveImg} alt="Live" className="ml-2 w-10 h-6" />
        </div>

        <div className="flex gap-2 mt-1 justify-center">
          {liveRooms.map((room) => (
            <LiveComponent
              key={room.liveId}
              sessionId={room.session}
              image={room.profileImg}
              title={room.name}
              createdDate={new Date(room.createdAt)}
              points={room.point}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 mt-9">
        <TodayLookSection title="오늘의 감각" />
        <LiveSection title="26˚C 라이브" />
        <AllLookSection title="내감어때" />
      </div>
    </div>
  );
}
