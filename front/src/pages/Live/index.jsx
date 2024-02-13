import React, { useRef, useState,useEffect} from 'react';
import { useUserStore } from '@/stores/user.js'; // Zustand


export default function Live() {
	const currentUserNickname = useUserStore(state => state.nickname);
    const currentUserId = useUserStore(state => state.nickname);

	const nameInput = useRef(null);
	const isPublic = useRef(false);



    return (
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm mx-auto">
        <div className="flex justify-between items-center mb-4">
          <p className="text-4xl font-bold text-gray-800">26°C 라이브</p>
          <div className="space-x-1">
            <span className="bg-red-200 rounded-full h-3 w-3 inline-block"></span>
            <span className="bg-red-400 rounded-full h-3 w-3 inline-block"></span>
            <span className="bg-red-600 rounded-full h-3 w-3 inline-block"></span>
          </div>
        </div>
        <div className="mb-4">
          <h2 className="text-lg text-gray-800 font-bold mb-2">방 정보</h2>
          <input
            className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="room-title"
            type="text"
            placeholder="제목을 입력해주세요"
          />
        </div>
        <div className="mb-6">
          <h2 className="text-lg text-gray-800 font-bold mb-2">공개 설정</h2>
          <select
            className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
            id="room-visibility"
          >
            <option>전체 공개</option>
            <option>친구 공개</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            라이브 시작
          </button>
          <button
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            type="button"
          >
            취소
          </button>
        </div>
      </div>
    );
  }