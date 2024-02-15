import React, { useState, useEffect } from 'react';

export default function TagsInput({ onTagsChange }) {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        onTagsChange(tags);
    }, [tags, onTagsChange]);

    function handleKeyDown(e) {
        if(e.key===' '){
            e.preventDefault();
            return;
        }
        if (e.key !== 'Enter' && e.key !==',') return;
        e.preventDefault();
        const value = e.target.value.trim();
        if (!value) return;
        if (tags.includes(value)) {
            alert('이미 존재하는 태그입니다.'); // 사용자에게 중복을 알리거나 다른 피드백 제공
            return;
        }
        setTags([...tags, value]);
        e.target.value = '';
    }

    function removeTag(index) {
        setTags(tags.filter((el, i) => i !== index));
    }

    return (
        <div className="border border-gray-300 p-2 rounded-md w-full md:max-w-xl mt-2 flex items-center flex-wrap gap-2">
            {tags.map((tag, index) => (
                <div className="bg-main inline-block text-white font-semibold text-sm py-1 px-3 rounded-full flex align-center justify-center gap-2" key={index}>
                    <span>{tag}</span>
                    <span className="cursor-pointer" onClick={() => removeTag(index)}>
                        &times;
                    </span>
                </div>
            ))}
            <input 
                onKeyDown={handleKeyDown} 
                type="text" 
                className="flex-grow p-2 border-none outline-none bg-transparent placeholder-gray-400" 
                placeholder={tags.length > 0 ? '' : '감각에 태그를 추가해보세요!'}  // 태그 치면 placeholder 없어지도록
            />
        </div>
    );
}
