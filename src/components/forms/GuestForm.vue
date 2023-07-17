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
	    <span class="font-bold text-xs mt-6" v-if="guests.length > 0"> People your coming with </span>
      <ul class="flex flex-col divide-y bg-white rounded-sm divide-slate-600/10 mt-2">
        <li class="px-6 py-4 text-black flex first:rounded-t-sm last:rounded-b-sm overflow-hidden"
          v-for="(guest, key) in guests"
          :key="key"
        >
	<div class="flex flex-col my-auto space-y-1">
          <span class="md:text-md"> {{ guest.name }}</span>
	  <span class="text-xs md:text-sm " > {{guest.phone_number }} </span>
	</div>
          <span @click="removeGuest(key)" class="text-rose-500 text-xs ml-auto px-4 py-2 y-auto flex items-center justify-center cursor-pointer uppercase hover:bg-rose-200/40 py-6 duration-300"> remove</span>
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
      <Btn v-show="guestForm.name && guestForm.phone_number" @click="addGuest" class="shrink-0 mt-auto py-6 my-4"> Add Guest </Btn>
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

</script>
