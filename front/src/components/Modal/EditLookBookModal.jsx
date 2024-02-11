import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateLookbook, deleteLookbook } from '@/apis/lookbook.js'; // API 함수의 정확한 경로를 지정해주세요.

export default function EditLookBook({ lookbookId, onClose, }) {
    const navigate = useNavigate();
    const modalRef = useRef();

    const handleModalContentClick = (e) => {
        e.stopPropagation();
    };

    useEffect(() => {
        setTimeout(() => {
            if (modalRef.current) {
                modalRef.current.classList.remove('translate-y-full');
                modalRef.current.classList.add('translate-y-0');
            }
        }, 10);
    }, []);


    const handleEdit = async () => {
        navigate('/look/add');  // edit page 만들어야지.. 보내야할 정보들이 너무 많네
        onClose();
    };

    const handleDelete = async () => {
        if (window.confirm('정말로 삭제하시겠습니까?')) {  // 아니 윈도우컨펌 써도되나
            try {
                await deleteLookbook(lookbookId);
                alert('룩북이 삭제되었습니다.');
                navigate('/browse'); // 삭제 후 이동할 경로 지정
            } catch (error) {
                console.error('룩북 삭제 중 오류 발생:', error);
                alert('룩북 삭제에 실패했습니다.');
            }
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex z-50" onClick={onClose}>
            <div ref={modalRef} className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg flex flex-col transition duration-300 ease-out translate-y-full" onClick={handleModalContentClick}>
                <div className="flex flex-col w-full my-2 gap-4 font-semibold">
                    <button onClick={handleEdit} className="text-left text-base">수정하기</button>
                    <button onClick={handleDelete} className="text-left text-base">삭제하기</button>
                </div>
                <hr className="w-full border-t border-gray-300 my-1"/>
                <div className="text-main text-center ">
                    <p>취소</p>
                </div>
            </div>
        </div>
    );
}