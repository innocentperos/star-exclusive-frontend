<template>
  <section
    class="w-screen min-h-screen lg:p-24 xl:p-32 py-4 from-indigo-700/10 to-indigo-700/20 bg-gradient-to-br flex flex-col"
  >
    <div class="col-span-3 text-center flex flex-col itens-center space-y-4">
      <span class="text-2xl lg:text-5xl">Make A Booking</span>

      <ul class="flex items-center justify-center lg:py-16 px-4">
        <li v-for="option in bookingOptions"  
        :key="option"
        class="text-sm lg:text-md uppercase flex-1 md:flex-initial md:w-64 border-2 border-indigo-600 bg-indigo-600 text-white p-3 lg:p-6 first:rounded-l-full last:rounded-r-full duration-150 tracking-wider "
        :class = "{
            'bg-transparent !text-indigo-600':selectedBookingOption!=option
        }"
        @click = "selectedBookingOption = option"
        >{{option}}</li>
        
      </ul>
    </div>

    <form class="">
      <div class="w-full ">
        <div class="flex lg:px-32 flex-col px-4">
          <div class="flex  flex-col lg:flex-row justify-center lg:space-x-4 my-4">
            <InputField
              label="Arrival Date"
              description="The date you will be coming to the hotel"
              type="date"
            ></InputField>
            <InputField
              label="Departure Date"
              description="The date you will be leaving the hotel"
              type="date"
            ></InputField>
          </div>

          <div class="flex flex-col lg:flex-row justify-center lg:space-x-4 my-4">
            <InputField label="Number of Guest"></InputField>
            <InputField label="Number of Rooms"></InputField>
          </div>

          <div class="md:w-1/2 md:mx-auto my-8 mb-16">
            <button
              class="w-full border-indigo-700 hover:bg-indigo-200 duration-300 text-indigo-700 border-2 font-sans tracking-wider text-center h-[64px] rounded-tl-3xl"
            >
              CHECK ROOM AVAILABILITY
            </button>
          </div>
        </div>

       <div class="w-screen lg:w-full flex flex-row lg:justify-around lg:space-x-0 space-x-4 px-4 overflow-y-visible overflow-x-auto">

        <div v-for="room,i in Rooms"
        :key="i"
        @click="selectedRoom = i"
        :class="{
            'scale-95 bg-slate-700/10 hover:bg-indigo-800/10 text-black': i != selectedRoom,
            'scale-100 bg-indigo-800 text-white shadow-md': i == selectedRoom,

        }"
         class="w-3/5 md:w-2/5 lg:w-1/5 duration-150 rounded-md shrink-0 grow-0 p-4">

         <div class="w-full aspect-square overflow-hidden relative rounded-md">
            <img :src="'/src/assets/rooms/teir-'+(i+1)+'.jpg'" alt=""
            class="absolute top-0 left-0 h-full w-full object-cover object-center"
            >
         </div>
         <div class="flex flex-col space-y-1 my-3">
            <span class="text-lg">{{ room.title }}</span>
            <span class="text-2xl font-bold">N{{ room.price }}</span>
            
         </div>
        </div>
       </div>

        <div class="flex lg:px-32 flex-col px-4">
          <div class="flex flex-col lg:flex-row justify-center lg:space-x-4 my-4">
            <InputField label="First Name"></InputField>
            <InputField label="Last Name"></InputField>
          </div>
          <div class="flex flex-col lg:flex-row justify-center lg:space-x-4 my-2">
            <InputField label="Phone Number"></InputField>
            <InputField label="Email Address"></InputField>
          </div>
          <div class="flex flex-col lg:flex-row justify-center lg:space-x-4 my-2">
            <InputField
              type="select"
              label="Identification Type"
              :options="IdentificatioOptions"
            ></InputField>
            <InputField label="Identification Issued Number"></InputField>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<script setup>
import { ref } from "vue";
import InputField from "../ui/InputField.vue";

const selectedRoom = ref(-1);

const Rooms = [
  { title: "Sensational Suite", price: "40,000" },
  { title: "Junior Suite", price: "16,000" },
  { title: "Cozy Comfort", price: "45,000" },
  { title: "Full Royalty", price: "60,000" },
  { title: "Exclusive Suite", price: "80,000" },
];

const IdentificatioOptions = [
  "National ID (Nigeria Issued)",
  "Driver`s Liences (Nigeria Issued)",
  "International Passport",
  "Voter`s Card (Nigeria Issued)",
];

const bookingOptions = ['Reservation','Booking'];

const selectedBookingOption = ref(bookingOptions[0])
</script>
