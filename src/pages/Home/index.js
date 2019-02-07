import {connect} from "react-redux"
import { Head } from "../../components/head";
import { Banner } from "../../components/banner";
import { getHomeData, getTime } from "../../createActions/action";
import { List } from "../../components/list";
import { Footer } from "../../components/footer";
class UI extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.props.getData()
        this.props.getTime()
    }
    render(){
        return (
            <div>
                <Head his={this.props.history} />
                <Banner bannerList={this.props.bannerList} />
                <List hotList={this.props.hotList} time={this.props.time} />
                <Footer />
            </div>
        )
    }
}
let mstp=({home})=>home
let mdtp=dispatch=>({
    getData(){
        dispatch(getHomeData())
    },
    getTime(){
        dispatch(getTime)
    }
})
export let Home=connect(mstp,mdtp)(UI)