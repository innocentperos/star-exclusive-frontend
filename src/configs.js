
const LOCAL_SERVER_ENDPOINT = "http://localhost:8000"
const NETWORK_SERVER_ENDPOINT = "http://192.168.43.55:8000"

const SERVER_ENDPOINT = LOCAL_SERVER_ENDPOINT

const API_ENDPOINT = `${SERVER_ENDPOINT}/api`

function formatPrice(price){
    let splits = price.toString().split("").reverse()
    let build = ""
    splits.forEach((digit,index) => {
      build = digit+build
      if (index%2 == 0 && index !=0 && index+1 != splits.length){
        build = ","+ build
      }
    });
  
    return build
  }

  function getRoomCover(room) {
    if (room) return `${SERVER_ENDPOINT}${room.cover}`;
    return "";
  }

export {
    SERVER_ENDPOINT,
    API_ENDPOINT,
    formatPrice,
    getRoomCover
}

