import {combineReducers} from "redux"
import { home } from "./homeReducer";
import {goods} from "./goodsReducer"
import { detail } from "./detailReducer";
export let reducer=combineReducers({home,goods,detail})