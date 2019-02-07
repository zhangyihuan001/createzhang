import {Link} from "react-router-dom"
import "./index.less"
import { BannerSmall } from "../bannerSmall";

export class List extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        let {hotList,time}=this.props
        let showDom=!this.props.hotList?<div></div>:this.props.hotList.showList.map(({name,msg,img})=>(
        <li key={name}>
            <Link to={{pathname:"/goods/1/name/ada9268"}} >
                <img src={img}/>
                <div className="showMsg">
                    {/* <p className="nameP">{name}</p> */}
                    <p className="msgP">{msg}</p>
                </div>
            </Link>
        </li>)
        )
        let darenDom=!hotList?<div></div>:hotList.timeList.darenList.map(({banner,goodsID})=>(
            <li  key={goodsID}><Link to={{pathname:"/detail/"+goodsID}} ><img src={banner} /></Link></li>
        ))
        let paihangList=[]
        if(hotList){
            hotList.timeList.paihangList.map((paihang,i)=>{
                if(i==0){
                    paihangList.push(
                        <li className="ulLeft" key={paihang.goodsID}><Link to={{pathname:"/detail/"+paihang.goodsID}} >
                                <em>NO.1</em>
                                <img src={paihang.banner} />
                                <div className="textRight">
                                    <p>{paihang.text}</p>
                                    <span className="span1">¥{paihang.goodsprice}</span>/<span className="span2">¥{paihang.costprice}</span>
                                </div>
                            </Link></li>
                    )
                }else{
                    paihangList.push(
                        <li className="elseLi" key={paihang.goodsID}><Link to={{pathname:"/detail/"+paihang.goodsID}} >
                            <em>NO.{i+1}</em>
                            <img src={paihang.banner} />
                            <div className="hoverDiv">
                                <p>{paihang.text}</p>
                                <span className="span1">¥{paihang.goodsprice}</span>/<span className="span2">¥{paihang.costprice}</span>
                            </div>
                        </Link></li>
                    )
                }
            })
        }
        let pinpaiDom=!hotList?<div></div>:hotList.timeList.pingpaiList.map((item,i)=>(
            <li key={i}><Link to={{pathname:"/goods/1/name/秋冬"}} >
                <img className="img1" src={item.img1} />
                <div><p><img src={item.img2} /></p></div>
            </Link></li>
        ))
        let pinpaiFoot=!hotList?<div></div>:hotList.timeList.pinpaiLi.map(({img,text})=>(
            <li key={text}><Link to={{pathname:"/goods/1/name/秋冬"}} >
                <img src={img} />
                <p>{text}</p>
            </Link></li>
        ))
        return (
            <div className="listBox w1200">
                <ul className="showUl">
                    {showDom}
                </ul>
                <div className="timeShopping">
                    <div className="showHP">
                        <h4>限时购</h4><span>{time}</span>
                    </div>
                    <div className="showContent cl">
                        <div className="imgDiv">
                            <img src={hotList?hotList.timeList.show.img:""} />
                            <div className="textDiv">
                                <p className="imgmsgP">{hotList?hotList.timeList.show.msg:""}</p>
                                <p className="imgtextP">{hotList?hotList.timeList.show.text:""}</p>
                            </div>
                        </div>
                        <div className="imgRight">
                            <BannerSmall bannerSmall={hotList?hotList.timeList.showList:[]} />
                        </div>
                    </div>
                </div>
                <div className="darenBox">
                    <div className="darenHP">
                        <h4>达人甄选</h4>
                    </div>
                    <div className="darenContent cl">
                        <div className="imgDiv">
                            <img src={hotList?hotList.timeList.daren.img:""} />
                            <div className="textDiv">
                                <p className="imgmsgP">{hotList?hotList.timeList.daren.msg:""}</p>
                                <p className="imgtextP">{hotList?hotList.timeList.daren.text:""}</p>
                            </div>
                        </div>
                        <ul className="imgRight">
                            {darenDom}
                        </ul>
                    </div>
                </div>
                <div className="paihangBox">
                    <h4>排行榜</h4>
                    <div className="paihangContent">
                        <div className="imgDiv">
                            <img src={hotList?hotList.timeList.paihang.img:""} />
                            <div className="textDiv">
                                <p className="imgmsgP">{hotList?hotList.timeList.paihang.msg:""}</p>
                                <p className="imgtextP">{hotList?hotList.timeList.paihang.text:""}</p>
                            </div>
                        </div>
                        <div className="imgRight">
                            {paihangList}
                        </div>
                    </div>
                    <div className="pinpaiBox">
                        <h4>品牌馆</h4>
                        <ul className="pinpaiContent">
                            {pinpaiDom}
                        </ul>
                        <ul className="paipaiFoot">
                            {pinpaiFoot}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}