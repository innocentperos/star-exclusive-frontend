import { ref } from "vue";

const Customerform = ref({
  first_name: "",
  last_name: "",
  phone_number: "",
  email_address: "",
  identification_type: "",
  identification_number: "",
  requirement : ""
});

const guestsForm = ref([]);

const reservationForm = ref({
  arrival_date: "",
  arrival_time: "",
  departure_date: "",
  departure_time: "",
  number_of_rooms: 0,
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
