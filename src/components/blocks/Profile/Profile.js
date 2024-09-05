import React from 'react';

const Profile = ({ profileForm, modalVisible, setModalVisible, handleChange, handleSubmit }) => {
  const { email, name, branchType, centerType, team } = profileForm;

  return (
    <div>
      <div
        id="authentication-modal"
        tabindex="-1"
        aria-hidden="true"
        class="absolute overflow-y-auto overflow-x-hidden flex z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full "
      >
        <div class=" p-4 w-full max-w-md max-h-full pt-4">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="flex items-center justify-between px-4 py-2 border-b rounded-t dark:border-gray-600">
              <h3 class="text-base font-semibold text-gray-900 dark:text-white">{name}님</h3>
              <button
                onClick={() => {
                  setModalVisible(!modalVisible);
                }}
                type="button"
                class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
              >
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <div class="p-4 md:p-5">
              <form class="space-y-4" action="#">
                <div>
                  <label for="branchType" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    본부
                  </label>
                  <input
                    type="branchType"
                    name="branchType"
                    id="branchType"
                    value={branchType}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label for="centerType" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    센터
                  </label>
                  <input
                    type="centerType"
                    name="centerType"
                    id="centerType"
                    value={centerType}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label for="team" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    팀명
                  </label>
                  <input
                    type="team"
                    name="team"
                    id="team"
                    value={team}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    이메일
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                    value={email}
                    readOnly
                    onChange={handleChange}
                  />
                </div>

                <div class="flex justify-between">
                  <div class="flex items-start"></div>
                </div>
                <div className="flex space-x-2">
                  <div
                    className="flex w-full justify-center rounded-md bg-gray-100 border-solid border border-gray-400 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-700 shadow-sm hover:border-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 cursor-pointer"
                    onClick={() => {
                      if (window.confirm('정말 취소하시겠습니까? 취소하시면 수정중인 내용은 저장되지 않습니다.')) {
                        setModalVisible(!modalVisible);
                      } else {
                        console.log('취소');
                        return;
                      }
                    }}
                  >
                    취소
                  </div>
                  <div
                    className="flex w-full justify-center rounded-md bg-gray-100 border-solid border border-gray-400 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-700 shadow-sm hover:border-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 cursor-pointer"
                    onClick={() => {
                      if (window.confirm('프로필을 수정하시겠습니까?')) {
                        handleSubmit();
                      } else {
                        console.log('취소');
                        return;
                      }
                    }}
                  >
                    수정하기
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
