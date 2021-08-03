import React, { Component } from 'react'
import { Link,withRouter } from 'react-router-dom'
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
 class LeftNav extends Component {
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
        //得到当前请求的路径
       const path = this.props.location.pathname
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
                //查找一个与当前请求路径匹配的子Item
                const cItem = item.children.find(cItem=> cItem.key === path)
                if(cItem){
                    this.OpenKey = item.key
                }
                return(
                    <SubMenu key={item.key} icon={<MailOutlined />} title= {item.title}>
                  {this.getMenuNodes_map(item.children)}
                </SubMenu>
                )
            }
            return
        })
    };
    componentWillMount(){
        this.menuNode =  this.getMenuNodes_map(menuconfig)
    };
    render() {
        //debugger
        //得到当前请求的路径
       // const menuNode =  this.getMenuNodes_map(menuconfig)
       const path = this.props.location.pathname
       const openKey = this.OpenKey
        return <div className="left-nav">
            <Link to={'/'} className='left-nav-header'>
                <img src={ing} alt="" srcSet="" />
                <h1>后台</h1>
            </Link>
            <Menu
                mode="inline"
                theme="dark"
                selectedKeys={[path]}
                defaultOpenKeys={[openKey]}
            >
                {
                   this.menuNode
                }
               
            </Menu>
        </div>
    }
}
// withRouter 高阶组件
//包装非路由组件,返回一个新的组件,
// 新的组件向非路由组件传递3个属性:history/location/match
export default withRouter(LeftNav)