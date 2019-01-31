// 路由设置

import Vue from "vue"
import Router from "vue-router"

import Index from "./page/Entry"
import Home from "./page/Home"
import Goods from "./page/Goods"
import Detail from "./page/detail"
import ShopCar from "./page/shopCar"

Vue.use(Router)

export default new Router({
    routes:[
        {path:"/",redirect:{name:"h"},component:Index,children:[
            {path:"home",component:Home,name:"h"},
            {path:"goods",component:Goods,name:"g"},
            {path:"shopCar",component:ShopCar,name:"sc"},
            {path:"detail",component:Detail,name:"d"}
        ]}
    ]
})