import React from 'react';

const Combine = ({ handleCombine }) => {
  return (
    <div
      id="confirm-button"
      onClick={handleCombine}
      className="flex items-center space-x-1 py-2 px-3 cursor-pointer bg-gray-100 font-semibold text-sm rounded-md transition-transform duration-10 transform hover:scale-105"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
        <path
          fill-rule="evenodd"
          d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
          clip-rule="evenodd"
        />
      </svg>
      <span>확인</span>
    </div>
  );
};

export default Combine;
