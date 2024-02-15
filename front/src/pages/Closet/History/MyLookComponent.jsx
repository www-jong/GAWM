import NoLookBookImg from '@/assets/images/no_lookbook.svg';
import React, { useState, useEffect } from 'react';
import { fetchMyLookbooks } from '../../../apis/lookbook';


export default function History() {
    const [lookbooks, setLookbooks] = useState([]); // 룩북 데이터를 저장할 상태
	const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // 룩북 데이터를 비동기로 불러오는 함수
        const fetchLookbooks = async () => {
			setIsLoading(true)
            try {
                const response = await fetchMyLookbooks({});
                if (response.status === 200) {
                    // 불러온 데이터를 상태에 저장
                    setLookbooks(response.data.content);
					console.log(response.data.content)
                } else {
                    // 오류 처리
                    console.error('룩북 데이터 로딩 실패:', response.status);
                }
            } catch (error) {
                console.error('룩북 데이터 로딩 중 오류 발생:', error);
            }finally{
				setIsLoading(false); // 로딩 종료
			}
        };

        // 함수 호출
        fetchLookbooks();
    }, []); // 의존성 배열을 빈 배열로 설정하여 컴포넌트 마운트 시 1회만 호출되도록 함
	if (isLoading) {
		return <div>로딩 중...</div>;
	}
    return (
		<>
        {lookbooks.length > 0 ? (
            <div>
                {lookbooks.map((lookbook) => (
                    <div key={lookbook.lookbookId}>
                        <img src={import.meta.env.VITE_CLOTHES_BASE_URL + '/'+lookbook.image} alt={lookbook.title} />
                        <p>{lookbook.title}</p>
                    </div>
                ))}
            </div>
        ) : (
            <div className="flex justify-center mt-1">
                <img src={NoLookBookImg} alt="룩북 없음 이미지" className="w-screen" />
            </div>
        )}
    </>
);
}