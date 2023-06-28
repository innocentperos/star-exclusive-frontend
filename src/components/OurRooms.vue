<template>
  <div class="min-h-screen w-full lg:px-32">
    <div class="h-28 text-xl text-indigo-700 font-bold flex items-center uppercase" >
        <span>Our Rooms</span>
    </div>

    <div class="grid lg:grid-cols-2  w-full gap-6 lg:gap-16">
      <div class="grid w-full lg:grid-cols-[1fr,2fr] lg:grid-rows-[auto, 1fr]">
        <ul class="lg:col-start-2 text-2xl lg:text-4xl flex flex-row lg:flex-col font-serif text-indigo-950/50 space-x-6 lg:space-x-0 lg:space-y-6 overflow-x-auto px-6">
          <li @click="selectedRoom = i"  v-for="room,i in Rooms" :key="i" 
          :class="{'text-indigo-700 lg:pl-8 lg:pt-0 pt-4':selectedRoom == i}" 
          class="hover:text-indigo-500  duration-150 cursor-pointer shrink-0 grow-0"> {{ room.title }}</li>
        </ul>

        
      </div>

      <div>
        <div class="w-full aspect-[14/8] overflow-hidden relative">
        <img class="object-cover top-0 left-0 w-full h-full absolute" :src="'/src/assets/rooms/teir-'+(selectedRoom + 1)+'.jpg'" alt="">
      </div>
      <div class="p-8">
          <div class="flex flex-col">
            <span class="text-6xl font-semibold">N{{ Rooms[selectedRoom].price }}</span>
          <span class="text-xl uppercase font-sans">Per Night</span> 
          </div>
        </div>
      <div class="text-lg text-justify p-8 pt-0">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti vitae veniam nobis assumenda ullam beatae omnis officiis. Molestiae illum deserunt iusto aspernatur dicta expedita, adipisci est provident iste non, optio reiciendis. Porro expedita ea eligendi accusantium obcaecati dolore illum molestiae, rerum quibusdam veritatis impedit iste eveniet reprehenderit voluptatibus culpa, perspiciatis mollitia est itaque unde iure officiis? Pariatur id veritatis ipsa non. Sint quos ipsam dolores fuga, itaque repellat doloremque nostrum, facilis, quod voluptates commodi. Assumenda optio consectetur in at repudiandae, expedita accusantium ipsum dignissimos, exercitationem blanditiis officiis repellendus doloribus atque molestias voluptatum fuga iusto! Voluptates enim deserunt consequatur quam illo.
      </div>

      <div class="p-6 py-0">
        <button class="w-full border-indigo-700 hover:bg-indigo-200 duration-300 text-indigo-700 border-2 font-sans tracking-wider text-center h-[64px] rounded-tl-3xl">
                BOOK ROOM
            </button>
      </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';


const Rooms = [
    {title:"Sensational Suite", price:"40,000"},
    {title:"Junior Suite", price:"16,000"},
    {title:"Cozy Comfort", price:"45,000"},
    {title:"Full Royalty", price:"60,000"},
    {title:"Exclusive Suite", price:"80,000"}
]

const selectedRoom = ref(1)
</script>