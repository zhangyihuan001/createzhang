import axios from "axios"

import Banner from "../../component/banner"

export default {
    template:require("./index.html"),
    components:{Banner},
    data(){
        return {
            bannerlist:[]
        }
    },
    mounted(){
        // 首先组件加载完毕就开始请求轮播图图片数据
        axios.get("/zhuiszhu/goods/getHot").then(({data})=>{
            // 拿到数据，将数据赋予给当前组件的数据模型中的bannerlist，进而传到banner组件中
            this.bannerlist=data.list
            console.log(data.list)
        })
    }
}