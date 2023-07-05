<template>
  <div
    class="h-24 flex items-center fixed top-0 left-0 z-30 bg-white w-screen shadow-sm px-12"
  >
    <div>
      <span class="text-2xl uppercase font-bold text-indigo-700"
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
        @click="toggle_cancel_dialog(true)"
      >
        Cancel Reservation
      </li>
    </ul>
  </div>
</template>

<script setup>
    import { useShareState } from "../composables/shareState";
    const { toggle_cancel_dialog, cancel_dialog_model } = useShareState();
</script>
