import { HOME_INIT, TIME_INIT } from "../createActions/actionType";

export let home=(state={
    bannerList:[],
    hotList:null,
    time:""
},action)=>{
    let newState={...state}
    switch (action.type) {
        case HOME_INIT:
            delete action.type
            newState=action
            return newState
        case TIME_INIT:
            newState.time=action.time
            return newState
        default:
            return state
    }
}