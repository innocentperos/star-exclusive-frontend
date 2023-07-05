
import {ref, computed} from "vue"

const show_cancel_dialog = ref(false)

function useShareState(){


    function toggle_cancel_dialog(state){
        show_cancel_dialog.value = state
    }
    return {
        cancel_dialog_model : computed(()=>{
            return show_cancel_dialog.value
        }),
        toggle_cancel_dialog
    }
}

export {
    useShareState
}