import React, { Component } from 'react'
import Proptypes from "prop-types"
//添加分类的组件
import { Form, Input, Button, Checkbox, Select } from 'antd';
const Item = Form.Item
const Option = Select.Option
export default class AddForm extends Component {
  formRef = React.createRef(); 
  static propTypes = {
    categorys: Proptypes.array.isRequired,//一级分类的数组
    parentId: Proptypes.string.isRequired,//父分类的id
    // setClasses:PropTypes.func.isRequired,
    setClasses:Proptypes.func.isRequired,
    // setInput: Proptypes.func.isRequired,
    setInput:Proptypes.func.isRequired
  };
  // {console.log(categorys)}
 
  
  render(){
    const {categorys, parentId} = this.props
  
    return (
      <Form  onValuesChange={this.onFinish} >
        <Item initialValue={parentId} name='classer'>
          <Select  ref={input =>this.props.setClasses(input)}>
            <Option key='0'>
              一级列表分类
            </Option>
            {
              categorys.map(c =>  <Option value={c._id} key={c._id}>
              {c.name}
            </Option> )
            }
          </Select>

        </Item>
        <Item name='uername'>
          <Input placeholder='请输入分类名称' ref={input =>this.props.setInput(input)}></Input>
        </Item>
      </Form>
    )
  }
}
