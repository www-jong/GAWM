import { useNavigate } from 'react-router-dom';

export default function AddInCloset({ onClose }) {
  const navigate = useNavigate(); // useNavigate 훅
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  // 버튼 누르면 옷 추가 페이지로 보내는거
  const handleAddClothes = () => {
    navigate('/closet/add'); // 프로그래매틱 네비게이션
    onClose(); // 모달 닫기
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
        <button className="bg-gray-200 text-black rounded-lg px-4 py-2 mb-2 w-full" onClick={handleAddClothes}>옷 추가</button>
        <button className="bg-gray-200 text-black rounded-lg px-4 py-2 w-full" onClick={handleAddLook}>감각 추가</button>
      </div>
    </div>
  );
}
