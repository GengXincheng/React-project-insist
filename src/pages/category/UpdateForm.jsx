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
        this.formRef.current.setFieldsValue({
            category: this.props.category,
        });
    }
    render() {
        let {category} = this.props
        return (
            <Form ref={this.formRef}>
                <Item   name="category"   initialValue={category}>
                <Input     placeholder='请输入分类名称' ref={input =>this.props.setForm(input)}></Input>
                </Item>
            </Form>
        )
    }
}