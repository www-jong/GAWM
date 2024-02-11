import LookTest from "./LookTest.json"
import Backbutton from '@/components/Button/BackButton.jsx';
import React, { useState } from 'react';
import Mascot from '@/assets/images/Mascot.svg';
import LookTestImg from './LookTestImg2.png';
import { CSSTransition } from 'react-transition-group';
import './index.css';



export default function Look() {
    const [commentVisible, setCommentVisible] = useState(false);
    const [repliesVisible, setRepliesVisible] = useState(false);
    const [commentText, setCommentText] = useState("");

    const { lookbookId, userId, userNickname, userProfileImg, createdAt, clothes, lookbookImgs, comment, likeCnt, view, tag, liked, bookmarked, followed } = LookTest.data;

    const handleSubmit = (e) => {
        e.preventDefault(); // 폼 제출 기본 동작 방지
        console.log(commentText); // 입력된 댓글 로그
        setCommentText(""); // 입력 필드 초기화
    };


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
                                2024년 2월 11일
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


                {/* 댓글 입력 폼 */}
                <div className="">
                    <form onSubmit={handleSubmit}>
                        <div className="flex justify-between border-t items-center w-full">
                            <div className="w-full">
                                <input 
                                    type="text" 
                                    name="comment" 
                                    id="comment" 
                                    placeholder="댓글을 남겨보세요..."
                                    className="w-full text-sm py-4 px-3 rounded-none focus:outline-none"
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                />
                            </div>
                            <div className="w-20">
                                <button type="submit" className="border-none text-sm px-4 bg-white py-4 text-main focus:outline-none">
                                    게시
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                

            </div>
        </div>
    );
}