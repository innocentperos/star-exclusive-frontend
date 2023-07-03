<template>
  <section
    class="w-screen min-h-screen lg:p-24 xl:p-32 py-4 from-indigo-700/10 to-indigo-700/20 bg-gradient-to-br flex flex-col"
  >
    <div class="col-span-3 text-center flex flex-col itens-center space-y-4">
      <span class="text-2xl lg:text-5xl">Make A Booking</span>

      <ul class="flex items-center justify-center lg:py-16 px-4">
        <li
          v-for="option in bookingOptions"
          :key="option"
          class="text-sm lg:text-md uppercase flex-1 md:flex-initial md:w-64 border-2 border-indigo-600 bg-indigo-600 text-white p-3 lg:p-6 first:rounded-l-full last:rounded-r-full duration-150 tracking-wider"
          :class="{
            'bg-transparent !text-indigo-600': selectedBookingOption != option,
          }"
          @click="selectedBookingOption = option"
        >
          {{ option }}
        </li>
      </ul>
    </div>

    <div class="w-full">
      <ReservationForm
        @loading="_loadingAvailableCategories"
        @available="_loadedAvailableCategories"
      ></ReservationForm>

      <div
        v-if="loadingCategories"
        class="w-32 aspect-square rounded-full border-4 border-transparent border-t-indigo-700 animate-spin mx-auto"
      ></div>
      <div
        v-if="loadedAvailableCategories && !loadingCategories"
        class="w-screen lg:w-full flex flex-row lg:justify-around lg:space-x-0 space-x-4 px-4 overflow-y-visible overflow-x-auto small-scroll-bar"
      >
        <div
          v-for="(room, i) in roomCategories"
          :key="i"
          @click="selectedRoomCategory = i"
          :class="{
            'scale-95 bg-slate-700/10 hover:bg-indigo-800/10 text-black':
              i != selectedRoomCategory,
            'scale-100 bg-indigo-800 text-white shadow-md': i == selectedRoomCategory,
            'w-4/5 md:w-2/5 lg:w-1/5':roomCategories.length>3,
            'w-4/5 lg:w-1/3 mx-auto': roomCategories.length<=3
          }"
          class="duration-150 rounded-md shrink-0 grow-0 p-4"
          
        >
          <div class="w-full aspect-square overflow-hidden relative rounded-md">
            <img
              :src="getRoomCover(room)"
              alt=""
              class="absolute top-0 left-0 h-full w-full object-cover object-center"
            />
          </div>
          <div class="flex flex-col space-y-1 my-3">
            <span class="text-lg">{{ room.title }}</span>
            <span class="text-2xl font-bold"
              >N{{ formatPrice(room.price) }}</span
            >
          </div>
        </div>
      </div>

      <GuestForm v-if="selectedRoomCategory > -1 && loadedAvailableCategories">

      </GuestForm>

      <div class="md:w-1/2 md:mx-auto my-8 mb-16">
      <button
        class="w-full border-indigo-700 hover:bg-indigo-200 duration-300 text-indigo-700 border-2 font-sans tracking-wider text-center h-[64px] rounded-tl-3xl"
        @click="check"
      >
        CONTINUE WITH RESERVATION
      </button>
    </div>
    </div>
  </section>
</template>

<style scoped>
.small-scroll-bar {
  scrollbar-width: thin;
}
</style>
<script setup>
import { ref } from "vue";
import Btn from "../ui/Btn.vue";
import { useFetch } from "../composables/useFetch";
import { getRoomCover, formatPrice } from "../configs";
import ReservationForm from "./forms/ReservationForm.vue";
import GuestForm from "./forms/GuestForm.vue";

const selectedRoomCategory = ref(-1);
const roomCategories = ref([]);
const loadingCategories = ref(false);
const loadedAvailableCategories = ref(false)

const bookingOptions = ["Reservation", "Booking"];
const selectedBookingOption = ref(bookingOptions[0]);

function _loadingAvailableCategories(state) {
  loadingCategories.value = state;
  if (state ){
    loadedAvailableCategories.value = false
  }
}

function _loadedAvailableCategories(state) {
  roomCategories.value = state;
  loadedAvailableCategories.value = true
}

</script>
