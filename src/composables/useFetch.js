import { ref } from "vue";

function useFetch(url, configs) {
    const data = ref(null);
    const response = ref(null)
    const statusCode = ref(null)
    const loading = ref(false)

    if ( configs && configs.default){
        data.value = configs.default
    }

    async function execute() {
        try {
            loading.value = true

            console.log("Making http request");
            let result = await fetch(`http://localhost:8000/api${url}`, {
                method: "GET",
            });

            response.value = result
            statusCode.value = result.status

            if (configs && configs.transfomer){
                data.value = await configs.transfomer(result);
            }else{
                try{
                    data.value =await result.json()
                }catch(error){
                    data.value = await result.text()
                }
            }
            
        } catch (e) {
            console.error("Error Making Http Request");
            console.error(e);
            alert(e)
        }finally{
            loading.value = false

            if (configs && configs.onComplete){
                configs.onComplete()
            }
        }
    }
    if (!configs || !configs.wait)
        execute();

    return {
        data,
        statusCode,
        response,
        loading,
        execute
    };
}



export { useFetch };
