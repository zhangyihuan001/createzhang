
import {connect} from "react-redux"
import "./index.less"
import { getDetailData, changeNum } from "../../createActions/action";
import { Head } from "../../components/head";
import { Footer } from "../../components/footer";
// import { BannerDetail } from "../../components/bannerDetail";
import {Modal} from "antd"
const confirm = Modal.confirm;
const success = Modal.success;

class UI extends React.Component{
    constructor(props){
        super(props)
        this.setNum=this.setNum.bind(this)
        this.delNum=this.delNum.bind(this)
        this.buyShopCar=this.buyShopCar.bind(this)
        this.addShopCar=this.addShopCar.bind(this)
    }
    componentDidMount(){
        this.props.getData(this.props.match.params.goodsID)
    }
    buyShopCar(){
        let username=sessionStorage.usernameLogin
            if(username){
                let userlist=[]
                let shopCar=localStorage.getItem(username+"_shopCar")
                if(shopCar==null){
                    // this.goodslist.checkNum=this.checkNum1
                    let newlist1=this.props.goods
                    newlist1.num=this.refs.hupeng.value*1
                    userlist.push(newlist1)
                }else{
                    let flag=false
                    // 当localStorage里面有储藏的值时,就先转化为数组类型
                    shopCar=JSON.parse(shopCar)
                    // 再将新的商品添加进去
                    shopCar.map((item,i)=>{
                        if(item._id==this.props.goods._id){
                            flag=true
                            item.num+=this.refs.hupeng.value*1
                        }
                    })
                    if(!flag){
                        // this.goodslist.checkNum=this.checkNum1
                        // shopCar.push(this.goodslist)
                        let newlist=this.props.goods
                        newlist.num=this.refs.hupeng.value*1
                        shopCar.push(newlist)
                    }
                    userlist=shopCar
                    
                }
                localStorage.setItem(username+"_shopCar",JSON.stringify(userlist))
                // this.$emit("shopNum")
                // if(confirm("商品加入购物车成功,您确定要结算吗？")){
                //     // this.props.push("")
                //     // console.log("进入购物车")
                //     this.props.history.push("/shopcar")
                // }
                confirm({
                    title:"商品加入购物车成功,您确定要结算吗？",
                    okText: '确定',
                    cancelText: '再瞧瞧',
                    onOk:()=>{
                        this.props.history.push("/shopcar")
                    }
                })
            }else{
                // if(confirm("亲,您还未登录,请先登录")){
                //     let {pathname}=this.props.history.location
                //     sessionStorage.is_Login=pathname
                //     this.props.history.push("/login")
                // }
                confirm({
                    title:"亲,您还未登录,请先登录",
                    okText: '确定',
                    cancelText: '取消',
                    onOk:()=>{
                        let {pathname}=this.props.history.location
                        sessionStorage.is_Login=pathname
                        this.props.history.push("/login")
                    }
                })
            }
    }
    addShopCar(){
        let username=sessionStorage.usernameLogin
            if(username){
                let userlist=[]
                let shopCar=localStorage.getItem(username+"_shopCar")
                if(shopCar==null){
                    // this.goodslist.checkNum=this.checkNum1
                    let newlist1=this.props.goods
                    newlist1.num=this.refs.hupeng.value*1
                    userlist.push(newlist1)
                    
                }else{
                    let flag=false
                    // 当localStorage里面有储藏的值时,就先转化为数组类型
                    shopCar=JSON.parse(shopCar)
                    // 再将新的商品添加进去
                    shopCar.map((item,i)=>{
                        if(item._id==this.props.goods._id){
                            flag=true
                            item.num+=this.refs.hupeng.value*1
                        }
                    })
                    if(!flag){
                        // this.goodslist.checkNum=this.checkNum1
                        // shopCar.push(this.goodslist)
                        let newlist=this.props.goods
                        newlist.num=this.refs.hupeng.value*1
                        shopCar.push(newlist)
                    }
                    userlist=shopCar
                    
                }
                localStorage.setItem(username+"_shopCar",JSON.stringify(userlist))
                // this.$emit("shopNum")
                // alert("成功加入购物车")
                success({
                    title:"成功加入购物车"
                })

            }else{
                // if(confirm("亲,您还未登录,请先登录")){
                //     let {pathname}=this.props.history.location
                //     sessionStorage.is_Login=pathname
                //     this.props.history.push("/login")
                // }
                confirm({
                    title:"亲,您还未登录,请先登录",
                    okText: '确定',
                    cancelText: '取消',
                    onOk:()=>{
                        let {pathname}=this.props.history.location
                        sessionStorage.is_Login=pathname
                        this.props.history.push("/login")
                    }
                })
            }
    }
    setNum(){
        if(this.refs.hupeng){
            this.refs.hupeng.value++
            this.props.getnum(this.refs.hupeng.value)
        }
    }
    delNum(){
        if(this.refs.hupeng){
            this.refs.hupeng.value<=1?1:this.refs.hupeng.value--
            this.props.getnum(this.refs.hupeng.value)
        }
    }
    render(){
        let {goods}=this.props
        let detailDom=this.props.goods.length==0?<div></div>:(
            <div className="detailPage">
                <div className="detailDiv w1200">
                    <p className="headerDt">产品详情了解</p>
                    <div className="goodsDetail cl">
                        <div className="detailImg">
                            <img src={goods.img} />
                            {/* <BannerDetail bannerList={goods.imgList} /> */}
                        </div>
                        <div className="msgBox">
                            <p className="detailName">{goods.title}</p>
                            <p className="detailID">商品编号:{goods.tradeItemId}</p>                
                            <p className="detailInfo">商品ID:{goods._id}</p>
                            <p className="detailPrice">官网会员价 <span>¥{goods.price}</span> <del>¥{goods.orgPrice}</del></p>
                            <p className="detailText">销量: {goods.sale}(件)</p>
                            <p className="checkNum">购买数量：
                                <button className="minus1" onClick={this.delNum}>-</button>
                                <input type="text" className="inputNum1" ref="hupeng" defaultValue={this.props.valueNum||1} />
                                <button className="plus1" onClick={this.setNum} >+</button>
                            </p>
                            <button className="buy" onClick={this.buyShopCar}>立即购买</button><button className="addshop" onClick={this.addShopCar}>加入购物车</button>
                        </div>
                    </div>
                </div>
            </div>
        )
        return (
            <div>
                <Head his={this.props.history} />
                {detailDom}
                <Footer />
            </div>
        )
    }
}

let mstp=({detail})=>detail
let mdtp=dispatch=>({
    getData(goodsID){
        dispatch(getDetailData(goodsID))
    },
    getnum(num){
        dispatch(changeNum(num))
    }
})
export let Detail=connect(mstp,mdtp)(UI)