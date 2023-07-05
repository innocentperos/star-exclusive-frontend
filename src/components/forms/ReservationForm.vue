<template>
  <div class="flex lg:px-32 flex-col px-4">
    <div class="flex flex-col lg:flex-row justify-center lg:space-x-4 my-4">
      <InputField
        label="Arrival Date"
        description="The date you will be coming to the hotel"
        type="date"
        v-model="form.arrival_date"
      ></InputField>
      <InputField
        label="Arrival Time"
        type="time"
        v-model="form.arrival_time"
      ></InputField>
    </div>

    <div class="flex flex-col lg:flex-row justify-center lg:space-x-4 my-4">
      <InputField
        label="Departure Date"
        description="The date you will be leaving to the hotel"
        type="date"
        v-model="form.departure_date"
      ></InputField>
      <InputField
        label="Departure Time"
        description="The time you will be leaving to the hotel"
        type="time"
        v-model="form.departure_time"
      ></InputField>
    </div>

    <div class="md:w-1/2 md:mx-auto my-8 mb-16">
      <button
        class="w-full border-indigo-700 hover:bg-indigo-200 duration-300 text-indigo-700 border-2 font-sans tracking-wider text-center h-[64px] rounded-tl-3xl"
        @click="check"
      >
        CHECK ROOM AVAILABILITY
      </button>
    </div>
  </div>

  <AlertDialog v-model="dialog.show" :title="dialog.title" :body="dialog.body">
  </AlertDialog>
</template>

<script setup>
import { ref, watch, toRaw } from "vue";
import Btn from "../../ui/Btn.vue";
import InputField from "../../ui/InputField.vue";
import AlertDialog from "../dialogs/AlertDialog.vue";
import { useFetch } from "../../composables/useFetch";
import { API_ENDPOINT } from "../../configs";

const form = ref({
  arrival_date: "2023-07-06",
  arrival_time: "10:20",
  departure_date: "2023-07-08",
  departure_time: "10:20",
  number_of_rooms: 1,
});

const emits = defineEmits(["loading","available","change"])

watch(form.value, ()=>{
  emits("change",toRaw( form.value))
})

const dialog = ref({
  show: false,
  title: "Invalid Departure Date",
  body: "Please select a valid departure date that is at less 6 hours above the arrival date",
});

function showDialog(title, body) {
  dialog.value = {
    title,
    body,
    show: true,
  };
}

async function check() {
  let raw = form.value;

  if (raw.arrival_date == "") {
    showDialog("Arrival Date Required", "Please provide your arrival date");
    return;
  }

  if (raw.arrival_time == "") {
    showDialog(
      "Arrival Time Required",
      "Please provide your arrival time, if your arriving today then your arrival time most be atlest an hour from now"
    );
    return;
  }

  if (raw.departure_date == "") {
    showDialog("Departure Date Required", "Please provide your departure date");
    return;
  }

  if (raw.departure_time == "") {
    showDialog("Departure Time Required", "Please provide your departure time");
    return;
  }

  let now = Date.now();
  let date = Date.parse(new Date(`${raw.arrival_date} ${raw.arrival_time}`));

  if (now - 1000 * 10 > date) {
    showDialog(
      "invalid Arrival date",
      "Please your arrival date most today or date greater than todays date"
    );
    return;
  }

  console.log({
    now,
    date,
  });

  if (now + 1000 * 60 * 59 > date) {
    showDialog(
      "invalid Arrival date",
      "Please your arrival date most be an hour or more from the todays date and current time, if your arriving today then your arrival time should be atlest an hour morethan the current time"
    );
    return;
  }

  now = Date.now();
  let departure_date = Date.parse(
    new Date(`${raw.departure_date} ${raw.departure_time}`)
  );

  if (departure_date < date || departure_date < date + 1000 * 60 * 60 * 11.5) {
    showDialog(
      "invalid Arrival date",
      "Your departure date most be atlest 12 hours ahead of your departure date"
    );
    return;
  }

  try {
    emits("loading", true)
    let result = await fetch(
      `${API_ENDPOINT}/categories/available_rooms/?arrival=${raw.arrival_date} ${raw.arrival_time}&departure=${raw.departure_date} ${raw.departure_time}`,
      {
        method: "GET",
      }
    );

    if (!result.ok) {
      switch (result.status) {
        case 406:
          let body = await result.json();
          showDialog("Error", body["detail"]);
          break;

        default:
          showDialog(
            "Server Error",
            "Something went wrong on the server, please try again later"
          );
          break;
      }
      
    }else{
      let data = await result.json()
      emits("available", data["categories"])
    }
  } catch (e) {
    showDialog(
      "Network Issue",
      "Please make sure you have a stable internet connection and try again"
    );
  }finally{
    emits("loading",false)
  }
}
</script>
