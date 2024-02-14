import LookTest from "./LookTest.json"
import Backbutton from '@/components/Button/BackButton.jsx';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
import Loading from "@/pages/Loading";
import { fetchLookbookById, updateLookbook, bookmarkLookbook, unbookmarkLookbook, likeLookbook, unlikeLookbook, updateCommentInLookbook, deleteCommentFromLookbook } from '@/apis/lookbook.js'

import 'swiper/css';
import 'swiper/css/pagination';
import './index.css';



export default function Look() {
    const { lookbookId } = useParams(); // URL에서 룩북 ID 가져옴
    const [lookData, setLookData] = useState(LookTest.data); // API 호출 결과 저장

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchLookbookById(lookbookId);
                setLookData(response.data);
            } catch (error) {
                console.error('룩북 데이터를 불러오는데 실패했습니다.', error);
            }
        };

        fetchData();
    }, [lookbookId]);

    const { userId, userNickname, userProfileImg, createdAt, clothes, lookbookImgs, comment, likeCnt, view, tag, liked, bookmarked, followed } = lookData;

    const [commentText, setCommentText] = useState("");
    const [likes, setLikes] = useState(likeCnt);
    const [commentModalVisible, setCommentModalVisible] = useState(false);
    const [comments, setComments] = useState(comment); // 코멘트 데이터들을 상태로 관리
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLiked, setIsLiked] = useState(liked);
    const [isBookmarked, setIsBookmarked] = useState(bookmarked);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingCommentText, setEditingCommentText] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(editingCommentId) {
          // 수정 모드일 때의 처리 로직
          try {
            const response = await updateCommentInLookbook(lookbookId, editingCommentId, commentText);
            if (response.status === 200) {
              alert('댓글이 수정되었습니다.');
              // 코멘트 목록 업데이트 로직 필요...
              cancelEdit(); // 수정 모드 종료
            } else {
              console.error('댓글 수정 실패:', response);
            }
          } catch (error) {
            console.error('댓글 수정 중 오류 발생:', error);
            alert('댓글 수정에 실패했습니다.');
          }
        } else {
          // 새 댓글 추가 모드일 때의 처리 로직...
        }
      };
    

    // 수정 관련
    const handleUpdateComment = async (commentId, updatedContent) => {
        try {
            const response = await updateCommentInLookbook(lookbookId, commentId, updatedContent);
            if (response.status === 200) {
                alert('댓글이 수정되었습니다.');
                // 댓글 목록을 업데이트하는 로직 구현 필요
            } else {
                console.error('댓글 수정 실패:', response);
            }
        } catch (error) {
            console.error('댓글 수정 중 오류 발생:', error);
            alert('댓글 수정에 실패했습니다.');
        }
    };

    // 댓글 수정 모드로 전환하는 함수
    const handleEditCommentClick = (commentId, currentContent) => {
        setEditingCommentId(commentId);
        setEditingCommentText(currentContent);
        setCommentText(currentContent); // 댓글 입력 필드에 현재 내용을 미리 채워 넣음
    };

    // 댓글 수정 취소
    const cancelEdit = () => {
        setEditingCommentId(null);
        setEditingCommentText("");
        setCommentText(""); // 댓글 입력 필드를 비움
    };

    const handleDeleteComment = async (commentId) => {
        if (window.confirm('댓글을 삭제하시겠습니까?')) {
            try {
                const response = await deleteCommentFromLookbook(lookbookId, commentId);
                if (response.status === 200) {
                    alert('댓글이 삭제되었습니다.');
                    // 댓글 목록에서 해당 댓글을 제거하는 로직 구현 필요
                } else {
                    console.error('댓글 삭제 실패:', response);
                }
            } catch (error) {
                console.error('댓글 삭제 중 오류 발생:', error);
                alert('댓글 삭제에 실패했습니다.');
            }
        }
    };

    const toggleCommentModal = () => {
        setCommentModalVisible(!commentModalVisible); // 댓글 입력 창 토글
        console.log(lookbookId)
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
        // return userNickname === currentUserNickname;
        return true; //테스트용
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

    const handleLike = async () => {
        try {
            if (isLiked) {
                await unlikeLookbook(lookbookId);
                setLikes(likes - 1);
            } else {
                await likeLookbook(lookbookId);
                setLikes(likes + 1);
            }
            setIsLiked(!isLiked);
        } catch (error) {
            console.error('좋아요 상태 변경 실패:', error);
        }
    };

    const handleBookmark = async () => {
        try {
            if (isBookmarked) {
                await unbookmarkLookbook(lookbookId);
            } else {
                await bookmarkLookbook(lookbookId);
            }
            setIsBookmarked(!isBookmarked);
        } catch (error) {
            console.error('북마크 상태 변경 실패:', error);
        }
    };

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
                                className={`w-16 h-8 focus:outline-none border border-transparent text-xs rounded-full transition-colors ${isFollowing ? 'bg-main opacity-90 text-white' : 'bg-gray-100 text-main'
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
                                <svg className={`w-8 h-8 ${isLiked ? 'text-red-700' : 'text-gray-600'}`} fill={`${isLiked ? '#c62828' : 'none'}`} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                </svg>
                            </button>
                            <button onClick={toggleCommentModal} className="focus:outline-none Comment">
                                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                                </svg>
                            </button>
                            <button onClick={handleBookmark} className="focus:outline-none save">
                                <svg className={`w-7 h-7 text-gray-600 z-10`} fill={`${isBookmarked ? '#616161' : 'none'}`} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
                                    <div key={comment.commentId} className="flex flex-col space-y-3 px-2 border-b border-gray-100">
                                        <div className="relative mt-1 mb-3 pt-2">
                                            <div className="flex flex-row">
                                                <img src={comment.userProfileImg ? comment.userProfileImg : Mascot} alt={comment.userNickname} className="w-8 h-8 rounded-full object-cover" />
                                                <div className="ml-2">
                                                    <p className="text-gray-600 md:text-sm text-xs">
                                                        <span className="font-semibold text-gray-900">{comment.userNickname}</span> {comment.content}
                                                    </p>
                                                    <div className="mt-1 text-xs text-gray-400">
                                                        <p>2d</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="absolute top-0 right-0 flex space-x-2">
                                                <button className="text-xs text-main hover:text-main-dark" onClick={handleUpdateComment} >수정</button>
                                                <button className="text-xs text-red-600 hover:text-red-700" onClick={handleDeleteComment}>삭제</button>
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