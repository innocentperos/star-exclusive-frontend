<template>
  <div
    class="h-16 md:h-24 flex items-center fixed top-0 left-0 z-30 bg-white w-screen shadow-sm px-8 md:px-12"
  >
    <div>
      <span class="text-lg md:text-2xl uppercase font-bold text-indigo-700"
        >Star Exclusive</span
      >
    </div>

    <div class="mx-auto"></div>
    <ul
      class="hidden md:flex flex-col md:flex-row space-x-4 text-md uppercase font-sans"
    >
      <li>Our Services</li>
      <li>Our Rooms</li>
      <li
        class="cursor-pointer hover:text-red-600"
        @click="show(true)"
      >
        Cancel Reservation
      </li>
    </ul>
  </div>
</template>

<script setup>
    import { sharedSearchDialog } from "../composables/shareState";
    
    const [state, show] = sharedSearchDialog()
</script>
