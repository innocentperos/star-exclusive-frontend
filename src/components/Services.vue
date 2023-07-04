<template>
  <div class="c">
    <div
      class="h-28 px-32 w-full justify-center text-xl text-indigo-700 font-bold flex items-center uppercase"
    >
      <span>Our Exclusive Services </span>
    </div>

    <div class="w-full flex flex-col justify-center space-y-24">
      <ServiceItem
        v-for="(service, i) in Services"
        :key="i"
        :i="i"
        :title="service.title"
        :color="service.color"
        :path="service.path"
        :description="service.description"
      >
      </ServiceItem>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ServiceItem from "../ui/ServiceItem.vue";

const Services = [
  {
    title: "NIGHT CLUB",
    color: "text-indigo-600",
    path: "/src/assets/bar/",
    description: `
    Welcome to our electrifying nightclub, where the night comes alive with pulsating beats and an unforgettable ambiance. Get ready to immerse yourself in a world of music, dance, and pure excitement.
<br>
Step into our vibrant venue and let the energy of the crowd surround you. Our state-of-the-art sound system and cutting-edge lighting create an atmosphere that will ignite your senses. The music, expertly curated by renowned DJs, spans a wide range of genres, ensuring there's something for everyone.
<br>
Feel the rhythm as you take to the dance floor, moving to the hottest tracks played by our talented DJs. Our spacious dance floor provides ample room to let loose and express yourself, while our VIP sections offer a more exclusive experience for those seeking a heightened level of luxury and service.
<br>
Sip on expertly crafted cocktails and indulge in a variety of premium beverages at our well-stocked bar. Our skilled bartenders are ready to serve you with creativity and flair, mixing up signature cocktails and classic favorites to tantalize your taste buds.
<br>
We host regular themed nights and special events, featuring guest performances from renowned artists and entertainers. These nights promise an unforgettable experience, creating memories that will last a lifetime.
<br>
Our nightclub operates during [mention operating hours] and welcomes guests who are ready to embrace the vibrant nightlife scene. Please note that we maintain a strict age policy and require valid identification to ensure a safe and enjoyable environment for all patrons.
<br>
Join us at our nightclub, where the music is infectious, the atmosphere is electric, and the party never stops. Get ready to dance, socialize, and create unforgettable moments in an exhilarating setting.
  `,
  },
  {
    title: "Resturant",
    color: "text-red-600",
    path: "/src/assets/restuarant/",
    description: `
    Welcome to our exquisite restaurant, a culinary haven where passion for food meets exceptional dining experiences. Prepare to embark on a gastronomic journey that delights the senses and leaves a lasting impression on your taste buds.
    <br><br>
Our menu is carefully crafted by our talented chefs, who draw inspiration from local and international flavors, using only the freshest, seasonal ingredients. From succulent appetizers to mouthwatering mains and delectable desserts, every dish is a masterpiece, thoughtfully plated to please both the eye and the palate.
<br><br>
Savor the warmth of our inviting ambiance, where contemporary design elements blend harmoniously with touches of rustic charm. Whether you're looking for an intimate dinner for two or a lively gathering with friends and family, our restaurant offers the perfect setting for every occasion.
<br><br>
To complement your culinary journey, our sommeliers have curated an impressive wine list featuring an extensive selection of world-class wines. Each bottle is thoughtfully chosen to pair perfectly with the diverse flavors of our dishes, elevating your dining experience to new heights.
<br><br>
At the heart of our restaurant is our commitment to exceptional service. Our attentive and knowledgeable staff is dedicated to ensuring that every moment of your dining experience is memorable and enjoyable. From personalized recommendations to accommodating special dietary preferences, we go above and beyond to exceed your expectations.
<br><br>
We take great pride in delivering a farm-to-table approach, supporting local producers and promoting sustainability in our culinary practices. Every dish is a celebration of the region's finest ingredients, allowing you to indulge guilt-free in an eco-conscious dining experience.
<br><br>
Whether you're celebrating a special occasion or seeking a culinary adventure, our restaurant is the perfect destination. We invite you to join us, experience the art of fine dining, and create cherished memories with your loved ones.


    `,
  },
  {
    title: "BAR",
    color: "text-rose-600",
    path: "/src/assets/bar/",
    description: `
Welcome to our lively and spirited bar, where the good times flow as freely as the drinks. Step into a vibrant atmosphere that combines exceptional beverages, friendly camaraderie, and a touch of urban chic.
<br><br>
Our bar boasts an extensive selection of handcrafted cocktails, premium spirits, and a carefully curated beer and wine list. Our talented mixologists are passionate about their craft and are always ready to create innovative concoctions or serve up classic favorites with their own unique twist.
<br><br>
Whether you prefer a refreshing mojito, a sophisticated martini, or a bold whiskey on the rocks, our skilled bartenders will ensure your drink is expertly crafted to perfection. Sit back, relax, and let our beverage offerings transport you to a world of indulgence and relaxation.
<br><br>
The ambiance of our bar is second to none. With stylish decor, ambient lighting, and comfortable seating, it's the perfect place to unwind after a long day or kick-start your evening with friends. Enjoy the buzz of conversation, the laughter, and the infectious energy that fills the air.
<br><br>
If you're in the mood for some entertainment, we regularly host live music performances, DJ sets, and themed nights, transforming our bar into a hub of excitement and celebration. Dance the night away, sing along to your favorite tunes, or simply enjoy the captivating performances that grace our stage.
<br><br>
We take pride in our attentive and friendly staff, who are always ready to provide exceptional service and make your visit memorable. Whether you need recommendations, personalized drink suggestions, or simply a friendly chat, our team is dedicated to ensuring you have a fantastic time.
<br><br>
Please note that we maintain a responsible drinking policy, promoting a safe and enjoyable environment for all our patrons. We also offer a range of non-alcoholic beverages for those who prefer an alcohol-free experience.
<br><br>
Join us at our bar and experience the perfect blend of exceptional drinks, vibrant ambiance, and unmatched hospitality. Raise your glass, make new friends, and create unforgettable memories in an atmosphere that embraces the spirit of celebration and camaraderie. Cheers!





`,
  },
  {
    title: "Gym",
    color: "text-teal-600",
    path: "/src/assets/gym/",
    description: `
  Welcome to our hotel's modern gym! We prioritize your well-being and offer a fully equipped fitness facility to cater to your exercise needs.
  <br><br>
Our gym features a range of state-of-the-art cardio machines, including treadmills, ellipticals, and stationary bikes. You can also find a variety of strength training equipment such as free weights, weight machines, and resistance bands.
<br><br>
We provide amenities like flat-screen TVs, personalized entertainment options, fresh towels, water stations, and locker facilities for your convenience. Our friendly fitness staff is available to assist you and answer any questions you may have.
<br><br>
The gym is open [mention operating hours], allowing you to maintain your fitness routine at your convenience.
<br><br>
Please note that we have implemented additional safety measures and hygiene protocols for your well-being.
<br><br>
Visit our gym and enjoy a rewarding workout experience during your stay.
  `,
  },
  {
    title: "Pool",
    color: "text-blue-600",
    path: "/src/assets/pool/",
    description: `
  Welcome to our serene and inviting poolside oasis, where relaxation and rejuvenation await. Dive into a world of tranquility and escape the hustle and bustle as you bask in the soothing ambiance of our picturesque pool area.
  <br><br>
Our crystal-clear pool is meticulously maintained, offering a refreshing respite from the heat of the day. Immerse yourself in the cool, inviting waters and feel your cares melt away. Whether you choose to take a leisurely swim or simply float lazily on the water, our pool provides the perfect sanctuary to unwind and recharge.
<br><br>
Surrounded by lush greenery and comfortable loungers, our pool deck offers an ideal setting for sunbathing and lounging. Soak up the sun's warm rays as you indulge in a good book or simply soak in the serene atmosphere. For those seeking shade, our poolside cabanas provide a cozy retreat where you can relax and enjoy the surroundings.
<br><br>
Our attentive staff is on hand to cater to your every need, ensuring you have a seamless and enjoyable experience. From offering refreshing towels to serving a selection of delicious snacks and refreshing beverages, we are committed to providing exceptional service to enhance your poolside experience.
<br><br>
Families are welcome to enjoy our pool, and we provide a separate area for children to splash and play safely under the watchful eye of their parents or guardians. Our commitment to safety extends to maintaining a trained lifeguard on duty at all times, ensuring a secure environment for everyone.
<br><br>
Please note that our pool area adheres to strict cleanliness and hygiene standards to ensure the well-being of all our guests. We kindly ask that you follow any posted guidelines and respect the tranquility of the space.
<br><br>
Escape to our pool oasis and discover a world of relaxation and serenity. Whether you seek to unwind, soak up the sun, or simply enjoy the company of loved ones, our pool is the perfect destination. Immerse yourself in a refreshing haven and create unforgettable memories surrounded by the beauty of our poolside paradise.
  `,
  },
];

const selectedRoom = ref(-1);
</script>
