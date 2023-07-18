<template>
     <div>
        <InputField label="Card Number" :rounded="false"></InputField>
      </div>
      <div class="flex space-x-2 ">
        <InputField  label="Expiry Month" :rounded="false" type="select" :options="months"></InputField>
        <InputField  label="Expiry Year" :rounded="false" type="select" :options="years"></InputField>
        <InputField class="!w-1/2 " type="password" label="CVV" :rounded="false"></InputField>
      </div>
</template>
<script setup>
    import InputField from './InputField.vue';

    const months = [
        {title:"Janduary", value : 1},
        {title:"Febuary", value : 2},
        {title:"March", value : 3},
        {title:"April", value : 4},
        {title:"May", value : 5},
        {title:"June", value : 6},
        {title:"July", value : 7},
        {title:"August", value : 8},
        {title:"September", value : 9},
        {title:"October", value : 10},
        {title:"November", value : 11},
        {title:"December", value : 1}
    ]

    const years = [
        "2023","2024","2025","2026","2027","2028"
    ]
</script>