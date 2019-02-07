
import Swiper from "swiper"
import {Link} from "react-router-dom"
import "swiper/dist/css/swiper.min.css"
import "./index.less"
let flag=false
export class BannerSmall extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.swiperSmall=new Swiper("#small-banner",{
        })
    }
    componentDidUpdate(){
        if(!flag){
            this.swiperSmall.update()
            this.swiperSmall=new Swiper("#small-banner",{
                speed:1000,
                autoplay:{
                    delay:3000,
                    disableOnInteraction:false
                },
                loop:true,
                loopAdditionalSlides:3,
                navigation: {
                    nextEl: '#small-banner .swiper-button-next',
                    prevEl: '#small-banner .swiper-button-prev',
                }
            })
            flag=true
        }
    }
    render(){
        let newList1=[]
        let newList=[]
        this.props.bannerSmall.map((item,i)=>{
            newList1.push(item)
            if(i%2!=0){
                newList.push(newList1)
                newList1=[]
            }

        })
        let bannerDom=newList.map((newItem,i)=>{
            let smallDom=newItem.map((src)=>(
                <div key={src.banner} className="everyImg" >
                    <Link to={{pathname:"/detail/"+src.goodsID}}><img src={src.banner} /></Link>
                    <p>{src.name}</p>
                    <div>
                        活动价:<span>¥{src.goodsprice}</span>
                        <del>¥{src.costprice}</del>
                    </div>
                </div>
            ))
            return (<div className="swiper-slide" key={i}>{smallDom}</div>)
        })
        return (
            <div className="swiper-container" id="small-banner">
                 <div className="swiper-wrapper">
                    {bannerDom}
                 </div>
                 <div className="swiper-button-prev"></div>
                 <div className="swiper-button-next"></div>
            </div>
        )
    }
}