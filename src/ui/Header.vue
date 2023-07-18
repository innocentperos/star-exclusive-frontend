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
    <ul class="flex flex-col md:flex-row space-x-4 text-md uppercase font-sans">
      <li class="hidden md:flex">Our Services</li>
      <li class="hidden md:flex">Our Rooms</li>
      <li
        class="cursor-pointer hover:text-red-600"
        @click="searchDialog = true"
      >
        View Reservation
      </li>
    </ul>

    <AlertDialog v-model="searchDialog" title="Cancel Reservation">
      <div>
        <InputField
          label="Reservation/Booking ID"
          description="Enter the booking/reservation ID you wish to view"
          v-model="form"
          :rounded="false"
        >
        </InputField>
      </div>

      <template v-slot:actions>
        <div class="w-full flex justify-end space-x-4">
          <Btn @click="searchDialog = false" color="error"> Close </Btn>
          <Btn v-if="form != '' && form != null" @click="searchReservation">
            Check
          </Btn>
        </div>
      </template>
    </AlertDialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { viewReservation } from "../composables/shareState";
import Btn from "../ui/Btn.vue";
import InputField from "./InputField.vue";
import AlertDialog from "../components/dialogs/AlertDialog.vue";
import { API_ENDPOINT } from "../configs";

const searchDialog = ref(false);
const form = ref(null);
const errorMessage = ref(null);

async function searchReservation() {
  if (form.value == "" || form.value == null) {
    return;
  }

  try {
    const response = await fetch(`${API_ENDPOINT}/reservations/${form.value}/`,{
      method: "GET",
    });

    if (response.ok) {
      viewReservation(await response.json());
    } else {
      switch (response.status) {
        case 404:
          errorMessage.value =
            "Sorry, No reservation was found with the provided reservation code";
          break;
        default:
          errorMessage.value =
            "Opps, something went wrong will processing your request, try again later";
          break;
      }
    }
  } catch (error) {
    errorMessage.value = "Could not communicate with the server";
  }
}
</script>
