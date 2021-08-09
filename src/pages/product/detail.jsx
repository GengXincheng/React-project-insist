import React, { Component } from 'react'
import { Card,List } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
const Item = List.Item
      // import PropTypes from 'prop-types'
// 商品详情的路由
export default class ProductDetail extends Component {
// dangerouslySetInnerHTML
    render() {
        const title=(
            <span>
                <ArrowLeftOutlined style={{color:"blue"}}  /> <span>商品详情</span>
            </span>
        )
        return (
            <Card title={title} className="product-detail">
                <List>
                    <Item>
                        <span className="left">商品名称:</span>
                        <span>联想</span>
                    </Item>
                    <Item>
                        <span className="left">商品名称:</span>
                        <span>联想</span>
                    </Item>
                    <Item>
                        <span className="left">商品名称:</span>
                        <span>联想</span>
                    </Item>
                    <Item>
                        <span className="left">所属分类:</span>
                        <span>电脑--&gt;笔记本</span>
                    </Item>
                    <Item>
                        <span className="left">商品图片:</span>
                        <span><img className='product-img' src="https://img-blog.csdnimg.cn/b1a23ee257854cffa6810ab7c9b7d84c.jpg?x-oss-process=image/resize,m_fixed,h_200" /></span>
                        
                    </Item>
                </List>
            </Card>
        )
    }
}
