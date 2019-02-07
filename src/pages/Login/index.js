import {Button,Form,Row,Col,Input,Icon} from "antd"
import {Link} from "react-router-dom"
import loginImg from "../../images/logo-icon.png"
import "./index.less"
class UI extends React.Component{
    constructor(props){
        super(props)
        this.state={
            usernameError:false
        }
        this.gfd=this.props.form.getFieldDecorator
        // 获取表单的值
        this.getValue=this.props.form.getFieldValue
        this.reg=this.reg.bind(this)
    }
    reg(e){
        e.preventDefault()
        let value =this.getValue("username")
        let pwd=this.getValue("userpwd")
        if(!localStorage["username_"+value]){
            this.setState({
                usernameError:"用户名和密码不一致"
            })
        }else{
            if(localStorage["userpwd_"+value]==pwd){
                sessionStorage["usernameLogin"]=value
                this.setState({
                    usernameError:false
                })
                alert("登录成功")
                sessionStorage.is_Login?this.props.history.push(sessionStorage.is_Login):this.props.history.push("/home")
                // this.props.history.push("/register")
            }else{
                this.setState({
                    usernameError:"用户名和密码不一致"
                })
            }  
        }
    }
    render(){
        let {usernameError}=this.state
        return (
            <div className="W_login">
                <div className="login_head w1200">
                    <img src="https://s10.mogucdn.com/mlcdn/c45406/190102_088f4i166l4gkl08k297h5kk8690i_260x200.png" />
                    <h4>甄选全球高品质</h4>
                </div>
                <div className="login_content">
                    
                    <Row>
                        <Col span={8} offset={8}>
                            <h5>登录蘑菇街会员</h5>
                            <Form
                                onSubmit={this.reg}
                            >
                                <Form.Item
                                    validateStatus={usernameError?"error":""}
                                    help={usernameError||""}
                                    >{
                                        this.gfd("username")(<Input size="large" prefix={<Icon type="user" style={{fontSize:13}} />} placeholder="请输入用户名" />)
                                    }</Form.Item>
                                    <Form.Item
                                    >{
                                        this.gfd("userpwd")(<Input type="password" size="large" prefix={<Icon type="lock" style={{fontSize:13}} />} placeholder="请输入密码" />)
                                    }</Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" size="large">登录</Button>
                                        <span>还未注册,<Link to="/register">去注册</Link></span>
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>
                </div>
            </div>
        )
    }
}
export let Login =Form.create()(UI)