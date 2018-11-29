/**
 * Created by Arison on 2018/11/20.
 */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Upload, Icon, message,Modal } from 'antd';

/**
 * 参数：上传URL
 *
 * 公共附件传递组件
 * Created by Arison on 18:01.
 */
class PicturesWallItem extends React.Component{
    constructor(props){
        super(props);
        let action= this.props.action == null ? "//jsonplaceholder.typicode.com/posts/" : this.props.action;

        this.state = {
            fileSize:this.props.number==null?3:this.props.number,
            action:action,
            previewVisible: false,
            previewImage: '',
            fileList: [],
        };
    }

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    //file参数需要传递给父组件！
    handleChange = ({ file,fileList }) =>{
        console.log("test1",file)
        this.props.callback(file);
        this.setState({ fileList })
    }

    handleCancel = () => this.setState({ previewVisible: false })


    componentDidMount(){

    }

    render(){
        const { previewVisible, previewImage, fileList } = this.state;
        //上传按钮
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>);

        return <div className="container-fluid padding_10">
            {/*上传组件*/}
            <Upload
                action={this.state.action}
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}>
                {fileList.length >= this.state.fileSize ? null : uploadButton}
            </Upload>

            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </div>
    }
}

export  default PicturesWallItem;