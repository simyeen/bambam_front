<script setup>
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { HeartIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { PencilIcon, PlusIcon } from '@heroicons/vue/20/solid';

const {
  open,
  onToggle2,
  fileInput,
  triggerFileInput,
  handleChange,
  handleFileChange,
  handleSubmit
} = defineProps({
  open: Boolean,
  onToggle2: Function,
  triggerFileInput: Function,
  fileInput: Function,
  handleChange: Function,
  handleFileChange: Function,
  handleSubmit: Function
});
</script>

<template>
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-10" @close="onToggle2">
      <TransitionChild
        as="template"
        enter="ease-in-out duration-500"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in-out duration-500"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="pointer-events-auto relative w-96">
                <TransitionChild
                  as="template"
                  enter="ease-in-out duration-500"
                  enter-from="opacity-0"
                  enter-to="opacity-100"
                  leave="ease-in-out duration-500"
                  leave-from="opacity-100"
                  leave-to="opacity-0"
                >
                  <div class="absolute left-0 top-16 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      class="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                      @click="onToggle2"
                    >
                      <span class="absolute -inset-2.5" />
                      <span class="sr-only">Close panel</span>
                      <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </TransitionChild>
                <div class="mt-16 h-full overflow-y-auto bg-white p-8">
                  <div class="space-y-6 pb-16">
                    <div>
                      <div class="aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg">
                        <div class="mt-2 flex items-center gap-x-3">
                          <button
                            @click="triggerFileInput"
                            type="button"
                            class="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            <svg
                              class="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
                              />
                            </svg>
                            <span class="mt-2 block text-sm font-semibold text-gray-900"
                              >사진을 넣어주세요</span
                            >
                          </button>
                        </div>
                        <input
                          type="file"
                          name="image"
                          id="image"
                          autocomplete="image"
                          class="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          @change="handleChange"
                        />
                      </div>
                      <div class="mt-4 flex items-start justify-between">
                        <div>
                          <h2 class="text-base font-semibold leading-6 text-gray-900">
                            <span class="sr-only">Details for </span>IMG_4985.HEIC
                          </h2>
                          <p class="text-sm font-medium text-gray-500">50 MB 제한</p>
                        </div>
                        <button
                          type="button"
                          class="relative ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <span class="absolute -inset-1.5" />
                          <HeartIcon class="h-6 w-6" aria-hidden="true" />
                          <span class="sr-only">Favorite</span>
                        </button>
                      </div>
                    </div>
                    <div>
                      <div class="sm:col-span-4">
                        <div class="mt-2">
                          <div
                            class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                          >
                            <input
                              type="text"
                              name="feedDate"
                              id="feedDate"
                              autocomplete="feedDate"
                              class="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                              placeholder="날짜"
                              @change="handleChange"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="sm:col-span-4">
                        <div class="mt-2">
                          <div
                            class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                          >
                            <input
                              type="text"
                              name="foodType"
                              id="foodType"
                              autocomplete="foodType"
                              class="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                              placeholder="먹이 종류"
                              @change="handleChange"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="sm:col-span-4">
                        <div class="mt-2">
                          <div
                            class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                          >
                            <input
                              type="text"
                              name="quantity"
                              id="quantity"
                              autocomplete="quantity"
                              class="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                              placeholder="급여한 양"
                              @change="handleChange"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="flex">
                      <button
                        @click="handleSubmit"
                        type="button"
                        class="flex-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        저장하기
                      </button>
                      <button
                        type="button"
                        class="ml-3 flex-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        @click="onToggle2"
                      >
                        취소하기
                      </button>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
