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
          @click="selectedRoomCategory = room.pk"
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
        @valid="guestFormValid = $event"
      >
      </GuestForm>


      <div class="w-full md:w-1/2 px-6 md:mx-auto my-8 mb-16">
        <Btn
          @click="reserve"
          v-show="isValid"
          :action="true"
          :loading="successReservationDialog.loading"
          :block="true"
          :curved="true"
        >
          CONTINUE WITH RESERVATION
      </Btn>
      </div>
    </div>

    <AlertDialog
      v-model="dialog.show"
      :title="dialog.title"
      :body="dialog.body"
    >
    </AlertDialog>

    <AlertDialog
      v-model="successReservationDialog.model"
      title="Reservation Successful"
      no-action
    >
      <div class="flex flex-col">
        <span v-if="!dialog.booking_payment" class="text-md md:text-lg ">
          Your booking was successful, your booking id is
          <span class="text-indigo-700 font-bold">{{
            successReservationDialog.code
          }}</span>
          <br />
          <br />
          The full detail of the reservation has been sent to your email address
          {{ successReservationDialog.email_address}}
        </span>

        <div class="w-full flex space-x-4 p-8 lg:p-16">
          <div class="mx-auto"></div>
          <Btn @click="view_reservation" color="primary">View Reservation</Btn>

          <Btn @click="successReservationDialog = false" color="primary"
            >Close</Btn
          >
        </div>
      </div>
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
import AlertDialog from "../components/dialogs/AlertDialog.vue";
import { getRoomCover, formatPrice, API_ENDPOINT } from "../configs";
import ReservationForm from "./forms/ReservationForm.vue";
import GuestForm from "./forms/GuestForm.vue";
import {
  reservationFormState,
  customerFormState,
  verifyCustomerForm,
} from "./forms/form";
import {viewReservation} from "../composables/shareState";

const selectedRoomCategory = ref(-1);
const roomCategories = ref([]);
const loadingCategories = ref(false);
const loadedAvailableCategories = ref(false);

const bookingOptions = ["Reservation", "Booking"];
const selectedBookingOption = ref(bookingOptions[0]);

const guestForm = customerFormState().Customerform;
const guestFormValid = ref(false);
const guestsList = customerFormState().guestsForm;
const reservationForm = reservationFormState();
const reservationFormValid = ref(false);

const dialog = ref({
  title: "",
  body: "",
  show: false,
});

const successReservationDialog = ref({
  model: false,
  code:"",
  email_address: "",
  loading: false
})

const reservation = ref({})

const isValid = computed(() => {
  if (selectedRoomCategory.value > -1) {
    return true;
  }
  return false;
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

async function reserve() {
  let vstatus = verifyCustomerForm();

  if (vstatus != false) {
    dialog.value.body = vstatus;
    dialog.value.title = "Incomplete Form";
    dialog.value.show = true;
    return;
  }

  let form = {
    ...toRaw(guestForm.value),
    ...toRaw(reservationForm.value),
    room: selectedRoomCategory.value,
    guests: toRaw(guestsList.value),
  };

  console.log(form);

  try {
    successReservationDialog.value.loading = true
    let response = await fetch(
      `${API_ENDPOINT}/reservations/make_reservation/`,
      {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "content-type": "application/json",
        },
      }
    );

    console.log(response.ok);
    if (response.ok == true) {
      let reserve = await response.json();

      reservation.value = reserve;

      successReservationDialog.value.code = reserve["code"];
      successReservationDialog.value.email_address = reserve["customer"]["email_address"];
      successReservationDialog.value.model = true 

    } else {
      dialog.value.title = "Oops"
      dialog.value.body="Sorry something went wrong will trying to process your reservation request."
      dialog.value.show = true
    }
  } catch (error) {
    dialog.value.title = "Oops"
      dialog.value.body="We could not communicate to the server, make sure you have a stable internet connect."
      dialog.value.show = true
  }finally{
    successReservationDialog.value.loading = false
  }
}

function view_reservation() {
  viewReservation(reservation.value)
}
</script>
