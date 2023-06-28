<script setup>
import AppHeader from "./ui/Header.vue";
import Lander from "./components/Lander.vue";
import OurRooms from "./components/OurRooms.vue";
import AboutUs from "./components/AboutUs.vue";
import Services from "./components/Services.vue";
import Book from "./components/Book.vue";
import FooterVue from "./components/Footer.vue";
</script>

<template>
  <div class="w-full font-serif grid grid-cols-1 overflow-x-hidden gap-12">
    <AppHeader />

    <Lander />
    
    <AboutUs />

    <OurRooms />

    <Book/>

    <Services/>

    <FooterVue/>
    

  </div>
</template>

<style scoped></style>
