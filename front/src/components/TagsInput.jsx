import React, { useState } from 'react';

export default function TagsInput() {
    const [tags, setTags] = useState([]);

    function handleKeyDown(e) {
        if (e.key !== 'Enter') return;
        const value = e.target.value;
        if (!value.trim()) return;
        setTags([...tags, value]);
        e.target.value = '';
    }

    function removeTag(index) {
        setTags(tags.filter((el, i) => i !== index));
    }

    return (
        <div className="border border-gray-300 p-2 rounded-md w-full max-w-[80vw] md:max-w-xl mt-2 flex items-center flex-wrap gap-2">
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
                placeholder="감각에 태그를 추가해보세요!" 
            />
        </div>
    );
}