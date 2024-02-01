import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logoImage from '../../assets/images/HomeLogo.svg';
import LiveImg from './LiveImg.png';
import TodayLookComponent from './TodayLookComponent.jsx';
import LiveComponent from './LiveComponent.jsx';


export default function Browse() {
    const [todayLooks, setTodayLooks] = useState([]);

    useEffect(() => {
        const fetchTodayLooks = async () => {
            try {
                const response = await axios.get('https://ssafyfood-www-jong.koyeb.app/webapp/look-book/top_list/');
                setTodayLooks(response.data.content);
            } catch (error) {
                console.error('Today Looks 데이터를 불러오는데 실패했습니다.', error);
            }
        };

        fetchTodayLooks();
    }, []);


    const Header = () => {
        return (
            <div className="fixed mt-1.5 ml-2.5">
                <img src={logoImage} alt="Logo" className="w-auto display: block" />
            </div>
        );
    }

    const TodayLookSection = ({ title }) => {
        return (
            <div className="today-look-section mt-4">
                <h2 className="h2-nps">{title}</h2>
                <div className="grid grid-cols-2 gap-4 px-4">
                    {todayLooks.slice(0, 2).map((look) => (
                        <TodayLookComponent
                            key={look.lookbook_id}
                            lookImage={look.lookbook_img}
                            userId={look.user_id}
                            profileImage={look.profile_img}
                        />
                    ))}
                </div>
            </div>
        );
    };


    const LiveSection = ({ title }) => {
        return (
            <div className="live-section mt-4">
                <div className="flex">
                <h2 className="h2-nps inline-block">{title}</h2>
                <img src={LiveImg} alt="Live" className="w-8 h-5 inline-block" />
                </div>

                <div className="flex gap-2 mt-1 justify-center">
                    <LiveComponent />
                    <LiveComponent />
                    <LiveComponent />
                </div>

                <div className="flex gap-2 mt-2 justify-center">
                    <LiveComponent />
                    <LiveComponent />
                    <LiveComponent />
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
                <TodayLookSection title="내감어때" />
            </div>
        </div>
    );
}
