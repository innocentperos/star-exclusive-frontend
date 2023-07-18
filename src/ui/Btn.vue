<template>
  <button
    class="border-2 relative font-sans tracking-wider text-center uppercase overflow-hidden"
    :class="styling"
    @click="clicked"
    :disabled="disabled == true || loading == true"
  >
    <slot></slot>

    <div v-if="loading == true" class="absolute top-0 left-0 h-full w-full bg-indigo-600/10 z-10">
      <div
        class="relative h-full aspect-square -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 p-2"
      >
        <div
          class="h-full w-full border-4 border-t-transparent animate-spin rounded-full border-indigo-700"
        ></div>
      </div>
    </div>
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  curved: {
    type: Boolean,
    default: () => false,
  },
  disabled: {
    type: Boolean,
    default: () => false,
  },
  block: {
    type: Boolean,
    default: () => false,
  },
  action: {
    type: Boolean,
    default: () => false,
  },
  loading: {
    type: Boolean,
    default: () => false,
  },
  color: {
    type: String,
    default: "primary",
  },
});

const colorMapping = {
  primary: "border-indigo-700 text-indigo-700 hover:bg-indigo-200",
  success: "border-teal-600 text-teal-600 hover:bg-teal-200",
  error: "border-rose-600 text-rose-600 hover:bg-rose-200",
  warning: "border-yellow-600 text-yellow-600 hover:bg-yello-200",
};

const emits = defineEmits(["click"]);

function clicked($event) {
  emits("click", $event);
}

const styling = computed(() => {
  let s = {};
  s[colorMapping[props.color]] = true;

  if (props.curved) {
    s["rounded-tl-3xl"] = true;
  }
  if (props.block) {
    s["w-full"] = true;
  } else {
    s["px-3 md:px-8"] = true;
  }

  if (props.action) {
    s["py-6"] = true;
  } else {
    s["py-4 md:py-4 text-sm"] = true;
  }

  return s;
});
</script>
