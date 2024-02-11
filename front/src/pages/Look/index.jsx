import LookTest from "./LookTest.json"
import Backbutton from '@/components/Button/BackButton.jsx';
import React, { useState } from 'react';
import Mascot from '@/assets/images/Mascot.svg';
import LookTestImg from './LookTestImg2.png';


export default function Look() {
    // const [comment, setComment] = useState(false);

    const { lookbookId, userId, userNickname, userProfileImg, createdAt, clothes, lookbookImgs, likeCnt, view, tag, comment, liked, bookmarked, followed } = LookTest.data;

    return (
        <div className="mx-auto">
            <Backbutton />
            <div className="h-full relative ">

                <div className="flex justify-between items-center px-3 py-4 mt-2">
                    <div className="relative mt-1 flex">
                        <div className="mr-2">
                            <img src={userProfileImg ? userProfileImg : Mascot} alt="프로필이미지" className="w-10 h-10 rounded-full object-cover" />
                        </div>
                        <div className="ml-1 flex justify-start flex-col items-start">
                            <p className="text-gray-900 text-sm">
                                {userNickname}
                            </p>
                            <p className="text-gray-400 text-xs">
                                감 포인트 90
                            </p>
                        </div>
                        {/* <span className="text-xs mx-2">•</span>
                        <button className="text-indigo-500 text-sm capitalize flex justify-start items-start">follow</button> */}
                    </div>
                    <button type="button" className="relative p-2 focus:outline-none border-none bg-gray-100 rounded-full">
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                        </svg>
                    </button>
                </div>

                {/* 룩 이미지 */}
                <div className="relative w-full pt" style={{ paddingTop: "100%" }}>
                    <img className="absolute top-0 left-0 w-full h-full object-cover" src={LookTestImg} alt="룩이미지" />
                </div>

            </div>
        </div>
    );
}