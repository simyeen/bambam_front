<script setup>
import { ref } from 'vue';
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { HeartIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { PencilIcon, PlusIcon } from '@heroicons/vue/20/solid';
import { useReptileStore } from '@/stores/reptile';
import { toImageSrl } from '@/util/data';

const { onToggle } = defineProps({
  open: Boolean,
  onToggle: Function
});

const reptileStore = useReptileStore();

const { birthDate, image, name, reptileId, speciesId, userId } = reptileStore;

const check = () => {
  console.log('reptileStore 체크', reptileStore);
};
</script>

<template>
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-10" @close="onToggle">
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
                      @click="onToggle"
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
                        <img :src="toImageSrl(image)" alt="" class="object-cover" />
                      </div>
                      <div class="mt-4 flex items-start justify-between">
                        <div>
                          <h2 class="text-base font-semibold leading-6 text-gray-900">
                            <span class="sr-only">Details for </span>{{ name }}
                          </h2>
                          {{ birthDate }}
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
                      <h3 class="font-medium text-gray-900">Information</h3>
                      <dl class="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200">
                        <div class="flex justify-between py-3 text-sm font-medium">
                          <dt class="text-gray-500">반려인</dt>
                          <dd class="text-gray-900">김남일</dd>
                        </div>
                        <div class="flex justify-between py-3 text-sm font-medium">
                          <dt class="text-gray-500">종류</dt>
                          <dd class="text-gray-900">크리스티드 개코</dd>
                        </div>

                        <div class="flex justify-between py-3 text-sm font-medium">
                          <dt class="text-gray-500">몸무게</dt>
                          <dd class="text-gray-900">9g</dd>
                        </div>
                        <div class="flex justify-between py-3 text-sm font-medium">
                          <dt class="text-gray-500">성격</dt>
                          <dd class="text-gray-900">온순함</dd>
                        </div>
                      </dl>
                    </div>
                    <div>
                      <h3 class="font-medium text-gray-900">Description</h3>
                      <div class="mt-2 flex items-center justify-between">
                        <p class="text-sm italic text-gray-500">생각보다 무척 귀여움</p>
                        <button
                          type="button"
                          class="relative -mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <span class="absolute -inset-1.5" />
                          <PencilIcon class="h-5 w-5" aria-hidden="true" />
                          <span class="sr-only">Add description</span>
                        </button>
                      </div>
                    </div>
                    <div></div>
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
