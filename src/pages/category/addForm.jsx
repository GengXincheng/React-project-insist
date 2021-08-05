import React, { Component } from 'react'
import Proptypes from "prop-types"
//添加分类的组件
import { Form, Input, Button, Checkbox, Select } from 'antd';
const Item = Form.Item
const Option = Select.Option
export default class AddForm extends Component {
  static propTypes = {
    categorys: Proptypes.array.isRequired,//一级分类的数组
    parentId: Proptypes.string.isRequired,//父分类的id
  };
  render() {
    return (
      <Form   >
        <Item initialValue='0' name='classer'>
          <Select>
            <Option key='0'>
              一级列表分类
            </Option>
            {
              
            }
          </Select>

        </Item>
        <Item name='uername'>
          <Input placeholder='请输入分类名称'></Input>
        </Item>
      </Form>
    )
  }
}
