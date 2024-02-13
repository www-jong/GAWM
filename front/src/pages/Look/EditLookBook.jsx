import React, { useRef, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Backbutton from '@/components/Button/BackButton.jsx';
import TagsInput from "@/components/TagsInput.jsx"
import AddClothing from '@/assets/images/AddClothing.svg';
import AddClothingModal from '@/components/Modal/AddClothingModal.jsx';
import { useParams } from 'react-router-dom';
import { fetchLookbookById, updateLookbook } from "@/apis/lookbook.js";
import lookTestData from './LookTest.json';


export default function EditLookBook() {
    const navigate = useNavigate();
    const location = useLocation();
    const fileInput = useRef(null);
    const tagsInput = useRef(null);
    const clothesInput = useRef(null);

    const [selectedFile, setSelectedFile] = useState(null);
    const [isPublic, setIsPublic] = useState(false);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(location.state?.processedImageURL || '');
    const [tags, setTags] = useState(lookTestData.data.tag.map(tag => tag.name));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [lookData, setLookData] = useState(lookTestData.data); // API 호출 결과 저장
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileSelectPopup = () => fileInput.current.click();

    const handleTagsChange = (newTags) => {
        setTags(newTags);
    };

    const handleModalClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    lookTestData.data.tag.map(tag => tag.name)
    // const { lookbookId } = useParams(); // 나중에 실제동작할때

    useEffect(() => {
        const fetchLookData = async () => {
            try {
                const response = await fetchLookbookById(2); // API 호출
                if (response.status === 200) {
                    setLookData(response.data); // 상태 업데이트
                    // API 호출 성공 시, 태그 상태 업데이트
                    setTags(response.data.tag.map(tag => tag.name));
                    setIsPublic(response.data.isPublic);
                    setImagePreviewUrl(response.data.lookbookImgs[0]);
                } else {
                    console.error('룩북을 불러오는 데 실패했습니다.');
                    setLookData(lookTestData.data);
                }
            } catch (error) {
                console.error('Error:', error);
                setLookData(lookTestData.data);
            }
        };

        fetchLookData();
    }, [2]); // id가 변경될 때마다 API 호출

    // if (!lookData) return <div><Loading /></div>;

    const { lookbookId, userId, userNickname, userProfileImg, createdAt, clothes, lookbookImgs, comment, likeCnt, view, tag, liked, bookmarked, followed } = lookData;
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', selectedFile);

        const data = {
            isPublic: isPublic,
            clothes: clothesInput.current.value.split(',').map(id => parseInt(id.trim())),
            tags: tags
        };

        formData.append('data', JSON.stringify(data));

        try {
            await updateLookbook(lookbookId, formData); // 수정할 룩북 ID와 formData 전달
            alert('룩북이 수정되었습니다.');
            navigate(`/look/${lookbookId}`);
        } catch (error) {
            console.error('Error:', error);
            alert('룩북 수정에 실패했습니다.');
        }
    };

    return (
        <>
            <Backbutton />
            <form onSubmit={handleSubmit} className="space-y-4 mb-16">
                {imagePreviewUrl ? (
                    <div onClick={triggerFileSelectPopup} style={{ cursor: 'pointer' }}>
                        <img src={imagePreviewUrl} alt="미리보기" style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }} />
                        <p>이미지 변경</p>
                    </div>
                ) : (
                    <div onClick={triggerFileSelectPopup} className="w-full h-80 bg-gray-200 flex justify-center items-center cursor-pointer">
                        <p className="text-gray-500">이미지 선택</p>
                    </div>
                )}
                <input type="file" className="h-0" ref={fileInput} onChange={handleFileChange} style={{ visibility: 'hidden' }} />

                <div className="mx-3 flex justify-between items-center">
                    <p className="text-lg font-semibold cursor-pointer w-20">공개 여부</p>
                    <div>
                        <button
                            type="button"
                            className={`mr-2 ${isPublic ? 'bg-main text-white' : 'bg-gray-200'} px-4 py-1 rounded-md`}
                            onClick={() => setIsPublic(true)}
                        >
                            공개
                        </button>
                        <button
                            type="button"
                            className={`${!isPublic ? 'bg-main text-white' : 'bg-gray-200'} px-4 py-1 rounded-md`}
                            onClick={() => setIsPublic(false)}
                        >
                            비공개
                        </button>
                    </div>
                </div>


                <hr className="my-4 border-gray-200" />
                <div className="mx-3 flex flex-col justify-between">
                    <p className="text-lg font-semibold cursor-pointer w-20">태그</p>
                    <TagsInput onTagsChange={handleTagsChange} />
                </div>

                <hr className="my-4 border-gray-200" />
                <div className="mx-3 flex flex-col justify-between">
                    <p className="text-lg font-semibold cursor-pointer">코디한 옷</p>
                    <img className="mt-2" onClick={handleModalClick} src={AddClothing} alt="함께 입은 옷 추가" />
                </div>



                <div className="fixed inset-x-0 bottom-0">
                    <button
                        type="submit"
                        className="w-full h-12 bg-main text-white font-medium text-lg"
                        onClick={handleSubmit}
                    >
                        저장
                    </button>
                </div>
            </form>
            {isModalOpen && <AddClothingModal onClose={handleCloseModal} />}
        </>
    );
}
