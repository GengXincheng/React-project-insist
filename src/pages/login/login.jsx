
import React, { Component } from 'react'
//import { Redirect } from 'react-router';
import "./Login.less";
//import ReactDom from 'react-dom'
import logo from "./images/kenan.webp";
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { reqLogin } from '../../api';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import { Redirect } from 'react-router-dom';
// 登录的路由组件

export default class Login extends Component {
    handleSubmit = (even) => {
        // console.log(even);

    }
    render() {
        //判断用户是否登录
        const user = memoryUtils.user
       
        if(user && user._id){
            //用户已经登录,转到后台页面,&&两者都为true返回true
            return <Redirect to={'/'}></Redirect>
        }
        const onFinish = async (values) => {
            //  console.log('Received values of form: ', values);
            //可以直接获取表单数据
            // console.log(values.username);
            const { username, password } = values

            const result = await reqLogin(username, password)
            console.log( result);
           // const result = response.data
            if(result.status === 0){
                message.success("登录成功")
                const user = result.data
                memoryUtils.user = user
              //  console.log(user);
                storageUtils.saveUser(user)
            
                //跳转到后台管理界面
                this.props.history.replace('/')
            }else{
                message.error("登录失败")
            }
        };
        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };
        return (
            <div className="login">
                <header className="login-heder">
                    <img src={logo} alt="logo" />
                    <h1>后台管理项目</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}

                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true, whitespace: true,
                                    message: '用户名错误',
                                },
                                {
                                    min: 4,
                                    message: '用户名错误',
                                },
                                {
                                    max: 12,
                                    message: '用户名错误',
                                }//验证规则少了部分,不影响大体
                            ]}
                            initialValue="admin"
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"

                            rules={[

                                {
                                    required: true,
                                    message: '用户名错误',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot" href="">
                                Forgot password
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>

                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}

// const WrapLogin = Form.create()(Login)
// export default WrapLogin