<template>
  <div class="c ">
    <div
      class="h-28 px-32 w-full justify-center text-xl text-indigo-700 font-bold flex items-center uppercase"
    >
      <span>Our Exclusive Services </span>
    </div>

    <div class="w-full flex flex-col justify-center space-y-24">
      <ServiceItem
      v-for="(service, i) in Services"
        :key="i"
       :i="i"
       :title="service.title"
       :color="service.color"
       :path="service.path"
      >

      </ServiceItem>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ServiceItem from "../ui/ServiceItem.vue";

const Services = [
  { title: "NIGHT CLUB", color:"text-indigo-600", path:"/src/assets/bar/"},
  { title: "Resturant", color:"text-red-600",  path:"/src/assets/restuarant/" },
  { title: "BAR", color:"text-rose-600",  path:"/src/assets/bar/" },
  { title: "Gym", color:"text-teal-600",  path:"/src/assets/gym/" },
  { title: "Pool", color:"text-blue-600" ,  path:"/src/assets/pool/"},
];

const selectedRoom = ref(-1);
</script>
