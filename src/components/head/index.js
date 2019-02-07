
import {Link} from "react-router-dom"
import {Icon,Input} from "antd"
import "./index.less"
import { Nav } from "../nav";
let loginImg = require("../../images/logo-icon.png")
export class Head extends React.Component{
    constructor(props){
        super(props)
        this.sub=this.sub.bind(this)
        this.emit=this.emit.bind(this)
        this.goShop=this.goShop.bind(this)
    }
    goShop(){
        let username=sessionStorage['usernameLogin'];
        if(username){
            this.props.his.push("/shopcar")
        }else{
            if(confirm("您还未登录,请先登录")){
                let {pathname}=this.props.his.location
                sessionStorage.is_Login=pathname
                this.props.his.push("/login")
            }
        }
    }
    emit(){
        let {pathname}=this.props.his.location
        sessionStorage.is_Login=pathname
        sessionStorage.removeItem('usernameLogin')
        // this.session="";
        // this.$router.replace({name:"h"})
        this.props.his.push(sessionStorage.is_Login)
    }
    sub(e){
        e.preventDefault()
        // e.stopPropagation()
        
        this.props.his.push({pathname:"/goods/1/name/"+(this.refs.un.state.value||"default")})
    }
    render(){
        let loginDom=sessionStorage['usernameLogin']?(<span>{sessionStorage['usernameLogin']}<span className="tuichu" onClick={this.emit}>退出</span></span>):(<Link to="/login">请登录</Link>)
        return (
            <div className="headBox">
                {/* <div className="headOne">
                    <div className="headOneImg w1200"></div>
                </div> */}
                <div className="headTwo cl">
                    <div className="w1200">
                        <div className="headTwoLeft">
                            <span className="pinzhi">正品保证,免息分期</span>
                            {loginDom}
                        </div>
                        <div className="headTwoRgt">
                            <span onClick={this.goShop}><Icon type="shopping-cart" />购物车</span>
                            <Link to="/home">客户服务</Link>
                            <Link to="/home">会员福利</Link>
                        </div>
                    </div>
                </div>
                <div className="headTrd w1200">
                <Link to="/home"><img src="https://s10.mogucdn.com/mlcdn/c45406/190102_088f4i166l4gkl08k297h5kk8690i_260x200.png" /></Link>
                    <h4>甄选全球高品质</h4>
                    <form className="searchDiv" onSubmit={this.sub}>
                        <Input size="large" ref="un" prefix={<Icon type="search" />} className="searchInp" />
                        <Input type="submit" className="searchBtn" value="搜索"/>
                    </form>
                </div>
                <Nav />
            </div>
        )
    }
}