import React, { Component } from 'react'
import { Card, List } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button/link-button'
import { BASE_IMG_URL } from '../../utils/constents';
import Base from 'antd/lib/typography/Base';
const Item = List.Item
// import PropTypes from 'prop-types'
// 商品详情的路由
export default class ProductDetail extends Component {
    // dangerouslySetInnerHTML
    render() {
        const { desc, price, detail, name, imgs } = this.props.location.state.desc
        //  console.log(this.props.location.state.desc);
        const title = (
            <span>
                <LinkButton onClick={() => { this.props.history.goBack() }}>
                    <ArrowLeftOutlined style={{ color: "blue" }} />
                </LinkButton> <span>商品详情</span>
            </span>
        )
        return (
            <Card title={title} className="product-detail">
                <List>
                    <Item>
                        <span className="left">商品名称:</span>
                        <span>{name}</span>
                    </Item>
                    <Item>
                        <span className="left">商品描述:</span>
                        <span>{desc}</span>
                    </Item>
                    <Item>
                        <span className="left">商品价格:</span>
                        <span>{price}</span>
                    </Item>
                    <Item>
                        <span className="left">所属分类:</span>
                        <span>电脑--&gt;笔记本</span>
                    </Item>
                    <Item>
                        <span className="left">商品图片:</span>
                        <span>
                            {
                                // console.log(imgs)
                                imgs.map(img=>(
                                    <img key={img} className='product-img' src={BASE_IMG_URL+ img} />
                                ))
                            }

                        </span>

                    </Item>
                    <Item>
                        <span className="left">商品详情:</span>
                        <span dangerouslySetInnerHTML={{ __html: detail }}></span>
                    </Item>
                </List>
            </Card>
        )
    }
}
