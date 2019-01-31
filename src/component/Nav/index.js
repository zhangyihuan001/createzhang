import "./index.less"

export default {
    template:require("./index.html"),
    data(){
        return{
            navs:[
                {text:"首页",name:"h"},
                {text:"商品列表",name:"g"},
                {text:"购物车列表",name:"sc"}
            ]
        }
    }
}