import React, { useState,useEffect } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import './Calendar.css';
import StyleLogModal from '../Modal/StyleLogModal.jsx';
import {getStyleLogsByYear} from '../../apis/stylelog'
function ReactCalendar() {
    const curDate = new Date();
    const [value, onChange] = useState(curDate); // 클릭한 날짜, 초기값: 현재 날짜

    const [selectedDate, setSelectedDate] = useState(moment(curDate).format('YYYY-MM-DD'));
    const activeDate = moment(value).format('YYYY-MM-DD'); // 클릭한 날짜 (년-월-일)

    const [isModalOpen, setIsModalOpen] = useState(false); // StyleLogModal 상태 관리
    // 스타일로그 데이터 상태 및 상태 업데이트 함수 선언 수정
    const [stylelogData, setStylelogData] = useState({});
    const [selectedStyleLogIds, setSelectedStyleLogIds] = useState([]);


    useEffect(() => {
        const year = moment().format('YYYY'); // 현재 년도
        getStylelogsByYearData(year);
    }, []);

    const getStylelogsByYearData = async (year) => {
        const response = await getStyleLogsByYear(year);
        if (response.data.status === 200) {
            console.log(response)
            setStylelogData(response.data.data); // API 호출 결과 중 data.data 부분을 상태에 저장
        }
    };

    const handleDayClick = (value, event) => {
        setIsModalOpen(true);
        const newActiveDate = moment(value).format('YYYY년 M월 D일');
        setSelectedDate(newActiveDate);
        
        // 선택된 날짜에 해당하는 stylelogId들 찾기
        const dateString = moment(value).format('YYYYMMDD');
        const monthString = moment(value).format('YYYYMM');
        const dayData = stylelogData[monthString] || [];
        const styleLogIds = dayData
            .filter(entry => moment(entry.date).format('YYYYMMDD') === dateString)
            .map(entry => entry.stylelogId); // 이 날짜에 해당하는 모든 stylelogId 추출
    
        setSelectedStyleLogIds(styleLogIds);
    };
    

    // 클릭한 날짜의 월을 추출하여 상태 관리
    const monthOfActiveDate = moment(value).format('YYYY-MM');
    const [activeMonth, setActiveMonth] = useState(monthOfActiveDate);

    // 활성화된 시작 날짜를 기반으로 활성 월을 설정하는 함수
    const getActiveMonth = (activeStartDate) => {
        const newActiveMonth = moment(activeStartDate).format('YYYY-MM');
        setActiveMonth(newActiveMonth);
    };

    const addContent = ({ date }) => {
        const dateString = moment(date).format('YYYYMMDD');
        const monthString = moment(date).format('YYYYMM');
        const dayData = stylelogData[monthString] || [];
        
        // 해당 날짜에 스타일로그 데이터가 있는지 확인
        const filteredEntries = dayData.filter(entry => moment(entry.date).format('YYYYMMDD') === dateString);
    
        if (filteredEntries.length > 0) {
            // 첫 번째 스타일로그의 이미지 URL을 사용
            const firstStyleLogImgUrl = filteredEntries[0].stylelogImg; // 여기서는 예시로 첫 번째 스타일로그의 이미지를 사용합니다.
            return (
                <div className="diaryImgContainer">
                    <img
                        src={import.meta.env.VITE_CLOTHES_BASE_URL+'/'+firstStyleLogImgUrl} // 스타일로그 이미지 URL 사용
                        className="diaryImg"
                        alt="Style Log"
                    />
                </div>
            );
        }
        return null; // 날짜에 해당하는 데이터가 없는 경우, 아무것도 추가하지 않음
    };

    return (
        <div>
            <Calendar
                locale="ko"
                onChange={onChange}
                onClickDay={handleDayClick}
                value={value}
                next2Label={null}
                prev2Label={null}
                formatDay={(locale, date) => moment(date).format('D')}
                tileContent={addContent}
                showNeighboringMonth={false}
                onActiveStartDateChange={({ activeStartDate }) => {
                    const newActiveMonth = moment(activeStartDate).format('YYYY-MM');
                    getStylelogsByYearData(newActiveMonth.substring(0, 4)); // 활성 월이 변경될 때마다 해당 년도의 데이터를 다시 불러옴
                }}
            />
            {isModalOpen && <StyleLogModal date={selectedDate} stylelogIds={selectedStyleLogIds} onClose={() => setIsModalOpen(false)} />}
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