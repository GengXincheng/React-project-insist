
import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import memoryUtils from '../../utils/memoryUtils';
import Header from '../../components/header/header'
import LeftNav from '../../components/left-nav/left-nav'
import { Layout } from 'antd';
import Home from '../home/home';
import Category from '../category/category';
import Bar from '../charts/bar';
import Line from '../charts/line';
import Pie from '../charts/pie';
import Product from '../product/product';
import Role from '../role/role';
import User from '../user/user';
const { Footer, Sider, Content } = Layout;
// 后台管理的路由组件
export default class Admin extends Component {
    render() {
        const user = memoryUtils.user
        if (!user || !user._id) {
            return <Redirect to='/login'></Redirect>
        }
        return (
            //外层{}表示要写js代码,里面的{}表示一个js对象
            <Layout style={{ height: "100%" }}>
                <Sider>
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header> </Header>
                    <Content style={{ margin:"20px" , background: "#fff" }}>
                        <Switch>
                            <Route path='/home' component={Home} />
                            <Route path='/category' component={Category} />
                            <Route path='/product' component={Product} />
                            <Route path='/role' component={Role} />
                            <Route path='/user' component={User} />
                            <Route path='/charts/bar' component={Bar} />
                            <Route path='/charts/line' component={Line} />
                            <Route path='/charts/pie' component={Pie} />
                            <Redirect to='/home' />
                        </Switch>
                    </Content>
                    <Footer style={{ testAlign: 'center', color: '#ccc' }}>推荐使用谷歌浏览器</Footer>
                </Layout>
            </Layout>

        )
    }
}
