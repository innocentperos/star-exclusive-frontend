<template>
  <AlertDialog v-model="searchDialogState" title="Cancel Reservation">
    
    <div>
      <InputField
        label="Reservation/Booking ID"
        description="Enter the booking/reservation ID you wish to cancel"
      >
      </InputField>
    </div>

    <template v-slot:actions>
      <div class="w-full flex justify-end space-x-4">
        <Btn color="error" @click="changeSearchDialogState(false)"> Close </Btn>
        <Btn @click="changeViewerState(true)"> Check </Btn>
      </div>
    </template>
  </AlertDialog>

  <AlertDialog class="z-50" v-model="confrim_dialog" title="Confirm Request" body = "A link has been sent to your email address, click on the link to confirm the cancelation request, thank you."></AlertDialog>
  <section
    v-if="viewerState"
    class="h-screen w-screen fixed top-0 left-0 bg-white z-40 overflow-y-auto"
  >
    <div
      class="py-6 px-6 flex flex-row justify-between items-center bg-indigo-700 text-white"
    >
      <div class="flex flex-col justify-center">
        <span class="text-xl">{{reservation.booking_id}}</span>
        <span class="text-lg">BOOKING INFORMATION </span>
      </div>

      <Btn class="bg-white text-indigo-700 font-bold" @click="close_reservation">Close</Btn>
    </div>

    <div class="px-32 py-6 flex flex-col md:grid md:grid-cols-2 space-y-12 lg:space-y-0">
      <div class="flex flex-col grow">
        <span class="text-sm">Name</span>
        <span class="text-lg">{{ reservation.customer.first_name }} {{ reservation.customer.last_name }}</span>
      </div>

      <div class="flex flex-col grow">
        <span class="text-sm">Booking ID</span>
        <span class="text-lg">{{ reservation.pk }}</span>
      </div>
    </div>

    <div class="bg-slate-600/30 w-full h-px"></div>

    <div
      class="px-32 py-6 flex flex-col md:grid md:grid-cols-2 space-y-12 lg:space-y-0"
    >
      <div class="flex flex-col grow">
        <span class="text-sm">Phone Number</span>
        <span class="text-lg">{{ reservation.customer.phone_number }}</span>
      </div>
      <div class="flex flex-col grow">
        <span class="text-sm">EMail Address</span>
        <span class="text-lg">{{ reservation.customer.email_address }} </span>
      </div>
    </div>

    <div class="bg-slate-600/20 w-full h-px"></div>

    <ul class="px-32">
      <span class="block py-8">Tag Along Guests</span>
      <li
        v-for="(guest, i) in guests"
        :key="i"
        class="items-center flex border-b last:border-b-transparent border-b-slate-900/10"
      >
        <span class="px-16">{{ i }}</span>
        <div class="py-4">
          <div class="flex flex-col">
            <span class="text-xs">Name</span>
            <span class="text-md">{{ guest.name }}</span>
          </div>
        </div>
      </li>
    </ul>

    <div class="bg-slate-600/20 w-full h-px"></div>

    <div class="px-32">
      <span class="block py-8">Booked Room</span>

      <div class="flex flex-col md:flex-row">
        <div
          class="relative w-full md:w-auto aspect-square overflow-hidden rounded-lg h-[12rem] shrink-0 grow-0"
        >
          <img
            class="object-cover aboslute top-0 left-0 h-full w-full"
            src="/src/assets/rooms/teir-5.jpg"
            alt=""
          />
        </div>
        <div class="flex flex-col space-y-2 mt-8 grow h-full px-0 md:px-16">
          <span class="text-2xl">Room {{ reservation.room.number }}</span>
          <span class="text-2xl">{{ reservation.room.category.title}}</span>
          <span class="text-6xl font-black mt-auto">N{{ reservation.room.category.price }}</span>
        </div>
      </div>
    </div>
    <div
      class="flex flex-col px-32 lg:px-64 py-16 mt-32 text-black bg-rose-600/20"
    >
      <div
        class="flex flex-col lg:flex-row lg:space-x-4 space-y-6 lg:space-y-0 items-start"
      >
        <InputField
          label="Email Address"
          class="mt-0"
          description="Enter your email address to canccel the reservation"
        ></InputField>
        <InputField
          label="Identification Number"
          description="Enter the identification number you provided during the booking process"
        ></InputField>
      </div>

      <Btn color="error" class="shrink-0 mt-6 mx-auto h-[60px] lg:w-1/2" @click="confrim_dialog = true">
        Cancel Reservation
      </Btn>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import AlertDialog from "../components/dialogs/AlertDialog.vue";
import InputField from "../ui/InputField.vue";
import Btn from "../ui/Btn.vue";

import { sharedReservation, sharedSearchDialog, sharedReservationDialog} from "../composables/shareState";

const reservation = sharedReservation()
const [searchDialogState, changeSearchDialogState] = sharedSearchDialog()
const [viewerState, changeViewerState] = sharedReservationDialog()

const confrim_dialog = ref(false)

const guests = ref([
  {
    name: "Joshua Mark",
  },
  {
    name: "Jushua Sarah",
  },
]);

</script>
