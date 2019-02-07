import {GOODS_INIT,SPIN_INIT} from "../createActions/actionType"
export let goods=(state={
    list:[],
    isSpin:true,
    pageSize:3,
    currentPage:1,
    count:0,
    sort:"name",
    key:" ",
    asc:1
},action)=>{
    let newState={...state}
    switch (action.type) {
        case GOODS_INIT:
            delete action.type
            newState={...state,...action}
            // console.log(newState)
            return newState
        case SPIN_INIT:
            newState.isSpin=action.isSpin
            return newState
        default:
            return state
    }
}