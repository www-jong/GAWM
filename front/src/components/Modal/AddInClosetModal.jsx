export default function AddInCloset({ onClose }) {
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
      <div className="fixed bottom-0 right-0 mb-24 mr-3 p-4 bg-white rounded-xl shadow-lg flex flex-col items-center" onClick={handleModalContentClick}>
        {/* 모달 제목 */}
        <div className="text-lg font-semibold mb-4">OOTD</div>
        {/* 모달 버튼들 */}
        <button className="bg-gray-200 text-black rounded-lg px-4 py-2 mb-2 w-full" >옷 추가</button>
        <button className="bg-gray-200 text-black rounded-lg px-4 py-2 w-full" >감각 추가</button>
      </div>
    </div>
  );
}
