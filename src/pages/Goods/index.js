
import {connect} from "react-redux"
import { Head } from "../../components/head";
import {Link,NavLink} from "react-router-dom"
import{Select,Spin,Pagination} from "antd"
const Option = Select.Option;

import "./index.less"
import { GetGoodsData } from "../../createActions/action";
import { Footer } from "../../components/footer";
class UI extends React.Component{
    constructor(props){
        super(props)
        this.getList=this.getList.bind(this)
        this.getSelect=this.getSelect.bind(this)
    }
    componentDidMount(){
        let {pageSize}=this.props   
        // if(this.props.match.params.search=="default")this.props.match.params.search=' '
        this.props.getData(this.props.match.params.page,pageSize,this.props.sort,this.props.match.params.search,this.props.asc)
    }
    componentDidUpdate(props){
        // console.log(this.props)
        // if(this.props.match.params.search=="default")this.props.match.params.search=' '
        if(props.match.params.sort!=this.props.match.params.sort||props.match.params.search!=this.props.match.params.search){
            let {pageSize}=this.props
            // console.log("更新")
            this.props.getData(1,pageSize,this.props.match.params.sort,this.props.match.params.search,this.props.asc)
        }
    }
    getList(page,pageSize){
        // console.log("分页")
        // if(this.props.match.params.search=="default")this.props.match.params.search=' '
        this.props.getData(page,pageSize,this.props.match.params.sort,this.props.match.params.search,this.props.asc)
        // if(this.props.match.params.search){
            this.props.history.push({pathname:"/goods/"+page+"/"+this.props.sort+"/"+this.props.match.params.search})
        // }else{
            // this.props.history.push({pathname:"/goods/"+page+"/"+this.props.sort+"/default"})
        // }

    }
    getSelect(value,Option){
        // if(this.props.match.params.search=="default")this.props.match.params.search=' '
        this.props.getData(this.props.match.params.page,this.props.pageSize,this.props.match.params.sort,this.props.match.params.search,value)
    }
    render(){
        let liDom=!this.props.list?<div></div>:this.props.list.map(({img,orgPrice,_id:goodsID,price,title,sale})=>(
            <li key={goodsID}>
                <Link className="Img" to={{pathname:"/detail/"+goodsID}}><img src={img} /></Link>
                <div className="divInfo">
                    <p className="goodsprice"><span>¥{price}</span><del>¥{orgPrice}</del></p>
                    <p className="goodsMsg">{title}</p>
                    <p className="xiaoliang">销量{sale}</p>
                    {/* <p className="goodsname">{name}</p> */}
                    <p className="shopP"><Link to={{pathname:"/detail/"+goodsID}} className="shopcar">加入购物车</Link></p>
                </div>
            </li>
        ))
        return (
            <div>
                <Head his={this.props.history} />
                <div className="paixuBox w1200 cl">
                    <h4>商品列表</h4>
                    <ul>
                        <li><NavLink activeClassName="activePai" to={{pathname:"/goods/1/title/"+this.props.match.params.search}} >综合排序</NavLink></li>
                        <li><NavLink activeClassName="activePai" to={{pathname:"/goods/1/sale/"+this.props.match.params.search}} >销量优先</NavLink></li>
                        <li><NavLink activeClassName="activePai" to={{pathname:"/goods/1/price/"+this.props.match.params.search}} >价格排序</NavLink></li>
                    </ul>
                    <Select size="large" defaultValue="1" onSelect={this.getSelect}>
                        <Option value="1">正序</Option>
                        <Option value="0">倒序</Option>
                    </Select>
                    <div className="pagin">
                    <Pagination simple current={this.props.match.params.page*1} pageSize={this.props.pageSize} total={this.props.count} onChange={this.getList} />
                    </div>
                </div>
                <Spin tip="狂奔中..." spinning={this.props.isSpin}>
                    <ul className="goodslist w1200">
                        {liDom}
                    </ul>
                    <div className="everyPage">
                        <Pagination
                        pageSize={this.props.pageSize}
                        showQuickJumper={true}
                        total={this.props.count}
                        current={this.props.match.params.page*1}
                        onChange={this.getList}
                        />
                    </div>
                </Spin>
                <Footer />
            </div>
        )
    }
}
let mstp=({goods})=>goods
let mdtp=dispatch=>({
    getData(page,pageSize,sort="title",key=" ",asc="1"){
        dispatch(GetGoodsData(page,pageSize,sort,key,asc))
    }
})
export let Goods =connect(mstp,mdtp)(UI)