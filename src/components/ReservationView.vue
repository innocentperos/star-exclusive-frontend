<template>
  <section
    v-if="state"
    class="h-screen w-screen fixed top-0 left-0 bg-white z-40 overflow-y-auto"
  >
    <div
      class="py-6 px-6 flex flex-row justify-between items-center bg-indigo-700 text-white"
    >
      <div class="flex flex-col justify-center">
        <span class="text-xl">{{ reservation.code }}</span>
        <span class="text-lg">BOOKING INFORMATION </span>
      </div>

      <Btn class="bg-white text-indigo-700 font-bold" @click="state = false"
        >Close</Btn
      >
    </div>

    <div
      class="px-32 py-6 flex flex-col md:grid md:grid-cols-2 space-y-12 lg:space-y-0"
    >
      <div class="flex flex-col grow">
        <span class="text-sm">Name</span>
        <span class="text-lg"
          >{{ reservation.customer.first_name }}
          {{ reservation.customer.last_name }}</span
        >
      </div>

      <div class="flex flex-col grow">
        <span class="text-sm">Booking ID</span>
        <span class="text-lg">{{ reservation.code }}</span>
      </div>
    </div>

    <div class="bg-slate-600/30 w-full h-px"></div>

    <div
      class="px-32 py-6 flex flex-col md:grid md:grid-cols-2 space-y-12 lg:space-y-0"
    >
      <div class="flex flex-col grow">
        <span class="text-sm">Phone Number</span>
        <span class="text-lg">{{
          reservation.customer.secure_phone_number
        }}</span>
      </div>
      <div class="flex flex-col grow">
        <span class="text-sm">Email Address</span>
        <span class="text-lg"
          >{{ reservation.customer.secure_email_address }}
        </span>
      </div>
    </div>

    <div class="bg-slate-600/20 w-full h-px"></div>

    <ul v-if="reservation.guests.length > 0" class="px-32">
      <span class="block py-8 mb-0">Tag Along Guests</span>
      <li
        v-for="(guest, i) in reservation.guests"
        :key="i"
        class="items-center flex border-b last:border-b-transparent border-b-slate-900/10 mb-8"
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
          <span class="text-2xl font-bold mb-4">{{
            reservation.room.category.title
          }}</span>
          <span class="text-6xl font-black mt-auto"
            >N{{ formatPrice(reservation.room.category.price) }}</span
          >
          <Btn
            @click="paymentFormState = true"
            color="success"
            class="shrink-0 w-full md:w-auto !mt-6 h-[60px] lg:w-1/2"
          >
            Make Payment Now
          </Btn>
        </div>
      </div>
    </div>

    <div
      class="flex flex-col px-32 lg:px-48 py-16 mt-32 text-black bg-rose-600/20"
    >
      <div
        class="flex flex-col lg:flex-row lg:space-x-4 space-y-6 lg:space-y-0 items-start"
      >
        <InputField
          label="Email Address"
          class="mt-0"
          :rounded="false"
          v-model="cancelForm.email_address"
          description="Enter your email address to canccel the reservation"
        ></InputField>
        <InputField
          label="Identification Number"
          :rounded="false"
          v-model="cancelForm.identification_number"
          description="Enter the identification number you provided during the booking process"
        ></InputField>
      </div>

      <span v-if="!cancelState" class="block text-center text-sm">
        Do you want to cancel this reservation
      </span>

      <Btn
        v-if="cancelState"
        @click="cancelReservation"
        :loading="dialog.loading"
        color="error"
        block
        class="shrink-0 w-full md:w-auto mt-6 mx-auto h-[60px] lg:w-1/2"
      >
        Cancel Reservation
      </Btn>
      <Btn
        v-else
        @click="cancelState = true"
        color="error"
        class="shrink-0 w-full md:w-auto mt-6 mx-auto h-[60px] lg:w-1/2"
      >
        Cancel Reservation
      </Btn>
    </div>

    <AlertDialog
      class="z-50"
      v-model="dialog.model"
      :title="dialog.title"
      :body="dialog.body"
    ></AlertDialog>

    <AlertDialog v-model="paymentFormState" no-action title="Complete Payment">
      <div class="flex flex-col">
        <div
          class="flex justify-between mt-8 mb-4 grow h-full md:px-16 bg-indigo-700 text-white p-6"
        >
          <div class="flex flex-col">
            <span class="text-xl mb-4"> {{ reservation.code }}</span>
            <span class="text-md">Room {{ reservation.room.number }}</span>
            <span class="text-md font-bold mb-4">{{
              reservation.room.category.title
            }}</span>
          </div>
          <span class="text-4xl font-black mt-auto"
            >N{{ formatPrice(reservation.room.category.price) }}</span
          >
        </div>

        <PaymentForm></PaymentForm>

        <div class="my-8 space-x-4 flex">
          <div class="!mx-auto"></div>
          <Btn color="success" class="shrink-0 md:w-auto mx-auto h-[60px]">
            Complete Payment
          </Btn>
          <Btn
            @click="paymentFormState = false"
            color="error"
            class="shrink-0 md:w-auto mx-auto h-[60px]"
          >
            Cancel
          </Btn>
        </div>
      </div>

      <template v-slot:title>
        <div></div>
      </template>
    </AlertDialog>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import AlertDialog from "../components/dialogs/AlertDialog.vue";
import InputField from "../ui/InputField.vue";
import Btn from "../ui/Btn.vue";

import { state, reservation } from "../composables/shareState";
import { API_ENDPOINT, formatPrice } from "../configs";
import PaymentForm from "../ui/PaymentForm.vue";

const cancelState = ref(false);
const paymentFormState = ref(false);

const cancelForm = ref({
  email_address: "",
  identification_number: "",
});

const dialog = ref({
  model: false,
  title: "",
  body: "",
  loading: false,
});

async function cancelReservation() {
  const form = cancelForm.value;
  if (form.email_address == "" || form.identification_number == "") {
    return;
  }

  try {
    dialog.value.loading = true;
    const response = await fetch(
      `${API_ENDPOINT}/reservations/${reservation.value.code}/cancel_request/`,
      {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "content-type": "application/json",
        },
      }
    );

    if (response.ok) {
      dialog.value.title = "Cancel Request Accepted";
      dialog.value.body =
        "A cancellation link has been sent to your email address, to complete the request click the link sent to your email address";
      dialog.value.model = true;
    } else {
      switch (response.status) {
        case 400:
          dialog.value.title = "Missing Field";
          dialog.value.body =
            "Please provide the email address and the identification number you used during the reservation process.";
          dialog.value.model = true;
          break;
        case 406:
          dialog.value.title = "Mismatch detail";
          dialog.value.body =
            "Either the emaila ddress or identification number you provided did not match the reservation`s detail";
          dialog.value.model = true;
          break;
        default:
          dialog.value.title = "Oops";
          dialog.value.body =
            "Something went wrong will processing your request, please try again later";
          dialog.value.model = true;
          break;
      }
    }
  } catch (error) {
    dialog.value.title = "Oops";
    dialog.value.body =
      "Something went wrong will processing your request, please make sure you have a stable internet connection and try again later";
    dialog.value.model = true;
  } finally {
    dialog.value.loading = false;
  }
}
</script>
