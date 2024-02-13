import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BackButtonImg from '@/assets/images/back_button_img.png';
import CropIcon from '@/assets/images/CropIcon.png';
import EraseIcon from '@/assets/images/EraseIcon.png';
import MaskingIcon from '@/assets/images/MaskingIcon.png';
import DoBackIcon from '@/assets/images/DoBackIcon.png';
import TestImage from '@/assets/images/test_clothes.png';
import MaskingEraseIcon from '@/assets/images/MaskingEraseIcon.png';
import { maskingImage } from '../../apis/clothes'
export default function ImageEdit() {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedTool, setSelectedTool] = useState(null);
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [history, setHistory] = useState([]);
    const [eraseSize, setEraseSize] = useState(20);

    const [cropStart, setCropStart] = useState(null);
    const [cropEnd, setCropEnd] = useState(null);

    const croppingRef = useRef(false);

    const originalImageRef = useRef(new Image());
    const processedImageURL = location.state?.processedImageURL || TestImage;
    const originalImageURL = location.state?.originalImageURL || TestImage;
    const product_id = location.state?.product_id || 'null';
    //const product_id=location.state?.product_id || '';

    const getActualPosition = (canvasDom, touchEvent) => {
        const rect = canvasDom.getBoundingClientRect();
        const scaleX = canvasDom.width / rect.width; // 캔버스 실제 너비 대비 화면상 너비의 비율
        const scaleY = canvasDom.height / rect.height; // 캔버스 실제 높이 대비 화면상 높이의 비율
        return {
            x: (touchEvent.touches[0].clientX - rect.left) * scaleX, // 화면상 좌표를 실제 캔버스 좌표로 조정
            y: (touchEvent.touches[0].clientY - rect.top) * scaleY,
        };
    };
    const saveCanvasState = () => {
        const canvas = canvasRef.current;
        const imageData = canvas.toDataURL();
        setHistory([...history, imageData]);
    };

    //원본이미지 로딩용
    useEffect(() => {
        originalImageRef.current.src = originalImageURL;
        originalImageRef.current.onload = () => {
            console.log('Image Loaded');
        };
    }, [originalImageURL]);

    // 마스킹, m마스킹, 크롭용 
    useEffect(() => {
        if (selectedTool === 'crop') return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!canvas || !originalImageRef.current.complete) return;

        let isDrawing = false;

        const calculateActualSize = (size) => { //이미지 크기에 따라 지우개크기 조절 
            const imageSize = Math.max(canvas.width, canvas.height);
            return size * (imageSize / 1000); // 예: 1000px 기준으로 size 조정
        };

        // 지우개 기능
        const eraseAtPosition = (x, y, eraseSize) => {
            context.clearRect(x - eraseSize / 2, y - eraseSize / 2, eraseSize, eraseSize);
        };

        // M지우개 기능
        const restoreAtPosition = (x, y, eraseSize) => {
            // 현재 캔버스의 크기와 원본 이미지의 실제 크기 사이의 비율을 계산합니다.
            const scaleX = originalImageRef.current.naturalWidth / canvasRef.current.width;
            const scaleY = originalImageRef.current.naturalHeight / canvasRef.current.height;
        
            // 캔버스 상의 위치를 원본 이미지 상의 실제 위치로 변환합니다.
            const originalX = x * scaleX;
            const originalY = y * scaleY;
        
            // 캔버스 상의 지우개 크기를 원본 이미지 상의 실제 크기로 변환합니다.
            const originalEraseSizeX = eraseSize * scaleX;
            const originalEraseSizeY = eraseSize * scaleY;
        
            // 원본 이미지에서 복원해야 할 영역의 위치와 크기를 계산합니다.
            const sourceX = originalX - originalEraseSizeX / 2;
            const sourceY = originalY - originalEraseSizeY / 2;
        
            // 복원 영역을 캔버스에 그립니다.
            contextRef.current.drawImage(
                originalImageRef.current,
                sourceX, sourceY, originalEraseSizeX, originalEraseSizeY, // 원본 이미지에서의 영역
                x - eraseSize / 2, y - eraseSize / 2, eraseSize, eraseSize // 캔버스에 그릴 위치와 크기
            );
        };


        const handleTouchMove = (event) => {
            //const touchPos = getTouchPos(canvas, event);
            const actualPos = getActualPosition(canvas, event)
            const adjustedEraseSize = calculateActualSize(eraseSize);
            if (selectedTool === 'erase') { // 지우개 작동
                eraseAtPosition(actualPos.x, actualPos.y, adjustedEraseSize);
            }
            if (selectedTool === 'maskingErase') { // M지우개 작동
                restoreAtPosition(actualPos.x, actualPos.y, adjustedEraseSize);
            }
            event.preventDefault(); // 스크롤 등 기본 이벤트 방지
        };

        const startDrawing = (event) => {
            console.log('드로잉 시작')
            isDrawing = true;
            handleTouchMove(event);
        };

        const finishDrawing = () => {
            console.log('드로잉 종료')
            if (isDrawing) {
                isDrawing = false;
                saveCanvasState();
            }
        };

        canvas.addEventListener('touchstart', startDrawing);
        canvas.addEventListener('touchend', finishDrawing);
        canvas.addEventListener('touchmove', handleTouchMove);

        return () => {
            canvas.removeEventListener('touchstart', startDrawing);
            canvas.removeEventListener('touchend', finishDrawing);
            canvas.removeEventListener('touchmove', handleTouchMove);
        };
    }, [selectedTool, saveCanvasState]);

    // 마스킹 이미지 불러오기
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const image = new Image();
        image.src = processedImageURL;
        image.onload = () => {
            canvas.width = image.naturalWidth;
            canvas.height = image.naturalHeight;
            context.drawImage(image, 0, 0);
            contextRef.current = context;
            saveCanvasState();
        };
    }, [processedImageURL]);

    // 크롭부분
    useEffect(() => {
        if (selectedTool !== 'crop') return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        let isDrawing = false;
        const headerHeight = document.querySelector('.bg-gray-100').clientHeight; // 상단 헤더의 높이를 얻습니다.
        const handleTouchStart = (event) => {
            isDrawing = true;
            const pos = getActualPosition(canvas, event);
            const { left: canvasLeft, top: canvasTop } = canvas.getBoundingClientRect();

            setCropStart(pos);
            croppingRef.current = true;
            const cropLeft = pos.x + canvasLeft;
            const cropTop = pos.y + canvasTop - headerHeight;

            // 크롭 영역을 표시합니다.
            const cropArea = document.getElementById('cropArea');
            cropArea.style.left = `${cropLeft}px`;
            cropArea.style.top = `${cropTop}px`;
            cropArea.style.width = `0px`;
            cropArea.style.height = `0px`;
            cropArea.style.display = 'block';
        };

        const handleTouchMove = (event) => {
            console.log(isDrawing, selectedTool);
            //if (!isDrawing || selectedTool !== 'crop') return;
            const pos = getActualPosition(canvas, event);
            setCropEnd(pos);

            // 캔버스의 현재 위치와 크기 정보를 가져옵니다.
            const { left: canvasLeft, top: canvasTop } = canvas.getBoundingClientRect();

            // 크롭 영역의 상대적 위치를 계산합니다.
            const cropLeft = Math.min(cropStart.x, pos.x) + canvasLeft;
            const cropTop = Math.min(cropStart.y, pos.y) + canvasTop - headerHeight;
            const cropWidth = Math.abs(pos.x - cropStart.x);
            const cropHeight = Math.abs(pos.y - cropStart.y);

            // 크롭 영역을 표시합니다.
            const cropArea = document.getElementById('cropArea');
            cropArea.style.left = `${cropLeft}px`;
            cropArea.style.top = `${cropTop}px`;
            cropArea.style.width = `${cropWidth}px`;
            cropArea.style.height = `${cropHeight}px`;
            cropArea.style.display = 'block';
        };

        const handleTouchEnd = () => {
            if (selectedTool !== 'crop' || !croppingRef.current) return;
            isDrawing = false;
            document.getElementById('cropArea').style.display = 'none';
            croppingRef.current = false;
            cropImage();
        };

        canvas.addEventListener('touchstart', handleTouchStart);
        canvas.addEventListener('touchmove', handleTouchMove);
        canvas.addEventListener('touchend', handleTouchEnd);

        return () => {
            canvas.removeEventListener('touchstart', handleTouchStart);
            canvas.removeEventListener('touchmove', handleTouchMove);
            canvas.removeEventListener('touchend', handleTouchEnd);
        };
    }, [selectedTool, cropStart, cropEnd, saveCanvasState]);

    const cropImage = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!cropStart || !cropEnd) return;

        // cropStart와 cropEnd 좌표 비교하여 크롭 사각형 좌표 설정
        const x1 = Math.min(cropStart.x, cropEnd.x);
        const y1 = Math.min(cropStart.y, cropEnd.y);
        const x2 = Math.max(cropStart.x, cropEnd.x);
        const y2 = Math.max(cropStart.y, cropEnd.y);

        const width = x2 - x1;
        const height = y2 - y1;

        const croppedCanvas = document.createElement('canvas');
        croppedCanvas.width = width;
        croppedCanvas.height = height;
        const croppedCtx = croppedCanvas.getContext('2d');

        croppedCtx.drawImage(
            canvas,
            x1, y1,
            width, height,
            0, 0,
            width, height
        );


        const scaleX = canvas.width / width;
        const scaleY = canvas.height / height;
        const scaleToFit = Math.min(scaleX, scaleY);

        const newWidth = width * scaleToFit;
        const newHeight = height * scaleToFit;

        const dx = (canvas.width - newWidth) / 2;
        const dy = (canvas.height - newHeight) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(croppedCanvas, 0, 0, width, height, dx, dy, newWidth, newHeight);

        // 새로운 이미지 상태를 저장합니다.
        saveCanvasState();
    };


    const handleToolSelect = async (tool) => {
        if (tool === 'doBack') {
            undoLastAction();
            return;
        }
        if (tool === 'masking') {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
    
            // 현재 캔버스 상태(이미지 데이터)를 Blob으로 변환하여 서버에 마스킹 처리 요청
            canvas.toBlob(async (blob) => {
                const formData = new FormData();
                formData.append('image_file', blob, 'image.png');
    
                try {
                    const response = await maskingImage(formData);
                    const objectURL = URL.createObjectURL(response.data);
    
                    const newMaskedImage = new Image();
                    newMaskedImage.onload = () => {
                        // 캔버스 크기를 재조정하고, 새로운 마스킹 이미지를 캔버스에 적용
                        canvas.width = newMaskedImage.width;
                        canvas.height = newMaskedImage.height;
                        context.drawImage(newMaskedImage, 0, 0);
                        saveCanvasState(); // 상태 저장
                        URL.revokeObjectURL(objectURL); // 사용이 끝난 URL 해제
                    };
                    newMaskedImage.src = objectURL;
                } catch (error) {
                    console.error('Masking process failed', error);
                }
            }, 'image/png');
            return;
        }
        setSelectedTool(tool);
    };

        // 지우개 크기 조절용
        const handleEraseSizeChange = (event) => {
            setEraseSize(parseInt(event.target.value, 10));
            console.log(event.target.value)
        };
    const isToolSelected = (tool) => {
        return selectedTool === tool;
    }

    const goBack = () => {
        navigate(-2);
    };

    const handleSaveButton = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // 캔버스의 현재 상태를 이미지 데이터(URL)로 변환
        const imageDataURL = canvas.toDataURL("image/png");
        navigate('/closet/add', {
            state: {
                processedImageURL: imageDataURL,
                product_id: product_id
            }
        });
    };

    // 마지막 행동 되돌리기
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

            <div className="flex-grow flex justify-center items-center bg-black" style={{ position: 'relative' }}>
                <canvas
                    ref={canvasRef}
                    className="max-w-full max-h-400px"
                    style={{ objectFit: 'contain' }}
                />
                {/* 크롭 영역을 표시할 div 추가 */}
                <div
                    id="cropArea"
                    style={{
                        position: 'absolute',
                        border: '2px dashed red',
                        display: 'none', // 초기 상태는 숨김
                    }}
                ></div>
            </div>

            {['erase', 'masking', 'maskingErase'].includes(selectedTool) && (
                <div className="flex justify-center p-4">
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