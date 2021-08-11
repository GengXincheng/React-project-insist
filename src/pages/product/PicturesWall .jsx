import React, { Component } from 'react'
import { Upload, Modal, message } from 'antd';
import { reqDelteImg } from '../../api';
import { PlusOutlined } from '@ant-design/icons';
// import { PROPERTY_TYPES } from '@babel/types';
import PropTypes from "prop-types";
import { BASE_IMG_URL } from '../../utils/constents';
// 图片上传
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
export default class PicturesWall extends Component {
    static propTypes={
        imgs:PropTypes.array
    }
    state = {
        previewVisible: false,
        previewImage: '', //大图地址
        previewTitle: '',
        fileList: [
            // {
            //     uid: '-1', //每个file都有一个唯一的id
            //     name: 'image.png',
            //     status: 'done',
            //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            // },

        ],
    };
    constructor(props){
        super(props)
        let fileList = []
        //传入了一个imges数组
        const {imgs} = this.props
        if(imgs && imgs.length>0){
            fileList = imgs.map((img,index)=>({
                uid:-index,
                name:img,
                status:"done",
                url:BASE_IMG_URL+img
            }))
        }
        this.state={
            previewVisible: false,
        previewImage: '', //大图地址
        previewTitle: '',
        fileList
        }
    }
    // /获取所有已上传图片文件名的数组
    getImgs = () => {
        console.log(this.state.fileList.map(file=>file.name));
        return this.state.fileList.map(file=>file.name)
    }
    componentDidUpdate(){
        this.getImgs()
    }
    //隐藏model
    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        //显示指定file对应的大图
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };
    // file;当前操作的文件
    handleChange =async ({ file, fileList }) => {
        //  console.log(file,fileList);
        // console.log(file.url);
        //一旦上传成功,经当前上传的file信息修正(name,url)
        if (file.status === "done") {
            const result = file.response
            if (result.status === 0) {
                message.success('成功')
                const { name, url } = result.data
                console.log(name +'62');
                file = fileList[fileList.length - 1]
                file.name = name
                file.url = url
                console.log(name);
            }
        }else if(file.status === "removed"){//删除图片
          const result = await  reqDelteImg(file.name)
          console.log(file.name);
          if(result.status ==="0"){
              //fileList是删除后的列表
              message.success('删除成功') //服务器报错了,可能是服务器的错
          }else{
              message.error('删除失败')
          }
        }
        this.setState({ fileList });
    }

    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <>
                <Upload
                    action="/manage/img/upload"
                    accept="image/*"//接受图片格式
                    name="image"//请求参数名
                    listType="picture-card"
                    fileList={fileList}//已上传文件的列表
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </>
        );
    }
}

