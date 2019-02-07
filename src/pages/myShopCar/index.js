
// import {connect} from "react-redux"
import {Link} from "react-router-dom"
import "./index.less"
import { Head } from "../../components/head";
import { Footer } from "../../components/footer";
// let username=sessionStorage.usernameLogin;
export class MyShopCar extends React.Component{
    constructor(props){
        super(props)
        this.state={
            list:JSON.parse(localStorage.getItem((sessionStorage.usernameLogin)+"_shopCar")),
            carFlag:false,
            isAll:true,
            allNum:0,
            allMoney:0
        }
        this.setNum=this.setNum.bind(this)
        this.addNum=this.addNum.bind(this)
        this.isChange=this.isChange.bind(this)
        this.everyCheck=this.everyCheck.bind(this)
        this.delGoods=this.delGoods.bind(this)
        this.buyGoods=this.buyGoods.bind(this)
        this.delSome=this.delSome.bind(this)
    }
    // componentWillMount(){
    //     let username=sessionStorage.usernameLogin;
    //     this.state.list=JSON.parse(localStorage.getItem(username+"_shopCar"))
    //     if(this.state.list.length==0){
    //         this.state.carFlag=true;
    //     }
    // }
    everyCheck(index){
        return (()=>{
            let num=0,money=0      
            this.refs.checkAll.checked=true     
            for(let i=0;i<this.state.list.length;i++){
                if(!this.refs[i+"_check"].checked){
                    this.refs.checkAll.checked=false
                }else{
                    num+=this.state.list[i].num*1
                    money+=this.state.list[i].num*this.state.list[i].price
                }
            }

            this.setState({
                allNum:num,
                allMoney:money
            })
        })
    }
    isChange(e){
        let num=0,money=0      
        for(let i=0;i<this.state.list.length;i++){
            this.refs[i+"_check"].checked=e.target.checked
            if(!this.refs[i+"_check"].checked){
                this.refs.checkAll.checked=false
            }else{
                num+=this.state.list[i].num*1
                money+=this.state.list[i].num*this.state.list[i].price
            }
        }
        this.setState({
            isAll:e.target.checked,
            allNum:num,
            allMoney:money
        })
    }
    delGoods(index){
        return (()=>{
            let newList=[]
            this.state.list.map((car,i)=>{
                if(index!=i){
                    newList.push(car)
                }
            })
            if(newList.length==0){
                this.refs.checkAll.checked=false
            }
            let num=0,money=0      
            for(let i=0;i<newList.length;i++){
                if(!this.refs[i+"_check"].checked){
                    this.refs.checkAll.checked=false
                }else{
                    num+=newList[i].num*1
                    money+=newList[i].num*newList[i].price
                }
            }
            let username=sessionStorage.usernameLogin;
            localStorage.setItem(username+"_shopCar",JSON.stringify(newList))
            this.setState({
                list:newList,
                allNum:num,
                allMoney:money
            })
        })
    }
    setNum(goodsID){
        return (()=>{
            if(this.refs[goodsID]){
                let username=sessionStorage.usernameLogin;
                this.refs[goodsID].value*1<=1?1:this.refs[goodsID].value--
                let list=this.state.list
                list.map((item)=>{
                    if(goodsID==item._id){
                        item.num=this.refs[goodsID].value
                    }
                })
                let num=0,money=0      
                for(let i=0;i<list.length;i++){
                    if(!this.refs[i+"_check"].checked){
                        this.refs.checkAll.checked=false
                    }else{
                        num+=list[i].num*1
                        money+=list[i].num*list[i].price
                    }
                }
                localStorage.setItem(username+"_shopCar",JSON.stringify(list))
                this.setState({
                    list,
                    allNum:num,
                    allMoney:money
                })
            }
        })
    }
    addNum(goodsID){
        return (()=>{
            if(this.refs[goodsID]){
                let username=sessionStorage.usernameLogin;
                this.refs[goodsID].value++
                let list=this.state.list
                list.map((item)=>{
                    if(goodsID==item._id){
                        item.num=this.refs[goodsID].value
                    }
                })
                let num=0,money=0      
                for(let i=0;i<list.length;i++){
                    if(!this.refs[i+"_check"].checked){
                        this.refs.checkAll.checked=false
                    }else{
                        num+=list[i].num*1
                        money+=list[i].num*list[i].price
                    }
                }
                localStorage.setItem(username+"_shopCar",JSON.stringify(list))
                this.setState({
                    list,
                    allNum:num,
                    allMoney:money
                })
            }
        })
    }
    buyGoods(){
        // 结算事件
        if(this.state.allMoney==0){
            alert("您还未选择任何商品,请先勾选心仪商品")
        }else{
            alert("您共计消费"+this.state.allMoney+"元,购物愉快！")
        }
    }
    delSome(e){
        let newList=[],num=0,money=0
            this.state.list.map((item,i)=>{
                if(this.refs[i+"_check"].checked){
                    newList.push[item]
                    num+=this.state.list[i].num*1
                    money+=this.state.list[i].num*this.state.list[i].price
                }            
            })
            if(newList.length==0){
                this.refs.checkAll.checked=false
            }
            let username=sessionStorage.usernameLogin;
            localStorage.setItem(username+"_shopCar",JSON.stringify(newList))
            this.setState({
                list:newList,
                allNum:num,
                allMoney:money
            })
    }
    render(){
        let trDom=this.state.list.length==0?(<tr><td className="shopDP">您还没购买任何商品,请先去<Link to={{pathname:"/goods/1/name/default"}}>挑选商品</Link>哦</td></tr>):this.state.list.map(({img,orgPrice,_id:goodsID,price,title,tradeItemId,num},i)=>(
            <tr className="trList" key={goodsID}>
                <td width="80"><input className="checkInp checkEvery" type="checkbox" onClick={this.everyCheck(i)} ref={i+"_check"} /></td>
                <td width="300">
                    <div className="tdImg"><Link to={{pathname:"/detail/"+goodsID}}><img src={img} /></Link></div>
                    <div className="tdMsg">
                        <p className="tdName">{title}</p>
                        <p className="tdID">商品编号:{tradeItemId}</p>
                    </div>
                </td>
                <td width="150">
                    <button className="minus" onClick={this.setNum(goodsID)}>-</button>
                    <input type="text" className="inputNum" defaultValue={num} ref={goodsID} />
                    <button className="plus" onClick={this.addNum(goodsID)}>+</button>
                </td>
                <td width="130" className="tdPrice">{price}</td>
                <td width="130" className="tdcost">{orgPrice}</td>
                <td width="130" className="tdSum">{price*num}</td>
                <td width="130" className="tdDel"><span onClick={this.delGoods(i)}>删除</span></td>
            </tr>
        ))
        return (
            <div>
                <Head his={this.props.history} />
                <div className="shopCar">
                    <div className="shopCarBox w1200 cl">
                        <h3>我的购物车</h3>
                        <div className="notice">
                            <span>客户经理提示:</span>
                            <p>1.选购清单中的商品无法保留库存，商品的价格和库存将以订单提交时为准，及时结算保量又保优哦。2.8小时快速退款，7天无忧退货，放心买吧。</p>
                        </div>
                        <div className="shopDiv">
                            <table width="100%">
                                <tbody>
                                <tr>
                                    <th width="80"><input className="checkInp" type="checkbox" onClick={this.isChange} ref="checkAll" /> 全选</th>
                                    <th width="300">商品</th>
                                    <th width="150">数量</th>
                                    <th width="130">会员价</th>
                                    <th width="130">原价</th>
                                    <th width="130">小计</th>
                                    <th width="130">操作</th>
                                </tr>                              
                                    {trDom}
                                </tbody>
                            </table>
                            {/* <p  className="shopDP">您还没购买任何商品,请先去<Link to="{name:'g'}">挑选商品</Link>哦</p> */}
                        </div>
                        <div className="footAll">
                            <p className="delSome" onClick={this.delSome}>删除选中</p>
                            <p>产品数量总计: <span className="allCount">{this.state.allNum}件</span></p>
                            <p>产品价格总计: <span className="allPrice">¥ {this.state.allMoney}</span></p>
                        </div>
                        <button className="buyGoods" onClick={this.buyGoods}>结 算</button>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}