import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logoImage from '../../assets/images/HomeLogo.svg';
import LiveImg from './LiveImg.png';

export default function Browse() {
    const Header = () => {
        return (
            <div className="fixed mt-1.5 ml-2.5">
                <img src={logoImage} alt="Logo" className="w-auto" />
            </div>
        );
    }

    const TodayLookSection = ({ title }) => {
        return (
            <div className="today-look-section mt-4">
                <h2 className="h2-nps">{title}</h2>
                <div className="grid grid-cols-2 gap-4">
                    <TodayLookComponent lookImage="path_to_look_image_1.jpg" userId="user_id_1" />
                    <TodayLookComponent lookImage="path_to_look_image_2.jpg" userId="user_id_2" />
                </div>
            </div>
        );
    };
    
    const TodayLookComponent = ({ lookImage, userId }) => {
        return (
            <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
                <img className="w-full h-60 object-cover rounded-lg" src={lookImage} alt="Lookbook" />
                <div className="flex items-center mt-2">
                    <img className="w-10 h-10 object-cover rounded-full border-2 border-gray-300" src={`path_to_profile_images/${userId}.jpg`} alt={userId} />
                    <span className="ml-2 text-sm font-semibold">{userId}</span>
                </div>
            </div>
        );
    };

    const LiveSection = ({ title }) => {
        return (
            <div className="live-section">
                <h2 className="h2-nps">{title}</h2>

                <div className="grid grid-cols-3 gap-8 justify-center">
                    <LiveComponent />
                    <LiveComponent />
                    <LiveComponent />
                </div>

                <div className="grid grid-cols-3 gap-8 justify-center">
                    <LiveComponent />
                    <LiveComponent />
                    <LiveComponent />
                </div>
            </div>
        );
    };

    function getRelativeTime(from) {
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

    const LiveComponent = ({ image, title, createdDate, points }) => {
        return (
            <div className="size-28 rounded-lg relative">
            <img className="size-28 object-cover rounded-lg" src={image} />
            <div className="absolute bottom-0 left-0 right-0 h-9 bg-black opacity-70 rounded-b-lg leading-[0.5rem] px-0.5">
                <span className="inline-block text-sm text-white">{title}</span>
                <span className="inline-block text-[0.6rem] text-tertiary">
                    {getRelativeTime(createdDate)} · {points} 감 포인트
                </span>
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
