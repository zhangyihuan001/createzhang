// 引用轮播图模板
import Swiper from "swiper"

// 引入轮播模板自带的css样式
import "swiper/dist/css/swiper.min.css"

export default {
    template:require("./index.html"),
    // 下面是传数据设置
    props:{
        list:{
            // 数组格式
            type:Array,
            // 必填props
            require:true
        },
        // 下面是有多个使用轮播图时，样式的使用设置
        isDetail:{
            // 布尔值
            type:Boolean,
            // 默认是false
            default:false
        }
    },
    mounted(){
        // 引用轮播函数
        this.swiper=new Swiper(".swiper-container",{
            // 自动播放
            autoplay:true
        })
    },
    updated(){
        // 获取图片时异步的，所以需要等获取数据后更新下swiper，这样才能轮播图正常显示
        this.swiper.update();
    }
}