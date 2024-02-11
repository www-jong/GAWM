import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

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


    const handleEdit = () => {
        navigate('/look/add');
        onClose();
    };

    const handleDelete = () => {
        navigate('/look/add');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50" onClick={onClose}>
            <div ref={modalRef} className="fixed bottom-0 left-0 right-0 mx-auto p-4 bg-white shadow-lg flex flex-col items-center transition duration-300 ease-out translate-y-full" onClick={handleModalContentClick}>
                <div className="flex flex-col justify-start w-full mt-2">
                    <p className="text-xl font-bold text-main">수정하기</p>
                    <p className="text-xl font-bold text-main">삭제하기</p>
                </div>
                <hr />
                <div>
                    <p>취소</p>
                </div>
            </div>
        </div>
    );
}