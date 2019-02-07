import { DETAIL_INIT, NUM_INIT } from "../createActions/actionType";

export let detail=(state={
    goods:[],
    valueNum:1,
    num:1
},action)=>{
    let newState={...state}
    switch (action.type) {
        case DETAIL_INIT:
            delete action.type
            newState=action
            return newState
        case NUM_INIT:
            newState.num=action.num
            return newState    
        default:
            return state
    }
}