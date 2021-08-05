import React, { Component } from "react";
import { useState } from "react";
import { Card, Table, Button, Icon, message, Modal } from "antd";
import { PlusOutlined, ArrowRightOutlined } from "@ant-design/icons";
import LinkButton from "../../components/link-button/link-button";
import { reqCategorys, reqAddCategorys, reqUpdateCategorys } from "../../api";
import AddForm from "./addForm";
import UpdateForm from "./UpdateForm";
// const [isModalVisible, setIsModalVisible] = useState(false);

// import PropTypes from 'prop-types'
// 商品分页路由
export default class Category extends Component {
    // static propTypes = {
    //     prop: PropTypes
    // }
    state = {
        categorys: [], //一级分类列表
        loading: false, //是否正在获取数据中?
        parentId: "0", //当前需要显示的分类列表的parentId
        parentName: "", //当前需要显示的分类列表复分类名称
        subCategorys: [], //二级分类列表
        showstatus: 0, //标识添加/更新的确认框是否显示 0 都不显示  1 显示添加   2 显示更新
    };

    //初始化table所有列的数组
    initColums = () => {
        // const [visible, setVisible] = React.useState(false);
        this.columns = [
            {
                title: "姓名",
                dataIndex: "name",
                key: "name",
            },
            {
                title: "操作",
                width: 300,

                render: (category) => (

                    <span>
                        <LinkButton onClick={() => this.showUpdate(category)}>修改分类</LinkButton>
                        {/* 向事件回调函数传递参数:先定义一个匿名函数,在函数调用处理的函数并传入数据 */}
                        {this.state.parentId === "0" ? (
                            <LinkButton
                                onClick={() => {
                                    this.showCategorys(category);
                                }}
                            >
                                查看子分类
                            </LinkButton>
                        ) : null}
                    </span>
                ),
            },
        ];
    };
    //获取一级或二级列表分类展示
    getCatagory = async (parented) => {
        //再发是送请求前显示loading
        this.setState({ loading: true });
       parentId  = parented || this.state.parentId;
        //发送ajax请求,获取数据
        const result = await reqCategorys(parentId);
        //请求完成后隐藏loading
        this.setState({ loading: false });
        if (result.status === 0) {
            const categorys = result.data;
            if (parentId === "0") {
                //更新状态
                this.setState({ categorys });
            } else {
                //更新二级分类状态
                this.setState({ subCategorys: categorys });
            }
        } else {
            message.error("00获取分类列表失败");
        }
    };
    //显示指定一级分类列表的二级列表
    showCategorys = (category) => {
        //先更新转态    !异步
        this.setState(
            {
                parentId: category._id,
                parentName: category.name,
            },
            () => {
                //在状态更改后且render后执行执行
                //二级分类
                this.getCatagory();
            }
        );
    };
    //回到显示指定一级分类列表
    showFirstCategorys = () => {
        this.setState({
            parentId: "0",
            parentName: "",
            subCategorys: [],
        });
    };
    //显示添加
    showAdd = () => {
        this.setState({
            showstatus: 1
        })
    }
    //添加分类 确认俺妞
    addCategory =async () => {
        //隐藏确认框  
        this.setState({
            showstatus: 0
        })
        //收集数据并提交请求
        
        const parentId = this.classes.props.value;
        //输入框内容
        const categoryName = this.input.props.value;
        if(!categoryName){
            message.error('名称不能为空!')
            return
          }
          const result = await reqAddCategorys(parentId,categoryName)
          if(result.status === 0){
            //重新显示列表
          if(parentId === this.state.parentId){
            this.getCatagory()
            message.success('添加成功')
          }else if(parentId === '0'){
             
                this.getCatagory(0)
            
          }
          }
        //重新获取数据并展示
    };
    //显示修改
    showUpdate = (category) => {
        //保存数据
        this.category = category
        //修改数据
        this.setState({
            showstatus: 2
        })
    }
    //跟新分类
    upDateCategory = async () => {
        //g关闭确定狂
        this.setState({
            showstatus: 0
        })
        //发送请求更新分类   reqUpdateCategorys
        const categoryId = this.category._id
        const categoryName = this.form.state.value;


        //数据库有问题
        const result = await reqUpdateCategorys({ categoryId, categoryName })
        if (result.status === 1) {
            //重新显示新的列表
            this.getCatagory()

        } else {
            message.error('更新数据失败')
        }

    };
    //取消添加/更新分类   点击取消显示对话框
    handleCancel = () => {
        //清除输入数据    没弄

        this.setState({
            showstatus: 0,
        });
    };
    //为第一次render准备数据
    componentWillMount() {
        this.initColums();
    }
    //执行异步任务
    //发送异步ajax请求
    componentDidMount() {
        this.getCatagory();
        // this.initColums()
    }
    render() {
        //读取状态数据

        const {
            categorys,
            subCategorys,
            parentId,
            loading,
            parentName,
            showstatus,
        } = this.state;
        let category = this.category || {}
        //card的左侧

        const title =
            parentId === "0" ? (
                "一级分类列表"
            ) : (
                <span>
                    <LinkButton onClick={this.showFirstCategorys}>
                        一级分类列表
                    </LinkButton>

                    <ArrowRightOutlined />
                    <span>{parentName}</span>
                </span>
            );
        //card的右侧
        const extra = (
            <Button type="primary" icon={<PlusOutlined />} onClick={this.showAdd}>
                添加
            </Button>
        );

        //   const { loading } = this.state
        // debugger
        return (
            <Card title={title} extra={extra}>

                <Table
                    columns={this.columns}
                    bordered
                    rowKey="_id"
                    dataSource={parentId === "0" ? categorys : subCategorys}
                    pagination={{ defaultPageSize: 5, showQuickJumper: true }}
                    loading={loading}
                />

                <Modal
                    title="添加分类"
                    visible={showstatus === 1}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}
                >
                    <AddForm categorys={categorys} parentId={parentId}
                        setClasses={(classes) => {
                            this.classes = classes;
                        }}
                        setInput={(input) => {
                            this.input = input;
                        }} />
                </Modal>
                <Modal
                    title="更新分类"
                    visible={showstatus === 2}
                    onOk={this.upDateCategory}
                    onCancel={this.handleCancel}
                >
                    <UpdateForm category={category.name ? category.name : ""} setForm={(form) => { this.form = form }}></UpdateForm>
                    {/* {console.log(category.name)} */}
                </Modal>
            </Card>
        );
    }
}
