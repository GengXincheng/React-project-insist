import React, { Component } from 'react'
import { Card, Select, Input, Button, Table } from 'antd'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
// import { RequestOptions } from 'node:https';
// import { RequestOptions } from 'node:https';
import { reqProducts } from "../../api/index"
import { PAGE_SIZE } from '../../utils/constents';
const { Option } = Select;
// prodect的默认路径
export default class Home extends Component {
    state = {
        total: 8,//商品总条数
        products: [],//商品的数组
        loading:false,//加载状态
    }
    // 初始table列的数据
    initColumns = () => {
        this.columns = [
            {
              width: 200,
              title: "商品名称",
              dataIndex: "name",
              key: "name",
            },
            {
              title: "商品描述",
              dataIndex: "desc",
              key: "desc",
            },
            {
              width: 100,
              title: "价格",
              dataIndex: "price",
              key: "price",
              render: (price) => "￥" + price,
            },
            {
              width: 150,
              title: "状态",
              dataIndex: "status",
              key: "status",
              render: (status,_id) => {
              const newStatus = status ===1?2:1
                return  (
                  <span>
                    <Button type="primary" onClick={()=>this.updateStatus(_id,newStatus)}>{status===1?'下架':'上架'}</Button>
                    <span>{status===1?'在售':'已下架'}</span>
                  </span>
                )  
              },
            },
            {
              width: 100,
              title: "操作",
              dataIndex: "name,desc,price,detail,imgs",
              key: "action",
              render: (name,desc,price,detail,imgs,categoryId,pCategoryId) => {
                return (
                  <span>
                    <Button onClick={()=>this.props.history.push('/product/detail',{desc})}>详情</Button>
                    <Button onClick={()=>this.props.history.push('/product/addupdate',{desc})}>修改</Button>
                  </span>
                );
              },
            },
          ];
    };
    //获取product数据
    getProducts = async (pagNum) => {
        this.setState({loading:true})
        const result = await reqProducts(pagNum, PAGE_SIZE)
        if (result.status === 0) {
            const { total, list } = result.data
            this.setState({ total, products: list ,loading:false})
        }

    };
    componentWillMount() {
        this.initColumns()
    }
    componentDidMount() {
        this.getProducts(1)
    }
    render() {
        const { products, total,loading} = this.state
        const title = (<span>
            <Select value="jack" style={{ width: 120 }} >
                <Option value="jack" >搜索</Option>
            </Select>
            <Input placeholder="搜索关键字" style={{ width: 150, margin: "0 15px" }}></Input>
            <Button type="primary" icon={<SearchOutlined />}>
                搜索
            </Button>
        </span>)
        const extra = (
            <Button type="primary" icon={<PlusOutlined />}>添加商品</Button>
        )
        //需要修改数据
        return (
            // 
            <Card title={title} extra={extra}>
                <Table 
                loading={loading}
                pagination={{
                    total: this.state.total,
                    defaultPageSize: PAGE_SIZE,
                    showQuickJumper: true,
                    onChange:  this.getProducts

                }}
                    rowKey="_id"
                    bordered
                    dataSource={products}
                    columns={this.columns}
                > </Table>
            </Card>
        )
    }
}
