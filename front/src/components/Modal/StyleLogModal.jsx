import { useNavigate } from 'react-router-dom';

export default function StyleLog({ onClose }) {
  const navigate = useNavigate(); // useNavigate 훅
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
      <div className="fixed bottom-0 right-0 mb-36 mr-3 p-4 bg-white rounded-xl shadow-lg flex flex-col items-center" onClick={handleModalContentClick}>
        <p>옷뜨는모달모달임하이요</p>
      </div>
    </div>
  );
}
