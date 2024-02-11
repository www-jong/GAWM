import LookTest from "./LookTest.json"
import Backbutton from '@/components/Button/BackButton.jsx';
import React, { useEffect, useState } from 'react';
import Mascot from '@/assets/images/Mascot.svg';
import LookTestImg1 from './LookTestImg1.png';
import LookTestImg2 from './LookTestImg2.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import BackButtonImg from '@/assets/images/back_button_img.png';
import views from '@/assets/images/views.png';
import { toggleFollow } from '@/apis/user';
import { useUserStore } from '@/stores/user.js'; // Zustand
import EditLookBookModal from '@/components/Modal/EditLookBookModal.jsx';



import 'swiper/css';
import 'swiper/css/pagination';
import './index.css';



export default function Look() {
    const { lookbookId, userId, userNickname, userProfileImg, createdAt, clothes, lookbookImgs, comment, likeCnt, view, tag, liked, bookmarked, followed } = LookTest.data;

    const [commentVisible, setCommentVisible] = useState(false);
    const [repliesVisible, setRepliesVisible] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [likes, setLikes] = useState(likeCnt);
    const [commentModalVisible, setCommentModalVisible] = useState(false);
    const [comments, setComments] = useState(LookTest.data.comment); // 코멘트 데이터들을 상태로 관리
    const [isModalOpen, setIsModalOpen] = useState(false);
    


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(commentText); // 입력된 댓글 로그
        setCommentText(""); // 입력 필드 초기화
    };

    const handleLike = () => {
        setLikes(likes + 1); // 좋아요 수 증가
    };

    const toggleCommentModal = () => {
        setCommentModalVisible(!commentModalVisible); // 댓글 입력 창 토글
    };

    // createdAt 값 예쁘게 포맷
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Intl.DateTimeFormat('ko-KR', options).format(new Date(dateString));
    };


    // zustand 스토어에서 현재 로그인한 사용자의 정보 가져오기
    const currentUserNickname = useUserStore(state => state.nickname);
    const currentUserId = useUserStore(state => state.nickname);

    // 로그인한 사용자가 작성한 글인지 확인하는 함수
    const isMyLookbook = () => {
        return userNickname === currentUserNickname;
    };


    // 팔로우 버튼 관련

    const followingNicknames = useUserStore(state => state.followingNicknames);

    const [isFollowing, setIsFollowing] = useState(null);

    useEffect(() => {
        if (followingNicknames && followingNicknames.includes(userNickname)) {
            setIsFollowing(true);
        } else {
            setIsFollowing(false);
        }
    }, [followingNicknames, userNickname]);

    const handleToggleFollow = async () => {
        try {
            await toggleFollow({
                fromId: currentUserId,
                toId: userId
            });

            setIsFollowing(!isFollowing);

            // 팔로잉 목록 업데이트하는 함수 호출해도 될듯 여기
        } catch (error) {
            console.error('팔로우 상태 변경 실패:', error.response || error);
        }
    };


    const handleEditClick = (value, event) => {
        setIsModalOpen(true);
    };
    




    return (
        <div className="mx-auto">

            <div className="h-full relative ">
                <Backbutton />

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
                                {formatDate(createdAt)}
                            </p>
                        </div>
                        {/* <span className="text-xs mx-2">•</span>
                        <button className="text-indigo-500 text-sm capitalize flex justify-start items-start">follow</button> */}
                    </div>

                    {/* 팔로우버튼 or 수정버튼 */}
                    {
                        isMyLookbook() ?
                            <button type="button" className="relative p-2 focus:outline-none border-none bg-gray-100 rounded-full" onClick={handleEditClick}>
                                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                                </svg>
                            </button>
                            :
                            <button
                            type="button"
                            onClick={handleToggleFollow}
                            className={`w-16 h-8 focus:outline-none border border-transparent text-xs rounded-full transition-colors ${
                                isFollowing ? 'bg-main opacity-90 text-white' : 'bg-gray-100 text-main'
                            }`}
                        >
                            {isFollowing ? '팔로우 중' : '팔로우'}
                        </button>
                    }
                </div>


                {/* 룩 이미지 */}
                <div className="relative w-full">
                    <Swiper
                        pagination={{ clickable: true }}
                        modules={[Pagination]}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <img src={LookTestImg1} alt="룩 이미지1" className="w-full h-96 object-cover" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={LookTestImg2} alt="룩 이미지2" className="w-full h-96 object-cover" />
                        </SwiperSlide>
                    </Swiper>
                </div>


                {/* 좋아요 북마크 코멘트 등 */}
                <div className="mx-1">
                    <div className="flex justify-between items-center p-2">
                        <div className="flex space-x-2 items-center">
                            <button onClick={handleLike} className="focus:outline-none Like">
                                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                </svg>
                            </button>
                            <button onClick={toggleCommentModal} className="focus:outline-none Comment">
                                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                                </svg>
                            </button>
                            <button className="focus:outline-none save">
                                <svg className="w-7 h-7 text-gray-600 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="flex items-center space-x-1">
                            <img src={views} alt="조회수" className="w-5 h-5" />
                            <span className="text-sm text-gray-400">{view}</span>
                        </div>
                    </div>

                    {/* 태그 */}
                    <div className="p-2">
                        <div className="flex flex-wrap gap-2">
                            {tag.map((tagItem, index) => (
                                <div key={index} className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                                    #{tagItem.name}
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* 코멘트 모달 */}
                    {commentModalVisible && (
                        <div className="overflow-y-scroll w-full absolute inset-0 bg-white transform transition duration-200 z-50" style={{ maxHeight: "90vh" }}>
                            <div className="border-b" onClick={() => setCommentModalVisible(false)}>
                                <button className="mb-2 flex items-start">
                                    <img src={BackButtonImg} alt="뒤로 가기" className="size-6 ml-2 mt-1" />
                                </button>
                            </div>
                            <div className="p-2 mb-10">

                                {/* 코멘트 내용 */}
                                {comments.map((comment) => (
                                    <div key={comment.commentId} className="flex justify-start flex-col space-y-3 items-start px-2 border-b border-gray-100">
                                        <div className="relative mt-1 mb-3 pt-2 flex">
                                            <div className="mr-2">
                                                <img src={comment.userProfileImg ? comment.userProfileImg : Mascot} alt={comment.userNickname} className="w-8 h-8 rounded-full object-cover bg-quaternary max-w-none" />
                                            </div>
                                            <div className="ml-2 w-full">
                                                <p className="text-gray-600 md:text-sm text-xs w-full">
                                                    <span className="text-gray-900 font-semibold">{comment.userNickname}</span> {comment.content}
                                                </p>
                                                <div className="time mt-1 text-gray-400 text-xs">
                                                    <p>2d</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>


                {/* 댓글 입력 폼 */}
                <div className="mt-3">
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
            {isModalOpen && <EditLookBookModal lookbookId={lookbookId} onClose={() => setIsModalOpen(false)} />}
        </div>
    );
}