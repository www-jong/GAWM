import React, { useState,useEffect } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import './Calendar.css';
import StyleLogModal from '../Modal/StyleLogModal.jsx';
import {getStyleLogsByYear,getStyleLogsByYearAndMonth} from '../../apis/stylelog'
function ReactCalendar() {
    const [value, setValue] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [styleLogData, setStyleLogData] = useState({});
    const [selectedStyleLogIds, setSelectedStyleLogIds] = useState([]);

    useEffect(() => {
        loadInitialData();
    }, []);

    const loadInitialData = async () => {
        const year = moment().format('YYYY');
        const month = moment().format('MM');
        await loadStyleLogData(year, month);
        await loadStyleLogData(year, Number(month) - 1); // 이전 달
        await loadStyleLogData(year, Number(month) + 1); // 다음 달
        //console.log(styleLogData)
    };

    const loadStyleLogData = async (year, month) => {
        const formattedMonth = month.toString().padStart(2, '0');
        const key = `${year}-${formattedMonth}`;
        if (styleLogData[key]) return;

        try {
            const response = await getStyleLogsByYearAndMonth(year, formattedMonth);
            if (response.status === 200) {
                setStyleLogData(prev => ({ ...prev, [key]: response.data.data }));
            }
        } catch (error) {
            console.error('Error fetching style log data:', error);
        }
    };

    const handleActiveStartDateChange = ({ activeStartDate }) => {
        const year = moment(activeStartDate).format('YYYY');
        const month = moment(activeStartDate).format('MM');
        loadStyleLogData(year, month);
    };

    const handleDayClick = (value, event) => {
        setIsModalOpen(true);
        const dateString = moment(value).format('YYYYMMDD');
        const monthString = moment(value).format('YYYY-MM');
        const dayData = styleLogData[monthString] || [];
        const styleLogIds = dayData.filter(entry => moment(entry.date).format('YYYYMMDD') === dateString).map(entry => entry.stylelogId);
        setSelectedStyleLogIds(styleLogIds);
    };

    const addContent = ({ date }) => {
        const dateString = moment(date).format('YYYYMMDD');
        const monthString = moment(date).format('YYYY-MM');
        // 여기서 dayData를 가져오기 전에, 해당 monthString이 styleLogData에 존재하는지 확인
        const dayData = styleLogData[monthString];
        //console.log(dayData)
        if (!dayData) {
            // 해당 월에 대한 데이터가 없으면 null을 반환
            return null;
        }
        const filteredEntries = dayData.filter(entry => moment(entry.date).format('YYYYMMDD') === dateString);
        if (filteredEntries.length > 0) {
            const firstStyleLogImgUrl = filteredEntries[0].stylelogImg;
            return (
                <div className="diaryImgContainer">
                    <img src={`${import.meta.env.VITE_CLOTHES_BASE_URL}/${firstStyleLogImgUrl}`} className="diaryImg" alt="Style Log" />
                </div>
            );
        }
        return null;
    };


    return (
        <div class="calendar-container" className="flex justify-center">
            <Calendar
                locale="ko"
                onChange={setValue}
                onClickDay={handleDayClick}
                value={value}
                next2Label={null}
                prev2Label={null}
                formatDay={(locale, date) => moment(date).format('D')}
                tileContent={addContent}
                showNeighboringMonth={false}
                onActiveStartDateChange={handleActiveStartDateChange}
            />
                        {isModalOpen && (
                <StyleLogModal
                    date={moment(value).format('YYYY-MM-DD')}
                    stylelogIds={selectedStyleLogIds}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
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