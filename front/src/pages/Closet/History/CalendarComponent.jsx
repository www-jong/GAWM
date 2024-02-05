import React, { useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';

function ReactCalendar() {
    const curDate = new Date();
    const [value, onChange] = useState(curDate); // 클릭한 날짜 (초기값으로 현재 날짜 넣어줌)
    const activeDate = moment(value).format('YYYY-MM-DD'); // 클릭한 날짜 (년-월-일)

    // 클릭한 날짜의 월을 추출하여 상태 관리
    const monthOfActiveDate = moment(value).format('YYYY-MM');
    const [activeMonth, setActiveMonth] = useState(monthOfActiveDate);

    // 활성화된 시작 날짜를 기반으로 활성 월을 설정하는 함수
    const getActiveMonth = (activeStartDate) => {
        const newActiveMonth = moment(activeStartDate).format('YYYY-MM');
        setActiveMonth(newActiveMonth);
    };

    const addContent = ({ date }) => {
        // 해당 날짜(하루)에 추가할 컨텐츠의 배열
        const contents = [];

        // dayList 배열과 date(각 날짜)를 비교하여 일치하면 컨텐츠(이모티콘) 추가
        // if (dayList.find((day) => day === moment(date).format('YYYY-MM-DD'))) {
        //   contents.push(
        //     <div key={date.toISOString()} className="diaryImgContainer">
        //       <img
        //         src="emotion/good.svg"
        //         className="diaryImg"
        //         width="26"
        //         height="26"
        //         alt="today is..."
        //       />
        //     </div>
        //   );
        // }
        return <div>{contents}</div>; // 각 날짜마다 해당 요소가 들어감
    };

    return (
        <div>
            <Calendar
                locale="en"
                onChange={onChange}
                value={value}
                next2Label={null}
                prev2Label={null}
                formatDay={(locale, date) => moment(date).format('D')}
                tileContent={addContent}
                showNeighboringMonth={false}
                onActiveStartDateChange={({ activeStartDate }) =>
                    getActiveMonth(activeStartDate)
                }
            />
        </div>
    );
}

export default function History() {
    return (
        <>
            <ReactCalendar />
        </>
    )
}