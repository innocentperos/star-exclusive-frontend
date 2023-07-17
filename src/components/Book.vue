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
        @valid = "reservationFormValid = $event"
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
          @click="selectedRoomCategory = room.pk "
          :class="{
            'scale-95 bg-slate-700/10 hover:bg-indigo-800/10 text-black':
              room.pk != selectedRoomCategory,
            'scale-100 bg-slate-400 text-white shadow-md':
              room.pk == selectedRoomCategory,
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
            <span class="text-2xl font-bold">
		    N{{ formatPrice(room.price) }}
	    </span>
	    <Btn> View Room </Btn>
          </div>
        </div>
      </div>

      <GuestForm
        v-if="selectedRoomCategory > -1 && loadedAvailableCategories"
        @valid = "guestFormValid = $event"
      >
      </GuestForm>

      <div class="md:w-1/2 md:mx-auto my-8 mb-16">
        <button
          class="w-full border-indigo-700 hover:bg-indigo-200 duration-300 text-indigo-700 border-2 font-sans tracking-wider text-center h-[64px] rounded-tl-3xl"
          @click="reserve"
          v-show="isValid"
        >
          CONTINUE WITH RESERVATION
        </button>
      </div>
    </div>

    <AlertDialog v-model="dialog.show" :title="dialog.title" :body="dialog.body">
  </AlertDialog>

    <AlertDialog v-model="dialog.booking_failed" title="Error making reservation" body="Sorry something went wrong will trying to process your reservation request.">
  </AlertDialog>


  <AlertDialog v-model="dialog.booking_success" >
    <template v-slot:title>
      <h1 class="text-lg lg:text-xl">Booking was successful</h1>
    </template>
    <span class="text-md lg:text-lg">
	    Your booking was successful, your booking id is <span class="text-indigo-700 font-bold">{{dialog.reservation_code}}</span>

      </span>

      <template v-slot:actions>
        <div class="w-full flex ">
          <div class="mx-auto"></div>
          <Btn class="mx-4" @click="view_reservation" color="primary">View Booking</Btn>
          <Btn @click="dialog.booked = false" color="primary">Close</Btn>
        </div>
      </template>
  </AlertDialog>
  </section>
</template>

<style scoped>
.small-scroll-bar {
  scrollbar-width: thin;
}
</style>
<script setup>
import { computed, ref, toRaw } from "vue";
import Btn from "../ui/Btn.vue";
import InputField from "../ui/InputField.vue";
import AlertDialog from "../components/dialogs/AlertDialog.vue";
import { useFetch } from "../composables/useFetch";
import { getRoomCover, formatPrice, API_ENDPOINT } from "../configs";
import ReservationForm from "./forms/ReservationForm.vue";
import GuestForm from "./forms/GuestForm.vue";
import {reservationFormState, customerFormState, verifyCustomerForm} from "./forms/form";

const selectedRoomCategory = ref(-1);
const roomCategories = ref([]);
const loadingCategories = ref(false);
const loadedAvailableCategories = ref(false);

const bookingOptions = ["Reservation", "Booking"];
const selectedBookingOption = ref(bookingOptions[0]);

const guestForm = customerFormState().Customerform
const guestFormValid = ref(false)
const guestsList = customerFormState().guestsForm
const reservationForm = reservationFormState()
const reservationFormValid = ref(false)

const dialog = ref({
  title:"",
  body:"",
  reservation_code:null,
  show: false,
  failed:false,
  booking_success: false,
  booking_failed:false
})

const reservation = ref({
})

const isValid = computed(()=>{
   if ( selectedRoomCategory.value > -1){
    return true
   }
   return false
})

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

async function reserve(){

  let vstatus = verifyCustomerForm()

  if (vstatus != false){
    dialog.value.body = vstatus
    dialog.value.title = "Incomplete Form"
    dialog.value.show = true 
    return
  }

  let form = {
    ...toRaw(guestForm.value),
    ...toRaw(reservationForm.value),
    room: selectedRoomCategory.value,
    guests: toRaw(guestsList.value)
  }

  console.log(form)

  try{

    let response = await fetch(
      `${API_ENDPOINT}/reservations/make_reservation/`,
      {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "content-type":"application/json"
        }
      }
    )

    console.log(response)
    if (response.ok){

    let reserve = await response.json()
    reservation.value = reserve 

    dialog.booking_success = true

    }else {
    	dialog.booking_failed = true
    }
  }catch (error){

  }
}

function view_reservation(){
	alert(JSON.stringify(reservation.value))
}

</script>
