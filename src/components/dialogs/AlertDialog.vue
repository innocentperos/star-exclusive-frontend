<template>
  <div v-show="modelValue" class="h-screen w-screen fixed top-0 left-0 z-30">
    <div class="w-full h-full relative">
      <div
        @click.stop="overlayClicked"
        class="h-full w-full absolute top-0 left-0 bg-slate-500/40 backdrop-blur-sm"
      ></div>

      <div
        class="w-full md:w-3/4 lg:w-1/2 absolute md:top-1/2 top-0 left-1/2 -translate-x-1/2 md:-translate-y-1/2 shadow-lg bg-white flex flex-col space-y-4"
      >
        <div class="h-full w-full relative">
          <div
            v-if="loading"
            class="absolute top-0 left-0 bottom-0 right-0 bg-slate-500/5 z-50"
          ></div>
          <slot name="title">
            <span
              class="text-sm text-indigo-700 uppercase font-semibold py-8 lg:py-16 px-8 lg:px-16 block"
              >{{ title }}</span
            >
          </slot>

          <span class="block px-8 lg:px-16">
            <slot>
              {{ body }}
            </slot>
          </span>

          <div
            v-if="props.noAction == false"
            class="w-full py-8 lg:py-16 px-8 lg:px-16"
          >
            <slot name="actions">
              <div class="flex">
                <div class="mx-auto"></div>
                <Btn @click="close" color="primary">Close</Btn>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Btn from "../../ui/Btn.vue";

const props = defineProps({
  title: String,
  body: String,
  modelValue: Boolean,
  noAction: Boolean,
  loading: Boolean,
  presistent: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["update:model-value"]);

function overlayClicked($event) {
  if (!props.presistent) {
    close();
  }
}
function close() {
  emits("update:model-value", false);
}
</script>
