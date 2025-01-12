const CharityItem = ({ charity }) => {
  return (
    <div className="hover:shadow-2xl cursor-pointer border h-60 border-stone-500 rounded-lg flex gap-5 p-5">
      {/* 이미지 섹션 */}
      <div className="w-[15rem] h-full">
        <div className="w-full h-full bg-slate-600 rounded-md">
          <div className="relative w-full h-full overflow-hidden">
            {/* 배경 이미지 */}
            <img
              src={charity.avatar}
              alt="Charity Avatar"
              className="absolute top-1/2 left-1/2 w-full h-full object-cover transform -translate-x-1/2 -translate-y-1/2 blur-sm brightness-50"
              loading="lazy"
            />
            {/* 전경 이미지 */}
            <img
              src={charity.avatar}
              alt="Charity Avatar"
              className="absolute top-1/2 left-1/2 w-[85%] transform -translate-x-1/2 -translate-y-1/2"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* 텍스트 섹션 */}
      <div className="flex flex-col text-sm h-full p-4 rounded-md">
        <div className="mb-auto flex flex-col gap-3">
          <p className="text-gray-500 text-xs">Organization Name</p>
          <p className="font-bold text-lg text-gray-800 mb-1">
            {charity.organization_name}
          </p>
          <p className="text-gray-600 text-sm">{charity.category}</p>
        </div>
        <p className="text-gray-500 text-sm">
          {new Date(charity.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default CharityItem;
