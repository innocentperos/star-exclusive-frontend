import { ref, computed } from "vue";

const dialogs = ref({
  searchBooking: false,
  reservationDIalog: false,
});

function sharedSearchDialog() {
  return [
    computed(() => {
      return dialogs.value.searchBooking;
    }),
    function (state) {
      dialogs.value.searchBooking = state;
    },
  ];
}

function sharedReservationDialog() {
    return [
      computed(() => {
        return dialogs.value.reservationDIalog;
      }),
      function (state) {
        dialogs.value.reservationDIalog = state;
      },
    ];
  }

const reservation = ref({
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

function sharedReservation() {
 return reservation
}

export { sharedReservation, sharedReservationDialog, sharedSearchDialog };
