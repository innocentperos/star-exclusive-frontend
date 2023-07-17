<template>
  <div
    class="w-screen min-h-screen grid grid-cols-[8rem,1fr,1fr,8rem] overflow-x-hidden"
  >
    <div class="col-start-1 col-end-5 py-8 flex items-center justify-center">
      <!-- <div class="w-full h-2 bg-indigo-600/30 rounded-r-md"></div> -->
      <span class="text-4xl font-bold uppercase text-indigo-600 shrink-0 mx-4"
        >About Us</span
      >
      <!-- <div class="w-full h-2 bg-indigo-600/30 rounded-l-md"></div> -->
    </div>

    <div
      class="col-start-1 lg:col-start-2 col-end-6 lg:col-end-4 py-8 grid grid-cols-[1fr,6fr,1fr]"
    >
      <div
        class="col-start-1 lg:col-start-2 col-end-4 lg:col-end-3 text-lg text-justify p-4 lg:p-0"
      >
        Welcome to Star Exclusive Hotel, where luxury and unparalleled
        hospitality merge to create an extraordinary experience for our esteemed
        guests. Nestled in the heart of Jalingo, our hotel stands as a
        symbol of elegance, sophistication, and impeccable service.
        <br /><br />
        At Star Exclusive Hotel, we believe that true luxury lies in the
        meticulous attention to detail and the seamless fusion of opulence and
        comfort. From the moment you step through our doors, you will be
        enveloped in an atmosphere of refined beauty and warm hospitality.
        <br /><br />
        Our meticulously designed rooms and suites are a testament to tasteful
        elegance, offering a harmonious blend of contemporary design, lavish
        furnishings, and state-of-the-art amenities. Each room is thoughtfully
        crafted to provide the utmost comfort, ensuring a restful stay and a
        tranquil retreat from the outside world.
        <br /><br />
        Indulge your palate in our exquisite dining venues, where our talented
        chefs create culinary masterpieces that tantalize the senses. From fine
        dining restaurants showcasing a symphony of flavors to cozy cafes and
        bars offering a relaxing ambience, our culinary offerings cater to every
        taste and occasion.
        <br /><br />
        To further enhance your stay, our hotel features a range of exceptional
        facilities. Unwind and rejuvenate at our spa and wellness center, where
        skilled therapists offer a sanctuary of relaxation and revitalization.
        Stay active in our fully equipped fitness center, or take a refreshing
        dip in our sparkling swimming pool, surrounded by lush tropical gardens.
        <br /><br />
        We understand that every event is unique and deserves a touch of
        grandeur. With our elegant event spaces and impeccable service, we cater
        to both intimate gatherings and grand celebrations, ensuring that every
        occasion is truly unforgettable.
        <br /><br />
        At Star Exclusive Hotel, our dedicated and passionate team is committed
        to providing personalized service that exceeds your expectations. From
        the moment you make a reservation until your departure, we strive to
        create cherished memories and moments of delight.
        <br /><br />
        Beyond our hotel walls, you'll find yourself immersed in the vibrant
        energy of Jalingo. Whether you seek cultural attractions, shopping
        excursions, or memorable experiences, our knowledgeable concierge team
        is on hand to guide you and ensure that your stay is filled with
        unforgettable adventures.
        <br /><br />
        Discover the epitome of luxury and refinement at Star Exclusive Hotel.
        We invite you to experience a world where every detail is meticulously
        crafted to provide an unparalleled escape from the ordinary. Allow us to
        exceed your expectations and create a truly extraordinary stay that
        lingers in your memories for a lifetime.
      </div>
    </div>

    <div class="col-start-1 col-end-5">
      <div class="w-full overflow-auto snap-x flex space-x-1">
        <div
          v-for="i in 5"
          :key="i"
          class="w-[calc(100vw*0.95)] md:w-[calc(100vw*0.75)] h-[calc(100vh-10rem)] md:h-auto snap-always snap-x first:ml-1 last:mr-2  md:aspect-video first:rounded-l-md last:rounded-r-md overflow-hidden snap-center grow-0 shrink-0 relative"
        >
          <img
            class="object-cover w-full h-full absolute top-0 left-0"
            :src="'/src/assets/display/' + i + '.jpg'"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const Colors = ["bg-green-700", "bg-purple-600", "bg-slate-700"];
</script>
