
import {Button,Form,Row,Col,Input,Icon} from "antd"
import {Link} from "react-router-dom"

import loginImg from "../../images/logo-icon.png"
// let loginImg=require("../../images/logo-icon.png")
import "./index.less"
import {allList,createCode} from "./createArray"

let vals=[
    {
        id:"username",
        val:[
            {min:4,message:" 用户名长度必须大于3"},
            {max:16,message:" 用户名长度必须小于17"},
            {reg:/^\w+$/,message:" 用户名必须使用数字字母和下划线组合"}
        ]
    },
    {
        id:"userpwd",
        val:[
            {min:6,message:" 用户名长度必须大于5"},
            {max:22,message:" 用户名长度必须小于21"},
            {reg:/^\w+$/,message:" 用户名必须使用数字字母和下划线组合"}
        ]
    },
    {
        id:"usertel",
        val:[
            {reg:/^1[3-9][0-9]{9}$/,message:"请输入正确的手机号"}
        ]
    },
    {
        id:"useryan",
        val:[
            {validator:function(val1,val2){
                if(val2){                   
                    if(val1.toUpperCase()==val2.toUpperCase()){
                        return true
                    }else{
                        return false
                    }
                }                
            },message:"验证码输入不一致"}
        ]
    }
]

function hasError(value="",validators,value1=""){
    let message=[]
    validators.map(val=>{
        if(val.min&&value.length<val.min){
            message.push(val.message)
        }else if(val.max&&value.length>val.max){
            message.push(val.message)
        }else if(val.reg&& !val.reg.test(value)){
            message.push(val.message)
        }else if(val.validator&& !val.validator(value,value1)){
            message.push(val.message)
        }
    })
    return message.length>0?message:false
}

class UI extends React.Component{
    constructor(props){
        super(props)
        this.state={
            usernameError:false,
            userpwdError:false,
            usertelError:false,
            useryanError:false,
            yanZheng:""
        }
        this.gfd=this.props.form.getFieldDecorator
        // 获取表单的值
        this.getValue=this.props.form.getFieldValue
        this.reg=this.reg.bind(this)
        this.validator=this.validator.bind(this)
        this.yanClick=this.yanClick.bind(this)
    }
    componentDidMount(){
        this.setState({
            yanZheng:createCode(allList,4)
        })
    }
    toTest(vals,valueName){
        let isSub=true
        vals.map(({id,val})=>{
            if(!valueName||id==valueName){
                let value=this.getValue(id)
                let isError=null;
                if(id=="useryan"){
                    let value1=this.state.yanZheng
                    isError=hasError(value,val,value1)
                }else{
                    isError=hasError(value,val)
                }
                if(isError){
                    isSub=false
                }
                this.setState({
                    [id+"Error"]:isError
                })
            }
        })
        return isSub
    }
    reg(e){
        e.preventDefault()
        let isSub=this.toTest(vals)
        console.log(this.state.usertelError)
        if(isSub){
            if(localStorage["username_"+this.getValue("username")]){
                alert("用户名已存在");
                this.setState({
                    yanZheng:createCode(allList,4)
                })
            }else{
                localStorage["username_"+this.getValue("username")]=this.getValue("username");
                localStorage["userpwd_"+this.getValue("username")]=this.getValue("userpwd");
                alert("注册成功")
                this.props.history.push("/login")
            }
        }else{
            this.setState({
                yanZheng:createCode(allList,4)
            })
            alert("请根据红色提醒,填写完整")
        }
    }
    validator(e){
        this.toTest(vals,e.target.id)
    }
    yanClick(e){
        this.setState({
            yanZheng:createCode(allList,4)
        })
    }

    render(){
            let {usernameError,userpwdError,usertelError,yanZheng,useryanError}=this.state
            console.log(yanZheng)
        return (
                <div className="W_register w1200">
                    <div className="register_head">
                        <img src="https://s10.mogucdn.com/mlcdn/c45406/190102_088f4i166l4gkl08k297h5kk8690i_260x200.png" />
                        <h4>甄选全球高品质</h4>
                    </div>
                    <div className="register_content">
                        <h5>注册蘑菇街会员</h5>
                            <Row>
                                <Col span={8} offset={8}>
                                    <Form
                                        onChange={this.validator} onSubmit={this.reg}
                                    >
                                        <Form.Item
                                            validateStatus={usernameError?"error":""}
                                            help={usernameError||""}
                                        >{
                                            this.gfd("username")(<Input size="large" prefix={<Icon type="user" style={{fontSize:13}} />} placeholder="请输入4到16位非特殊字符的用户名" />)
                                        }</Form.Item>
                                        <Form.Item
                                            validateStatus={userpwdError?"error":""}
                                            help={userpwdError||""}
                                        >{
                                            this.gfd("userpwd")(<Input type="password" size="large" prefix={<Icon type="lock" style={{fontSize:13}} />} placeholder="请输入6到22位非特殊字符密码" />)
                                        }</Form.Item>
                                        <Form.Item
                                            validateStatus={usertelError?"error":""}
                                            help={usertelError||""}
                                        >{
                                            this.gfd("usertel")(<Input size="large" prefix={<Icon type="mobile" style={{fontSize:13}} />} placeholder="请输入正确的手机号" />)
                                        }</Form.Item>
                                        <Form.Item
                                            validateStatus={useryanError?"error":""}
                                            help={useryanError||""}
                                        >{
                                            this.gfd("useryan")(<Input className="lastInput" size="large" prefix={<Icon type="exception" style={{fontSize:13}} />} placeholder="请输入验证码" />)
                                        }<span className="useryan" onClick={this.yanClick}>{yanZheng}</span>
                                        </Form.Item>
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit" size="large">注册</Button>
                                            <span>我已经注册,<Link to="/login">去登录</Link></span>
                                        </Form.Item>
                                    </Form>
                                </Col>
                            </Row>
                    </div>
                </div>
        )
    }
}

export let Register=Form.create()(UI)