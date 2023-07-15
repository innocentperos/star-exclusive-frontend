<template>
  <div class="flex lg:px-32 flex-col px-4">
    <div class="flex flex-col lg:flex-row justify-center lg:space-x-4 my-4">
      <InputField label="First Name" v-model="form.first_name"></InputField>
      <InputField label="Last Name" v-model="form.last_name"></InputField>
    </div>
    <div class="flex flex-col lg:flex-row justify-center lg:space-x-4 my-2">
      <InputField label="Phone Number" v-model="form.phone_number"></InputField>
      <InputField
        label="Email Address"
        v-model="form.email_address"
      ></InputField>
    </div>
    <div class="flex flex-col lg:flex-row justify-center lg:space-x-4 my-2">
      <InputField
        type="select"
        label="Identification Type"
        :options="IdentificatioOptions"
        v-model="form.identification_type"
      ></InputField>
      <InputField
        label="Identification Issued Number"
        v-model="form.identification_number"
      ></InputField>
    </div>

    <div>
      <ul class="flex flex-col divide-y shadow-lg bg-slate-100 rounded-lg divide-slate-600/50 mt-6">
        <li
          class="pl-6 text-black flex first:rounded-t-lg last:rounded-b-lg overflow-hidden"
          v-for="(guest, key) in guests"
          :key="key"
        >
          <span class="my-auto"> {{ guest.name }}</span>
          <span @click="removeGuest(key)" class="text-rose-500 text-xs ml-auto px-6 h-full cursor-pointer font-bold uppercase hover:bg-rose-200/40 py-6 duration-300"> remove</span>
        </li>
      </ul>
    </div>

    <div
      class="flex flex-col md:flex-col lg:flex-row justify-center lg:space-x-4 my-4"
    >
      <InputField label="Name of Guest" v-model="guestForm.name"></InputField>
      <InputField
        label="Contact Phone Number"
        v-model="guestForm.phone_number"
      ></InputField>
      <Btn @click="addGuest" class="shrink-0 mt-auto mb-4"> Add Guest </Btn>
    </div>
  </div>
</template>

<script setup>
import { ref} from "vue";
import InputField from "../../ui/InputField.vue";
import Btn from "../../ui/Btn.vue";
import {customerFormState} from "./form"

const IdentificatioOptions = [
  {
    title: "National ID (Nigeria Issued)",
    value: "national_id",
  },
  {
    title: "Driver`s Liences (Nigeria Issued)",
    value: "driver_id",
  },
  {
    title: "International Passport",
    value: "international_passport",
  },
  {
    title: "Voter`s Card (Nigeria Issued)",
    value: "national_voters_id",
  },
];

const emits = defineEmits(["change"])

const forms = customerFormState()
const form = forms.Customerform

const guestForm = ref({
  name: "",
  phone_number: "",
});

const guests = forms.guestsForm

function addGuest() {
  guests.value.push({
    name: guestForm.value.name,
    phone_number: guestForm.value.phone_number,
  });

  guestForm.value.name = "";
  guestForm.value.phone_number = "";
}

function removeGuest(index){
    guests.value = guests.value.filter((item, _index)=> _index!=index)
}

</script>
