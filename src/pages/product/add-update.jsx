import React, { Component } from 'react'
import { Card, Form, Input, Cascader, Upload, Button, Divider, message } from 'antd'
import LinkButton from '../../components/link-button/link-button';
import { SearchOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import prettyFormat from 'pretty-format';
import { reqCategorys } from '../../api';
const { Item } = Form
const { TextArea } = Input;
// 商品添加或更新的路由
export default class ProductAddupdate extends Component {
    state = {
        options: [],
    }
    componentDidMount() {
        this.getcategorys("0")
    }
    componentWillMount() {

        let product
        try {
             product =  this.props.location.state.desc
        } catch (error) {
            product = {}
        }
        // const product =  this.props.location.state.desc || {}
    //    console.log(  this.props.location);
    //保存一个是否是更新的状态
    this.isUpdate = !!product
    this.product = product || {}
    }
    // 获取一级或二级分类列表
    getcategorys = async (parented) => {
        const result = await reqCategorys(parented)
        if (result.status === 0) {
            const categorys = result.data
            if (parented === "0") {
                this.initOptions(categorys)
            } else {
                return categorys //反回了二级列表
            }
        }
    }
    initOptions =async (categorys) => {
        const options = categorys.map((c) => ({//回调函数返回一个对象必须这么写
            value: c._id,
            label: c.name,//属性名必须和事例中的一样,不一样会出现没有字的bug
            isLeaf: false,
        }))//这里生成一个options数组
        // console.log(options);
        //如果是一个二级分的商品更新
        const {isUpdate,product} = this
        // console.log(this);
        const {pCategoryId,categoryId} = product
        if(isUpdate && pCategoryId !== "0"){
            //获取二级分类列表
           const subCategorys =await this.getcategorys(pCategoryId)
              //生成二级下拉列表       
              const chiledoptions = subCategorys.map (c=>({
                value: c._id,
                label: c.name,//属性名必须和事例中的一样,不一样会出现没有字的bug
                isLeaf: true,
              }))
              //找到当前商品一级的options
             // console.log(options);
              const targetOption = options.find(b=>b.value===pCategoryId) || {}
              //关联到对应的optiOS上
              targetOption.children = chiledoptions
        }

        this.setState({ options })
    }
    loadData = async (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        //显示loading
        targetOption.loading = true;

        //   load options lazily
        //获取二级分类列表
        const subCategorys = await this.getcategorys(targetOption.value);
        //  debugger
        targetOption.loading = false;
       // setTimeout(() => { targetOption.loading = false }, 100)
        if (subCategorys && subCategorys.length > 0) {
            const cOptions = subCategorys.map((c) => ({
                //注意小括号,生成二级列表
                value: c._id,
                label: c.name,
                isLeaf: true,
            }));
            targetOption.loading = false;
            targetOption.children = cOptions;
        } else {
            //当前分类没有二级分类
            message.success('没有了')
            //console.log(targetOption.isLeaf);
            targetOption.isLeaf = true;
            // targetOption.loading = false;
        }
        targetOption.loading = false;//忘了修改状态导致一直在加载.确不显示下一个列表
        this.setState({ options: [...this.state.options] });
    }
    onChange = () => { }
    onFinish = (valus) => {
       console.log('tijiao');
    }
    render() {
        const {
            name,
            desc,
            price,
            detail,
            imgs,
            pCategoryId,
            categoryId,
            
          } = this.product;
       
          const categoryIds = [];
          if(this.isUpdate){
              if(pCategoryId === 0){
                categoryIds.push(categoryId)

              }else{
                categoryIds.push(pCategoryId)
                categoryIds.push(categoryId)
                
              }
          }
        const {isUpdate} = this
        const title = (
            <span>
                <LinkButton onClick={() => { this.props.history.goBack() }}>
                    <ArrowLeftOutlined />
                </LinkButton>
                <span>
                {isUpdate?"添加商品":"修改商品"}
                </span>
            </span>
        )
        const onFinishFailed = (errorInfo) => {
            console.log("Failed:", errorInfo);
        };
        return (
            <Card title={title}  >
                <Form labelCol={{ span: 2 }}
                    wrapperCol={{ span: 13 }}
                    onFinish={this.onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Item label="商品名称:" name="name"
                      initialValue={name}
                        rules={[{ required: true, message: "必须输入商品名称!" }]}
                    >
                        <Input placeholder="商品名称"></Input>
                    </Item>
                    <Item label="商品描述:" name="desc" initialValue={desc}>
                        <TextArea placeholder="商品描述" rows={2} />
                    </Item>
                    <Item label="商品价格:" initialValue={price} name="price" rules={[
                        { required: true, message: "必须输入商品价格!" },
                        {
                            validator: (_, value) =>
                                !value || value * 1 > 0 ?
                                    Promise.resolve()
                                    : Promise.reject(new Error("商品价格必须大于0")),

                        },
                    ]}>
                        <Input type="number" placeholder="商品价格" addonAfter="元"></Input>
                    </Item>
                    <Item label="商品分类:"  initialValue={categoryIds} name="categoryIds" >
                        {/* 
                             */}
                        <Cascader
                            placeholder="请选择"
                            options={this.state.options}
                            loadData={this.loadData}
                            onChange={this.onChange}
                            changeOnSelect
                        ></Cascader>
                    </Item>
                    <Item label="商品图片:" name="imgs"  initialValue={name} >
                        <div>
                            商品图片
                        </div>
                    </Item>
                    <Item label="商品详情:" name="detail" >
                        <div>
                            商品详情
                        </div>
                    </Item>
                    <Item>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}
