<template>
  <section
    class="w-screen min-h-screen grid grid-cols-5 grid-rows-[auto,80vh,auto] px-2 lg:px-16"
  >
    <div
      class="col-start-1 col-end-6 text-xl lg:text-4xl uppercase bg-white mt-24 p-8 space-y-2 lg:space-y-8 text-center flex flex-col"
    >
      <span>Welcome to</span>
      <span class="text-4xl lg:text-8xl font-bold text-indigo-600"
        >Star Exclusive</span
      >
    </div>

    <div
      class="col-start-1 col-end-6 bg-indigo-600 relative overflow-hidden shadow-md rounded-md"
    >
      <img
        class="object-cover absolute top-0 left-0 h-full w-full"
        src="/src/assets/phil-desforges-Qn9e6JsYUFg-unsplash.jpg"
        alt=""
      />
    </div>

    <div class="col-start-1 col-end-6 md:w-1/2 md:mx-auto my-8 ">
      <button
        class="w-full border-indigo-700 hover:bg-indigo-200 duration-300 text-indigo-700 border-2 font-sans tracking-wider text-center h-[86px] rounded-tl-3xl text-2xl"
      >
        MAKE A RESERVATION
      </button>
    </div>

    <!-- <div
      class="hidden col-start-4 col-end-6 flex flex-col items-center space-y-2 w-full py-4"
    >
      <div class="mb-auto"></div>
      <div
        class="flex flex-col items-center justify-center w-full p-8 space-y-4"
      >
        <div
          class="hidden lg:flex text-xl lg:text-4xl text-center uppercase bg-white mt-24 p-8 space-y-8 w-full  flex-col"
        >
          <span class="block from-indigo-700 to-indigo-900 bg-gradient-to-tr p-4 w-full text-white py-16 rounded-br-2xl rounded-tl-2xl ">Welcome to</span>
          <span class="text-2xl lg:text-6xl font-bold text-indigo-600"
            >Star <br> Exclusive</span
          >
        </div>
        <span>Arrival Date</span>
        <div
          type="date"
          class="border-indigo-700 border-2 font-sans text-indigo-700 px-8 h-24 flex items-center justify-between w-full rounded-md text-xl before:hidden after:hidden outline-none"
        ></div>

        <input
          type="date"
          class="border-indigo-700 border-2 font-sans text-indigo-700 px-8 h-16 flex items-center justify-center w-full rounded-sm outline-none"
        />

        <input
          type="date"
          class="border-indigo-700 border-2 font-sans text-indigo-700 px-8 h-16 flex items-center justify-center w-full rounded-sm outline-none"
        />
      </div>
      <button
        class="ml-4 bg-indigo-700 font-sans text-white px-8 h-16 flex items-center justify-center w-1/3 rounded-sm"
      >
        BOOK NOW
      </button>
    </div> -->
  </section>
</template>
