<template>
  <div class="w-full space-y-2 my-4">
    <label class="ml-8 tracking-wide" for="">{{ label }}</label>
    <input
      v-if="type != 'select'"
      min="12/12/2023"
      class="w-full shadow-md px-8 py-4 outline-none border-2 border-black/40 rounded-md hover:border-indigo-600"
      :type="type"
    />

    <div
      v-else
      class="w-full bg-white shadow-md px-8 py-4 outline-none border-2 border-black/40 rounded-md hover:border-indigo-600 relative cursor-pointer"
      @click="showOptions = !showOptions"
    >
      <span>{{ selectedOption != undefined ? selectedOption : "Nothing selected" }}</span>

      <div class="fixed z-40 top-0 left-0 w-screen h-screen bg-black/40"
      :class="{'hidden': !showOptions}">
        
      </div>
      <div 
      class="absolute -left-1 right-0
      bottom-full z-40 w-full md:w-[80%] lg:w-[120%] bg-white
      mb-2 shadow-lg
      overflow-y-auto border-2 rounded-md border-indigo-600"
      :class="{'hidden': !showOptions}"
      >
        <ul class="flex flex-col">
            <li class="px-8 py-4 tracking-wide font-sans cursor-pointer"
            :class="style(item)" 
            v-for="item,i in props.options" :key="i" @click.stop="select(item, $event)">
                {{ item }}
            </li>
        </ul>
      </div>
    </div>

    <p v-if="description" class="text-sm tracking-wide px-2 pt-4">
      {{ description }}
    </p>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  label: String,
  description: String,
  type: "text",
  options: {
    type:Array,
    default: () =>([])
  }
});

function style(item){
    return {
        "bg-indigo-600 text-white": item == selectedOption.value,
        "hover:bg-indigo-300/20" : item != selectedOption.value
    }
}

function select(item, event){
    selectedOption.value = item 

    setTimeout(()=>{
        showOptions.value = false;
    }, 100)
    
    
}
const showOptions = ref(false)
const selectedOption = ref(undefined)
</script>
