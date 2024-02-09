import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function AddInCloset({ onClose }) {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null); // 선택된 이미지 상태 추가

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  // 옷 추가 버튼 누르면 이미지 받아서 마스킹처리
  const handleAddClothes = async(e) => {
    const image = e.target.files[0];
    if(image){
      setSelectedImage(image);
      const formData= new FormData();
      formData.append('image_file',image);
      try{
        const response = await fetch('http://localhost:8000/masking/',{
          method: 'POST',
          body: formData  
        });
        console.log(response)
        if(response.ok){
          const precessedImage = await response.blob();
          console.log(URL.createObjectURL(precessedImage))
          navigate('/closet/add', { state: { processedImageURL: URL.createObjectURL(precessedImage) }});
          onClose();
        }else{
          console.error('Server error');
        }
      }catch(error){
        console.error('사진업로드 실패',error)
        navigate('/closet/add')  // 테스트 용도
      }
    
    }
  };

  // 버튼 누르면 룩 추가 페이지로 보내는거
  const handleAddLook = () => {
    navigate('/look/add');
    onClose();
  };



  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
      <div className="fixed bottom-0 right-0 mb-36 mr-3 p-4 bg-white rounded-xl shadow-lg flex flex-col items-center" onClick={handleModalContentClick}>
        {/* 모달 제목 
        <div className="text-lg font-semibold mb-4">OOTD</div>*/}
        {/* 모달 버튼들 */}
        <input type="file" accept="image/*" onChange={handleAddClothes} style={{ display: 'none' }} id="fileInput" />
        <button className="bg-gray-200 text-black rounded-lg px-4 py-2 mb-2 w-full" onClick={() => document.getElementById('fileInput').click()}>옷 추가</button>
        <button className="bg-gray-200 text-black rounded-lg px-4 py-2 w-full" onClick={handleAddLook}>감각 추가</button>
      </div>
    </div>
  );
}
