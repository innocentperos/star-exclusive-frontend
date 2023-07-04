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
        @change="copyReservationForm"
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
            'scale-100 bg-indigo-800 text-white shadow-md':
              i == selectedRoomCategory,
            'w-4/5 md:w-2/5 lg:w-1/5': roomCategories.length > 3,
            'w-4/5 lg:w-1/3 mx-auto': roomCategories.length <= 3,
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

      <GuestForm
        v-if="selectedRoomCategory > -1 && loadedAvailableCategories"
        @change="copyGuestForm"
      >
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

  <section
    class="pb-32 h-screen w-screen fixed top-0 left-0 bg-white z-50 overflow-y-auto"
  >
    <div
      class="py-6 px-6 flex flex-col justify-center bg-indigo-700 text-white"
    >
      <span class="text-xl">45528A</span>
      <span class="text-lg">BOOKING INFORMATION</span>
    </div>

    <div class="px-32 py-6">
      <div class="flex flex-col">
        <span class="text-sm">Name</span>
        <span class="text-lg">Mathew James</span>
      </div>
    </div>

    <div class="bg-slate-600/30 w-full h-px"></div>

    <div class="px-32 py-6 flex space-x-12">
      <div class="flex flex-col grow">
        <span class="text-sm">Phone Number</span>
        <span class="text-lg">090****56</span>
      </div>
      <div class="flex flex-col grow">
        <span class="text-sm">EMail Address</span>
        <span class="text-lg">ma******es@gmail.com </span>
      </div>
    </div>

    <div class="bg-slate-600/20 w-full h-px"></div>

    <ul class="px-32">
      <span class="block py-8">Tag Along Guests</span>
      <li
        v-for="i in 4"
        :key="i"
        class="items-center flex border-b last:border-b-transparent border-b-slate-900/10"
      >
        <span class="px-16">{{ i }}</span>
        <div class="py-4">
          <div class="flex flex-col">
            <span class="text-xs">Name</span>
            <span class="text-md">Mathew James</span>
          </div>
        </div>
      </li>
    </ul>

    <div class="bg-slate-600/20 w-full h-px"></div>

    <div class="px-32">
      <span class="block py-8">Booked Room</span>

      <div class="flex flex-row-reverse">
        
        <div class="flex flex-col space-y-2 grow h-full">
          <span class="text-2xl">Room 16</span>
          <span class="text-2xl">Proffesional Suite</span>
          <span class="text-6xl font-black mt-auto">N86,000</span>
        </div>

        <div class="relative aspect-square overflow-hidden rounded-lg h-[12rem] mr-16 grow-0">
          <img
            class="object-cover aboslute top-0 left-0 h-full w-full"
            src="/src/assets/rooms/teir-5.jpg"
            alt=""
          />
        </div>
      </div>

     
    </div>
    <div class="flex flex-col mx-32 mt-32">
      <InputField label="Email Address" description = "Enter your email address to canccel the reservation"></InputField>
      <InputField class="mt-2" label="Identification Number" description = "Enter the identification number you provided during the booking process"></InputField>

      <Btn  color="error" class="shrink-0 mt-6 h-[60px] ">
        Cancel Reservation
      </Btn>
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
import InputField from "../ui/InputField.vue";
import { useFetch } from "../composables/useFetch";
import { getRoomCover, formatPrice } from "../configs";
import ReservationForm from "./forms/ReservationForm.vue";
import GuestForm from "./forms/GuestForm.vue";

const selectedRoomCategory = ref(-1);
const roomCategories = ref([]);
const loadingCategories = ref(false);
const loadedAvailableCategories = ref(false);

const bookingOptions = ["Reservation", "Booking"];
const selectedBookingOption = ref(bookingOptions[0]);

const _forms = ref({
  guest: {},
  reservation: {},
});

function _loadingAvailableCategories(state) {
  loadingCategories.value = state;
  if (state) {
    loadedAvailableCategories.value = false;
  }
}

function _loadedAvailableCategories(state) {
  roomCategories.value = state;
  loadedAvailableCategories.value = true;
}

function copyGuestForm(form) {
  _forms.value.guest = form;
}
function copyReservationForm(form) {
  alert("Hello");
  _forms.value.reservation = form;
}
</script>
