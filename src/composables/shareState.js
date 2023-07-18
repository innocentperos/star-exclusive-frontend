import { ref, computed } from "vue";

const __reservation = ref({
  pk: "1",
  booking_id:"122",
  customer: {
    pk: 2,
    first_name: "Joshua",
    last_name: "Mathew",
    email_address: "joshuamathew@gmail.com",
    phone_number: "0906564776",
  },
  room: {
    number: "Room 11",
    pk: 11,
    category: {
      cover: "",
      title: "",
      price: 60000,
      pk: 2,
    },
  },
});

const state = ref(false)

function viewReservation(_reservation){
  __reservation.value = _reservation
  state.value = true
}

const reservation = computed(()=>{
  return __reservation.value
})

export {
  state,
  reservation,
  viewReservation
}