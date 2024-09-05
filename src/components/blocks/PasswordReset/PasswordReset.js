import React from 'react';

const PasswordReset = ({ passwordResetModalVisible, setPasswordResetModalVisible, handleChange, handleSubmit }) => {
  return (
    <div>
      <div
        id="authentication-modal"
        tabindex="-1"
        aria-hidden="true"
        class="absolute overflow-y-auto overflow-x-hidden flex z-50 p-4 w-full md:inset-0 h-[calc(100%-1rem)] h-screen"
      >
        <div class="w-full max-w-md max-h-full">
          <div class="bg-white rounded-lg shadow mt-64 dark:bg-gray-700">
            <div class="flex items-center justify-center p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">비밀번호 재설정</h3>
              <button
                onClick={() => {
                  setPasswordResetModalVisible(!passwordResetModalVisible);
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
                  <label for="email" class="block mb-2 text-sm font-medium  text-gray-900 dark:text-white">
                    이메일
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="가입했던 이메일을 입력해주세요."
                    required
                    onChange={handleChange}
                  />
                </div>
                <div
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  요청
                </div>
              </form>
              <div class="text-sm font-medium text-gray-500 mt-2 dark:text-gray-300">
                비밀번호 재설정 메일이 발송 됩니다. 변경 후 로그인 해주세요.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
