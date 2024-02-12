import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BackButtonImg from '@/assets/images/back_button_img.png';
import CropIcon from '@/assets/images/CropIcon.png';
import EraseIcon from '@/assets/images/EraseIcon.png';
import MaskingIcon from '@/assets/images/MaskingIcon.png';
import DoBackIcon from '@/assets/images/DoBackIcon.png';
import TestImage from '@/assets/images/test_clothes.png';
import MaskingEraseIcon from '@/assets/images/MaskingEraseIcon.png';

export default function ImageEdit() {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedTool, setSelectedTool] = useState(null);
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [history, setHistory] = useState([]);
    const [eraseSize, setEraseSize] = useState(20);

    const processedImageURL = location.state?.processedImageURL || TestImage;
    const originalImageURL = location.state?.originalImageURL || TestImage;
    const getActualPosition = (canvasDom, touchEvent) => {
        const rect = canvasDom.getBoundingClientRect();
        const scaleX = canvasDom.width / rect.width; // 캔버스 실제 너비 대비 화면상 너비의 비율
        const scaleY = canvasDom.height / rect.height; // 캔버스 실제 높이 대비 화면상 높이의 비율
        return {
            x: (touchEvent.touches[0].clientX - rect.left) * scaleX, // 화면상 좌표를 실제 캔버스 좌표로 조정
            y: (touchEvent.touches[0].clientY - rect.top) * scaleY,
        };
    };


    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const image = new Image();
        image.src = processedImageURL;
        image.onload = () => {
            canvas.width = image.naturalWidth;
            canvas.height = image.naturalHeight;
            context.drawImage(image, 0, 0);
            saveCanvasState();
        };
    }, [processedImageURL]);

    useEffect(() => {
        const handleTouchMove = (event) => {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            const actualPos = getActualPosition(canvas, event);

            const calculateActualSize = (size) => { //이미지 크기에 따라 지우개크기 조절 
                const imageSize = Math.max(canvas.width, canvas.height);
                return size * (imageSize / 1000); // 예: 1000px 기준으로 size 조정
            };

            const adjustedEraseSize = calculateActualSize(eraseSize);
            if (selectedTool === 'erase') {
                canvasRef.current.getContext('2d').clearRect(actualPos.x - adjustedEraseSize / 2, actualPos.y - adjustedEraseSize / 2, adjustedEraseSize, adjustedEraseSize);
            } else if (selectedTool === 'maskingErase') {
                const context = canvasRef.current.getContext('2d');
                const originalImage = new Image();
                originalImage.src = originalImageURL;
                originalImage.onload = () => {
                    context.drawImage(originalImage, actualPos.x - adjustedEraseSize / 2, actualPos.y - adjustedEraseSize / 2, adjustedEraseSize, adjustedEraseSize, actualPos.x - adjustedEraseSize / 2, actualPos.y - adjustedEraseSize / 2, adjustedEraseSize, adjustedEraseSize);
                };
            }
            event.preventDefault();
        };

        if (selectedTool === 'erase' || selectedTool === 'maskingErase') {
            canvasRef.current.addEventListener('touchmove', handleTouchMove);
        }

        return () => {
            canvasRef.current.removeEventListener('touchmove', handleTouchMove);
        };
    }, [selectedTool, eraseSize, originalImageURL]);


    const handleToolSelect = (tool) => {
        if (tool === 'doBack') {
            undoLastAction();
            return;
        }
        // 이미 선택된 도구 다시 선택한 경우 선택 해제
        if (selectedTool === tool) {
            setSelectedTool(null);
            saveCanvasState();
        } else {
            // 다른 도구를 선택한 경우
            if (selectedTool !== tool) {
                saveCanvasState(); // 도구 변경시 현재 상태 저장
            }
            setSelectedTool(tool);
        }
    };

    // 지우개 크기 조절용
    const handleEraseSizeChange = (event) => {
        setEraseSize(parseInt(event.target.value, 10));
        console.log(event.target.value)
    };

    const isToolSelected = (tool) => {
        // console.log(tool)
        return selectedTool === tool;
    }

    const saveCanvasState = () => {
        const canvas = canvasRef.current;
        const imageData = canvas.toDataURL();
        setHistory([...history, imageData]);
    };

    const goBack = () => {
        navigate(-2);
    };

    const handleSaveButton = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // 캔버스의 현재 상태를 이미지 데이터(URL)로 변환
        const imageDataURL = canvas.toDataURL("image/png");
        navigate('/closet/add', { state: { processedImageURL: imageDataURL } });
    };
    const undoLastAction = () => {
        if (history.length <= 1) return; // 초기 상태 이외에 되돌릴 상태가 없음
        const prevState = history[history.length - 2];
        setHistory(history.slice(0, -1)); // 마지막 상태 제거


        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const image = new Image();
        image.src = prevState;
        image.onload = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(image, 0, 0);
        };
        setSelectedTool(null); // '되돌리기' 후 도구 선택 취소
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="bg-gray-100 p-1 flex justify-between items-center">
                <button onClick={goBack} className="my-1 flex items-start">
                    <img src={BackButtonImg} alt="뒤로 가기" className="size-6 ml-2 mt-1" />
                </button>
                <button className="text-main font-semibold py-1 px-4 rounded" onClick={handleSaveButton}>
                    저장
                </button>
            </div>

            <div className="relative flex-grow">
                {/* 이미지 영역 */}
                <div className="absolute inset-0 flex justify-center items-center bg-black" style={{ minHeight: 'calc(100vh - 200px)' }}>
                    <canvas
                        ref={canvasRef}
                        className="max-w-full max-h-400px"
                        style={{ objectFit: 'contain' }}
                    />
                </div>

                {/* 슬라이더 영역 */}
                {['erase', 'masking', 'maskingErase'].includes(selectedTool) && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-white">
                        <input
                            type="range"
                            min="1"
                            max="100"
                            value={eraseSize}
                            onChange={handleEraseSizeChange}
                            className="w-full"
                        />
                    </div>
                )}
            </div>

            <div className="bg-gray-100 p-2 flex justify-around items-center mt-auto">
                {/* Tool buttons */}
                {[
                    { tool: 'crop', icon: CropIcon, alt: '크롭' },
                    { tool: 'erase', icon: EraseIcon, alt: '지우개' },
                    { tool: 'masking', icon: MaskingIcon, alt: '마스킹' },
                    { tool: 'maskingErase', icon: MaskingEraseIcon, alt: 'M지우개' },
                    { tool: 'doBack', icon: DoBackIcon, alt: '되돌리기' }
                ].map(({ tool, icon, alt }) => (
                    <button
                        key={tool}
                        onClick={() => handleToolSelect(tool)}
                        className={`flex flex-col items-center ${isToolSelected(tool) ? 'bg-gray-300' : ''}`}
                    >
                        <img src={icon} alt={alt} className="w-8 h-8" />
                        <span className="text-xs mt-1">{alt}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
