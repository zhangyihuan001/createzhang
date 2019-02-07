import {NavLink} from "react-router-dom"
import "./index.less"
export class Nav extends React.Component{
    constructor(props){
        super(props)
        this.state={
            list:[
                {title:"首页",path:"/home"},
                {title:"时尚款",path:"/goods/1/name/ada924d"},
                {title:"热销款",path:"/goods/1/name/ada924e"},
                {title:"品牌馆",path:"/goods/1/name/ada924f"}
            ]
        }
    }
    render(){
        let liDom=this.state.list.map(({title,path})=>(<li  key={title}><NavLink to={path} activeClassName="active" >{title}</NavLink></li>))
        return (
            <div className="navDiv w1200">
                <div className="dfDiv"><NavLink to="/goods/1/name/default" >全部商品</NavLink></div>
                <ul>
                    {liDom}
                </ul>
            </div>
        )
    }
}