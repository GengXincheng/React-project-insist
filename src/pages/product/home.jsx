import React, { Component } from 'react'
import { Card, Select, Input, Button, Table } from 'antd'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
const { Option } = Select;
// prodect的默认路径
export default class Home extends Component {
    state = {
        products: [],//商品的数组
    }
    // 初始table列的数据
    initColumns = () => {
        this.columns=[]
    }
    componentWillMount() {
        this.initColumns()
    }
    render() {
        const { products } = this.state
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
                <Table rowKey="_id" bordered dataSource={products} columns={this.columns}> </Table>
            </Card>
        )
    }
}
