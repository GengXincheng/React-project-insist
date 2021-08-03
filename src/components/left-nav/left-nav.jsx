import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './leftNav.css'
import ing from '../../../src/assets/images/yuan.webp'
import { Menu } from 'antd';
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';
import Home from '../../pages/home/home';
import menuconfig from '../../config/menuconfig'
import { ItemGroup } from 'rc-menu';
import Item from 'antd/lib/list/Item';
import { toBindingIdentifierName } from '@babel/types';
const { SubMenu } = Menu;
export default class LeftNav extends Component {
    state = {
        collapsed: false,
    };

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    // 根据menuconfig生成对应的标签数组
    // 使用map() ＋ 递归
    getMenuNodes_map = (menuconfig) => {
        return menuconfig.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key} icon={<PieChartOutlined />}>
                        <Link to={item.key} >
                            {item.title}
                        </Link>
                    </Menu.Item>
                )
            }else{
                return(
                    <SubMenu key={item.key} icon={<MailOutlined />} title= {item.title}>
                  {this.getMenuNodes_map(item.children)}
                </SubMenu>
                )
            }
            return
        })
    };
    
    render() {
        return <div className="left-nav">
            <Link to={'/'} className='left-nav-header'>
                <img src={ing} alt="" srcset="" />
                <h1>后台</h1>
            </Link>
            <Menu
                mode="inline"
                theme="dark"
            >
                {
                    this.getMenuNodes_map(menuconfig)
                }
                {/* <Menu.Item key="1" icon={<PieChartOutlined />}>
                    <Link to='/home'>
                        首页
                    </Link>
                </Menu.Item>

                <SubMenu key="sub1" icon={<MailOutlined />} title="商品">
                    <Menu.Item icon={<MailOutlined />} key="/caategory">
                        <Link to='/category'>品类管理</Link>
                    </Menu.Item>
                    <Menu.Item key="/product"><Link to='/product'>商品管理</Link></Menu.Item>
                </SubMenu>
                <Menu.Item key="/useruser"><Link to='/user'>用户管理</Link></Menu.Item>
                <Menu.Item key="/role"><Link to='/role'>角色管理</Link></Menu.Item> */}
            </Menu>
        </div>
    }
}
