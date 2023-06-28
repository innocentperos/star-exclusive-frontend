<template>
  <div
    class="w-screen min-h-screen grid grid-cols-[8rem,1fr,1fr,8rem] overflow-x-hidden"
  >
    <div class="col-start-1 col-end-5 py-8 flex items-center justify-center">
      <!-- <div class="w-full h-2 bg-indigo-600/30 rounded-r-md"></div> -->
      <span class="text-4xl font-bold uppercase text-indigo-600 shrink-0 mx-4"
        >About Us</span
      >
      <!-- <div class="w-full h-2 bg-indigo-600/30 rounded-l-md"></div> -->
    </div>

    <div class="col-start-1 lg:col-start-2 col-end-6 lg:col-end-4 py-8 grid grid-cols-[1fr,2fr,1fr]">
      <div class=" col-start-1 lg:col-start-2 col-end-4 lg:col-end-3 text-lg text-justify p-4 lg:p-0">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet odit at
        odio perferendis doloribus facere quia sapiente rerum eaque sed,
        blanditiis officiis, et repellat dignissimos debitis distinctio
        voluptatibus nam dolores. Porro, numquam? Vero ratione exercitationem
        officiis, delectus iste possimus! Consequuntur, voluptatum autem, nisi
        nemo expedita ab facilis magni quam aliquid sapiente enim quo totam
        perferendis quia modi officiis tempora veritatis.
      </div>
    </div>

    <div class="col-start-1 col-end-5">
      <div class="w-full overflow-auto snap-x flex space-x-1">
        <div
          v-for="i in 5"
          :key="i"
          class="w-[calc(100vw*0.75)] snap-always snap-x first:ml-1 last:mr-1 aspect-video first:rounded-l-md last:rounded-r-md overflow-hidden snap-center grow-0 shrink-0 relative"
        >
          <img
            class="object-cover w-full h-full absolute top-0 left-0"
            :src="'/src/assets/display/'+i+'.jpg'"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const Colors = ["bg-green-700", "bg-purple-600", "bg-slate-700"];
</script>
