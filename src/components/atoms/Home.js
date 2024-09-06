import React, { useState } from 'react';
import Board from '../blocks/Board';

import Dropdown from '../../atoms/Dropdown';
import Camera from '../blocks/Camera';
import Photo from '../blocks/Photo';
import Share from '../blocks/Share';
import Combine from '../blocks/Combine';
import Result from '../blocks/Result';
import Profile from '../blocks/Profile';

const Home = ({ BOARD_BUTTON_LIST, seletedBoard, handleLogout, imageRef, handleSelect }) => {
  const [isOpend, setIsOpend] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div className="flex flex-col h-screen sm:py-6">
      {modalVisible && <Profile {...{ modalVisible }} {...{ setModalVisible }} />}
      <div
        className={`${
          modalVisible ? 'opacity-10' : 'bg-white'
        } overflow-auto px-3 pt-4 shadow-xl ring-1 ring-gray-900/5 h-screen sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-6`}
      >
        <div className="mx-auto max-w-md">
          <div className="flex justify-between items-center pb-1.5 text-black">
            <img className="h-7" src="/images/logo.png" alt="kt logo" />

            {/* Header 부분 */}
            <div className="flex justify-center items-center">
              <div className="flex font-semibold text-gray-500 mx-3 cursor-pointer">
                <button
                  onClick={() => {
                    setIsOpend(!isOpend);
                  }}
                  type="button"
                  class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 text-sky-500 hover:bg-gray-50 "
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  {seletedBoard.title}
                  <svg
                    class="-mr-1 h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <Dropdown
                itemList={BOARD_BUTTON_LIST}
                {...{ isOpend }}
                {...{ setIsOpend }}
                {...{ handleSelect }}
              />
              <div
                onClick={() => {
                  setModalVisible(!modalVisible);
                }}
                className="flex font-semibold text-gray-500 cursor-pointer text-sm mr-2 hover:text-black"
              >
                프로필
              </div>
              <div
                onClick={handleLogout}
                className="flex font-semibold text-gray-500 cursor-pointer text-sm hover:text-black"
              >
                로그아웃
              </div>
            </div>
          </div>
          <div class="divide-y divide-gray-300/50">
            <Board />
            <div id="main-container" className="flex justify-between items-center pt-1 ">
              <Camera />
              <Photo />
              <Share {...{ imageRef }} />
              <Combine {...{ imageRef }} />
            </div>
            <Result {...{ imageRef }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
