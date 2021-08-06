import React, { Component } from 'react'
import {Form,Input} from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item
export default class UpdateForm extends Component {
    formRef = React.createRef();  
    static propTypes = {
        category:PropTypes.string.isRequired,
        setForm: PropTypes.func.isRequired 
    }
    componentDidUpdate() {
        // 我们通过 "current" 来访问 DOM 节点
        this.formRef.current.setFieldsValue({
            category: this.props.category,
        });
    }
    render() {
        let {category} = this.props
        return (
            // 解决 initialValue 不更新问题 
            <Form ref={this.formRef}   name="basic" 
           >
                <Item  label={category}  name="username"   initialValue={category} rules={[{ required: true, message: "名称必须输入!" }]}>
                <Input     placeholder='请输入分类名称' ref={input =>this.props.setForm(input)}></Input>
                </Item>
            </Form>
        )
    }
}