<template>
  <button
    class=" border-2 font-sans tracking-wider text-center uppercase"
    :class="styling"

    @click="clicked"
  >
    <slot></slot>
  </button>
</template>

<script setup>

import {computed} from "vue";

    const props = defineProps({
        curved: true,
        disabled:false,
        block: true,
        action: false,
        color:{
            type: String,
            default:  "primary"
        }
    })

    const colorMapping = {
        "primary":"border-indigo-700 text-indigo-700 hover:bg-indigo-200",
        "success":"border-teal-600 text-teal-600 hover:bg-teal-200",
        "error": "border-rose-600 text-rose-600 hover:bg-rose-200",
        "warning": "border-yellow-600 text-yellow-600 hover:bg-yello-200",
    }

    const emits = defineEmits(["click"])

    function clicked($event){
        emits("click", $event)
    }

    const styling = computed(()=>{
        let s = {}
        s[colorMapping[props.color]] = true

        if (props.curved){
            s["rounded-tl-3xl"] = true
        }
        if (props.block){
            s["w-full"] = true
        }else{
            s["px-8"] = true
        }

        if (props.action){
            s["h-[64px]"] = true
        }else{
            s["py-4 text-sm"] = true
        }
        return s;
    })
</script>