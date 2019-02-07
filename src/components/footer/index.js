import "./index.less"
import {Link} from "react-router-dom"
export class Footer extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className="Foot">
                <ul>
                    <li><Link to="/home">女装app</Link></li>
                    <li><Link to="/home">品牌</Link></li>
                    <li><Link to="/home">网站联盟</Link></li>
                    <li><Link to="/home">新款上市</Link></li>
                    <li><Link to="/home">热销</Link></li>
                    <li><Link to="/home">天猫女装网旗舰店</Link></li>
                    <li><Link to="/home">京东女装网旗舰店</Link></li>
                    <li><Link to="/home">潮流达人</Link></li>
                    <li><Link to="/home">款式资讯</Link></li>
                    <li><Link to="/home">斯尔丽</Link></li>
                </ul>
                <p>蘑菇街 版权所有 2018-2028 ICP备案证书号:粤ICP备09108888号 网监备案:4401066666641</p>
                <p>广州市蘑菇街服装股份有限公司 地址:广州市番禺区番禺大道</p>
                <p>Copyright 2008-2017 WWW.WBIAO.CN.LTD ALL RIGHT RESERVED.</p>
            </div>
        )
    }
}