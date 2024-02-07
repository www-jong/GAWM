export default function AddInCloset({ onClose }) {
  // 모달 자체 클릭은 안 닫히게 하려고(상위 emit? 막기)
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-500" onClick={onClose}>
      <div className="fixed bottom-0 right-0 mb-36 mr-3 p-4 bg-white rounded-lg shadow-lg" onClick={handleModalContentClick}>
        <p>모달모달임하이하이요</p>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}