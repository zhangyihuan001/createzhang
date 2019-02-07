
import Swiper from "swiper"
import {Link} from "react-router-dom"
import "swiper/dist/css/swiper.min.css"
import "./index.less"
let flag=false
export class BannerDetail extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.swiperDetail=new Swiper("#detail-banner",{
        })
    }
    componentDidUpdate(){
        if(!flag){
            this.swiperDetail.update()
            this.swiperDetail=new Swiper("#detail-banner",{
                speed:1000,
                autoplay:{
                    delay:3000,
                    disableOnInteraction:false
                },
                // pagination:{
                //     el:"#detail-banner .swiper-pagination",
                //     bulletElement:"li",
                //     clickable:true
                // },
                loop:true,
                loopAdditionalSlides:3,
                // navigation: {
                //     nextEl: '#detail-banner .swiper-button-next',
                //     prevEl: '#detail-banner .swiper-button-prev',
                // }
            })
            flag=true
        }
    }
    render(){
        let bannerDom=this.props.bannerList.map((src,i)=>(<div className="swiper-slide" key={i}><img src={src} /></div>))
        return (
            <div className="swiper-container" id="detail-banner">
                 <div className="swiper-wrapper">
                    {bannerDom}
                 </div>
                 {/* <div className="swiper-pagination"></div>
                 <div className="swiper-button-prev"></div>
                 <div className="swiper-button-next"></div> */}
            </div>
        )
    }
}