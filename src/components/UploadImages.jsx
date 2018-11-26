/**
 * Created by RaoMeng on 2018/11/7
 * Desc: 图片上传组件
 */

import React, {Component} from 'react'
import {Upload, Icon} from 'antd'
import WxImageViewer from 'react-wx-images-viewer'

export default class UploadImages extends Component {

    constructor() {
        super()

        this.state = {
            previewVisible: false,
            previewIndex: 0
        }
    }

    componentDidMount() {

    }

    render() {
        const {action, listType, fileList, count, multiple, title} = this.props

        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        return (
            <div>
                <div className='chooseLayout'>
                    <span className='annexText'>{title}</span>
                    <span className='annexCount'>（{fileList.length}/{count}张</span>
                </div>
                <div className='imagesLayout'>
                    <Upload
                        action={action}
                        listType={listType}
                        fileList={fileList}
                        multiple={multiple}
                        beforeUpload={this.beforeUpload}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}>
                        {fileList.length >= count ? null : uploadButton}
                    </Upload>
                    {this.state.previewVisible ?
                        <WxImageViewer onClose={this.handleCancel} urls={imgs} index={this.state.previewIndex}/> : ""}
                </div>
            </div>
        )
    }

    beforeUpload = (file, fileList) => {
        this.props.beforeUpload(file, fileList)
    }

    handleCancel = () => this.setState({previewVisible: false})

    handlePreview = (file) => {
        this.setState({
            previewVisible: true,
            previewIndex: file.index || 0
        })
    }

    handleChange = ({fileList}) => {
        this.props.handleChange(fileList)
    }
}