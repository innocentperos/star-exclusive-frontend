<template>
    <div
        class="w-full grid lg:grid-cols-5 grid-cols-1"
      >
        <div
          class="lg:row-start-1 lg:gap-x-8 gap- grid lg:grid-cols-[140px,auto,140px] grid-rows-[auto,auto] lg:grid-rows-[1fr]"
          :class="{
            'lg:col-start-1 lg:col-end-4 lg:pr-8 ': i % 2 == 1,
            'lg:col-start-3 lg:col-end-6 lg:pl-8': i % 2 == 0,
          }"
        >
          <div class="w-full relative overflow-hidden aspect-video shadow-lg row-start-1 row-end-3" 
          :class="{
            'lg:col-start-1 lg:col-end-3':i%2 == 1,
            'lg:col-start-2 lg:col-end-4':i%2 == 0,

          }"
          >
            <img
            :src="path + selected + '.jpg'"
              alt=""
              class="object-cover object-center h-full w-full top-0 left-0 absolute scale-110 hover:scale-100 duration-150"
            />
          </div>

          <div class="flex flex-row lg:row-start-1 lg:flex-col lg:space-y-2 space-x-2 lg:space-x-0 row-start-3 h-full w-full mt-2 lg:mt-0 p-4"
           :class="{
            'lg:col-start-3':i%2 == 1,
            'lg:col-start-1 lg:col-end-2':i%2 == 0,

          }">
            <div
              v-for="i in 4"
              :key="i"
              class=" aspect-video lg:aspect-auto relative object-cover overflow-hidden lg:w-full lg:h-1/3 w-1/4 h-full lg duration-300  rounded-lg "
              :class="{'border-indigo-200 border-4 shadow-xl ': selected == i, ' border-0 border-indigo-50/0 ': selected != i}"
              @click="selected = i"
            >
              <img
              class="object-cover absolute top-0 left-0 w-full h-full"
                :src="path + i + '.small.jpg'"
                alt=""
              />
            </div>
          </div>
        </div>
        <div
          :class="{
            'lg:col-start-4 lg:col-end-6  lg:pr-32': i % 2 == 1,
            'lg:col-start-1 lg:col-end-3  lg:pl-32': i % 2 == 0,
          }"
          class="lg:row-start-1 text-justify flex flex-col-reverse lg:flex-col"
        >
          <div class="h-full flex flex-col p-8 lg:p-0">
            <span class="block my-auto uppercase text-3xl py-6 lg:text-6xl font-extrabold" :class="color">{{ title }}</span>

          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis et
            non voluptatibus voluptate rem ut nulla facere voluptatem sint, eum
            odio doloremque atque porro deserunt, iste error debitis, aut
            dignissimos. Saepe fugiat sequi, consectetur eaque nihil ex
            obcaecati recusandae alias possimus consequuntur quam ipsam ea
            laborum labore impedit, deserunt nam? Exercitationem deleniti
            impedit voluptate laudantium modi quisquam distinctio non inventore.
          </p>
          </div>

          <div class=" flex-row justify-around mt-auto hidden">
            <div
              v-for="i in 4"
              :key="i"
              class=" relative object-cover overflow-hidden duration-300 border-4 rounded-lg"
              :class="{'border-indigo-200 shadow-xl h-full aspect-video': selected == i, 'w-1/5 aspect-square border-indigo-50/0 ': selected != i}"
              @click="selected = i"
            >
              <img
              class="object-cover absolute top-0 left-0 w-full h-full"
                :src="path + i + '.small.jpg'"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
</template>

<script setup>
import { ref } from 'vue';


    const props = defineProps({
        title: String,
        path:String,
        color:String,
        i: Number
    })

    const selected = ref(1)
</script>