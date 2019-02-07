
import {Route,Switch,Redirect} from "react-router-dom"
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Goods } from "./pages/Goods";
import { Detail } from "./pages/Detail";
import { MyShopCar } from "./pages/myShopCar";

export class Index extends React.Component{
    render(){
        return (
                <Switch>
                    <Redirect path="/" to="/home" exact={true} />
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />                   
                    <Route path="/home" component={Home} />  
                    <Route path="/goods/:page/:sort/:search" component={Goods} /> 
                    <Route path="/detail/:goodsID" component={Detail} /> 
                    <Route path="/shopcar" component={MyShopCar} /> 
                </Switch>                     
        )
    }
}
