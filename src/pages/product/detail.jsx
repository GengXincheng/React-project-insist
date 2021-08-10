import React, { Component } from 'react'
import { Card, List } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button/link-button'
import { BASE_IMG_URL } from '../../utils/constents';
import Base from 'antd/lib/typography/Base';
import { reqCategory } from '../../api';
import { promises } from 'fs';
const Item = List.Item
// import PropTypes from 'prop-types'
// 商品详情的路由
export default class ProductDetail extends Component {
    state={
        cName1:"",//一级分类名称
        cName2:"",//二级分类名称

    }
  async  componentDidMount(){
        //得到 当前商品的分类Id
       const {categoryId,pCategoryId} = this.props.location.state.desc
       if(pCategoryId==="0"){  //一级分类下的名称
        const result = await reqCategory(categoryId)
        const cName1 = result.data.name
        this.setState({cName1})
       }else{ //二级分类下的商品
      const results = await Promise.all([reqCategory(pCategoryId),reqCategory(categoryId)])
        // const result1 = await reqCategory(pCategoryId)
        // const result2 = await reqCategory(categoryId)
        const cName1 = results[0].data.name
        const cName2 = results[1].data.name
        this.setState({
            cName1,cName2
        })
       }
    }
    // dangerouslySetInnerHTML
    render() {
        const { desc, price, detail, name, imgs } = this.props.location.state.desc
        const {cName1,cName2} = this.state
        //   console.log(this.props.location.state.desc);
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
                        <span>{cName1} {cName2 ? `-->`+ cName2 : ''} </span>
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
