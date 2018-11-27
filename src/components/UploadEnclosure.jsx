/**
 * Created by RaoMeng on 2018/11/7
 * Desc: 图片上传组件
 */

import React, {Component} from 'react'
import {Upload, Icon} from 'antd'
import {Toast} from 'antd-mobile'
import {isObjEmpty, isObjNull} from "../utils/common";
import ImagesViewer from '../components/imagesVIewer/index'
import PropTypes from 'prop-types';

export default class UploadEnclosure extends Component {

    static propTypes = {
        action: PropTypes.string.isRequired,//上传地址
        listType: PropTypes.string,//附件列表格式，默认picture-card
        count: PropTypes.number,//附件限制数量，默认为1
        multiple: PropTypes.bool,//是非支持多选，默认为false
        title: PropTypes.string,//title，默认为‘附件’
        needPoint: PropTypes.bool,//是非需要下方的指示点，默认为true
        beforeUpload: PropTypes.func,//上传附件前的回调花事件
        handleChange: PropTypes.func,//附件选择后的回调
    }

    static defaultProps = {
        listType: 'picture-card',
        count: 1,
        multiple: false,
        title: '附件',
        needPoint: true,
    }

    constructor() {
        super()

        this.state = {
            previewVisible: false,
            previewIndex: 0,
            fileList: [],
        }
    }

    componentDidMount() {
        this.setState({
            fileList: this.props.fileList
        })
    }

    render() {
        const {fileList} = this.state
        const {action, listType, count, multiple, title, needPoint} = this.props

        const imgs = []
        if (!isObjEmpty(fileList) && fileList !== '[]') {
            for (let i = 0; i < fileList.length; i++) {
                imgs.push(fileList[i].url)
            }
        }

        let pointAble = needPoint
        if (imgs.length > 9) {
            pointAble = false
        }

        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        return (
            <div style={{width: '100%'}}>
                <div className='chooseLayout'>
                    <span className='annexText'>{title}</span>
                    <span className='annexCount'>（{fileList.length}/{count}）张</span>
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
                        <ImagesViewer onClose={this.handleCancel} urls={imgs}
                                      index={this.state.previewIndex}
                                      needPoint={pointAble}/> : ""}
                </div>
            </div>
        )
    }

    beforeUpload = (file, fileList) => {
        const {count} = this.props
        if (this.state.fileList.length + fileList.length > count) {
            Toast.fail(`上传失败，附件数量不能超过${count}张`)
            return false
        } else {
            return this.props.beforeUpload(file, fileList)
        }
    }

    handleCancel = () => this.setState({previewVisible: false})

    handlePreview = (file) => {
        this.setState({
            previewVisible: true,
            previewIndex: file.index || 0
        })
    }

    handleChange = ({fileList}) => {
        if (fileList.length <= this.props.count) {
            this.setState({fileList})
            this.props.handleChange(fileList)
        }
    }
}