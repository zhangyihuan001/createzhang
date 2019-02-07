
import Swiper from "swiper"
import {Link} from "react-router-dom"
import "swiper/dist/css/swiper.min.css"
import "./index.less"
let flag=false
export class Banner extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.swiper=new Swiper("#big-banner",{
        })
    }
    componentDidUpdate(){
        if(!flag){
            this.swiper.update()
            this.swiper=new Swiper("#big-banner",{
                speed:1000,
                autoplay:{
                    delay:3000,
                    disableOnInteraction:false
                },
                pagination:{
                    el:"#big-banner .swiper-pagination",
                    bulletElement:"li",
                    clickable:true
                },
                loop:true,
                loopAdditionalSlides:3,
                navigation: {
                    nextEl: '#big-banner .swiper-button-next',
                    prevEl: '#big-banner .swiper-button-prev',
                }
            })
            flag=true
        }
    }
    render(){
        let bannerDom=this.props.bannerList.map((src,i)=>(<div className="swiper-slide" key={i}><Link to={{pathname:"/goods/1/name/default"}}><img src={src} /></Link></div>))
        return (
            <div className="swiper-container" id="big-banner">
                 <div className="swiper-wrapper">
                    {bannerDom}
                 </div>
                 <div className="swiper-pagination"></div>
                 <div className="swiper-button-prev"></div>
                 <div className="swiper-button-next"></div>
            </div>
        )
    }
}