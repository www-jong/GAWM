import React, { useState, useEffect } from 'react';

function TodayLookComponent ({ lookImage, userId, profileImage }) {
    return (
        <div className="relative rounded-lg shadow-md w-full overflow-hidden mt-1">
            <img className="w-full h-60 object-cover" src={lookImage} alt="Lookbook" />
            <div className="absolute bottom-0 left-0 p-4 w-full flex justify-between items-end">
                <div className="flex items-center">
                    <img className="w-10 h-10 object-cover rounded-full border-2 border-white" src={profileImage} alt={userId} />
                    <span className="ml-2 text-sm font-semibold text-white">{userId}</span>
                </div>
            </div>
        </div>
    );
};

export default TodayLookComponent;