<template>
  <div v-show="modelValue" class="h-screen w-screen fixed top-0 left-0 z-30">
    <div class="w-full h-full relative">
      <div
      @click.stop="overlayClicked"
        class="h-full w-full absolute top-0 left-0 bg-slate-500/40 backdrop-blur-sm"
      ></div>

      <div
        class="p-8 lg:p-16 w-3/4 lg:w-1/2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg bg-white flex flex-col space-y-4"
      >
        <slot name="title">
          <span class="text-lg">{{ title }}</span>
        </slot>
        <slot>
          <span>{{ body }}</span>
        </slot>
        <slot name="actions">
            <div class="w-full flex">
          <div class="mx-auto"></div>
          <Btn @click="close" color="primary">Close</Btn>
        </div>
        </slot>
      </div>
    </div>
  </div>
</template>


<script setup>
import Btn from '../../ui/Btn.vue';

const props = defineProps({
  title: String,
  body: String,
  modelValue:Boolean,
  presistent: {
    type:Boolean,
    default:false
  }
});

const emits = defineEmits(["update:model-value"])

function overlayClicked($event){
    if(!props.presistent){
        close()
    }
}
function close() {
    emits("update:model-value", false)
}
</script>
