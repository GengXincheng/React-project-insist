
import React, { Component } from 'react'
import './heaer.less'
import { withRouter } from 'react-router'
import memoryUtils from '../../utils/memoryUtils'
import menuList from '../../config/menuconfig'
import { reqWeather } from '../../api/index'
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
// import { ScrollMode } from 'scroll-into-view-if-needed/typings/types'
import storageUtils from '../../utils/storageUtils';
 import LinkButton from '../link-button/link-button'
const { confirm } = Modal;
class Header extends Component {
    state = {
        currentTime: new Date().toLocaleString(),
        type: 'qing'//初始数据
    }
    getTime = () => {
        this.timeOut = setInterval(() => {
            const currentTime = new Date().toLocaleString()
            this.setState({ currentTime })
        }, 1000)
    }
    getWeather = async () => {
        const type = await reqWeather('北京')
        // console.log(type);
        //更新状态
        this.setState({ type })
    }
    logout = () => {
        confirm({
            icon: <ExclamationCircleOutlined />,
            content: '确定退出吗?',
            onOk: () => {
                //删除user数据
                storageUtils.removeUesr()
                memoryUtils.user = {}
                //跳转到login
                this.props.history.replace('/login')
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    getTitle = () => {
        //得到当前请求路径
        const path = this.props.location.pathname
        let title
        menuList.forEach(item => {
            if (item.key === path) {
                title = item.title
            } else if (item.children) {
                const cItem = item.children.find(cItem => cItem.key === path)
                // console.log(cItem);

                if (cItem) {
                    title = cItem.title
                }
            }
        })
        return title
    }
    componentDidMount() {
        //获取当前时间
        this.getTime()
        //获取当前天气
        this.getWeather()
    }
    componentWillUnmount() {
        clearInterval(this.timeOut)
    }
    render() {
        const { currentTime, type } = this.state
        const username = memoryUtils.user.username
        const title = this.getTitle()
        return (
            <div className='header'>
                <div className="header_top">
                    <span>欢迎,{username}</span>


                    <LinkButton onClick={this.logout}>退出</LinkButton>



                </div>
                <div className="header_bottom">
                    <div className="header_bottom_left">
                        <span>{title}</span>
                    </div>
                    <div className="header_bottom_right">
                        <span>{currentTime}</span>
                        <img src="" alt="weather" />
                        <span>{type}</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Header)

