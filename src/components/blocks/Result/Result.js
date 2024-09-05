import React from 'react';

const Result = ({ imageRef, boardData, imageUrl, handleDownload }) => {
  const origianlUrl = imageUrl['ORIGINAL'].url;
  const combinedUrl = imageUrl['COMBINE'].url;

  return (
    <div id="result-image" className="border-none">
      <div className="mb-1 border-none" />
      <div className="text-sky-500 flex items-center text-sm border-none hover:text-sky-600">
        <span className="mr-1 ">사진을 클릭하시면 이미지 저장이 가능해요</span>
        <p className={`${origianlUrl ? 'animate-bounce' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v4.59L7.3 9.24a.75.75 0 0 0-1.1 1.02l3.25 3.5a.75.75 0 0 0 1.1 0l3.25-3.5a.75.75 0 1 0-1.1-1.02l-1.95 2.1V6.75Z"
              clip-rule="evenodd"
            />
          </svg>
        </p>
      </div>
      <div className="relative border-none">
        {combinedUrl && (
          <img
            onClick={handleDownload}
            className="absolute z-20 cursor-pointer"
            src={combinedUrl}
            alt="보드판 이미지"
          />
        )}
      </div>
      <div ref={imageRef} className={`relative border-none`}>
        {origianlUrl ? (
          <>
            <img className="cursor-pointer" src={origianlUrl} alt="선택 이미지" />
            <tbody className="absolute left-0 bottom-0 bg-white text-xs">
              {boardData.map((data, index) => {
                const { title, content } = data;
                return (
                  <tr key={index} style={{ fontSize: '10px', fontWeight: '500', lineHeight: '1' }}>
                    {title && <td class="border truncate w-10">{title}</td>}
                    {title && <td class="border truncate">{content}</td>}
                  </tr>
                );
              })}
            </tbody>
            <img id="logo-image" src="/images/logo.png" className="absolute bottom-2 right-2 h-5" alt="logo" />
          </>
        ) : (
          <p className="flex h-24 justify-center items-center "></p>
        )}
      </div>
      {origianlUrl && <div className="h-24" />}
    </div>
  );
};

export default Result;
