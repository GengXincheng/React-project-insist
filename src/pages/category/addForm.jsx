import React, { Component } from 'react'
//添加分类的组件
import { Form, Input, Button, Checkbox , Select} from 'antd';
const Item = Form.Item
const Option = Select.Option
export default class AddForm extends Component {
    render() {
        return (
          <Form   >
            <Item initialValue='0' name='classer'>
            <Select>
                  <Option key='0'>
                      一级列表分类
                  </Option>
              </Select>
              
            </Item>
            <Item name='uername'>
                <Input placeholder='请输入分类名称'></Input>
            </Item>
          </Form>
        )
    }
}
