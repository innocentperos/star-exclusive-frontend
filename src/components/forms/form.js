import { ref } from "vue";

const Customerform = ref({
  first_name: "Jushua",
  last_name: "Mathew",
  phone_number: "091767673",
  email_address: "mathewjes@gmail.com",
  identification_type: "international_passport",
  identification_number: "55435357AD",
});

const guestsForm = ref([]);

const reservationForm = ref({
  arrival_date: "2023-07-16",
  arrival_time: "10:20",
  departure_date: "2023-07-19",
  departure_time: "10:20",
  number_of_rooms: 1,
});

function reservationFormState() {
  return reservationForm;
}

function customerFormState() {
  return {
    Customerform,
    guestsForm,
  };
}





function verifyCustomerForm() {
  const form = Customerform.value;

  if (form.first_name == "" || form.last_name == "") {
    return "Please Enter your first name and last name";
  }

  if (form.phone_number == "" || form.email_address == "") {
    return "please enter your phone number and email address";
  }

  if (form.identification_number == "" || form.identification_type == "") {
    return "Please provide your identification type and identification number";
  }

  return false;
}

export { customerFormState, reservationFormState, verifyCustomerForm };
