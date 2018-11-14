/**
 * Created by RaoMeng on 2018/11/14
 * Desc: 发布通知公告
 */

import React, {Component} from 'react'
import {Icon, Input, Button, Upload, Modal} from 'antd'
import {Picker, InputItem, DatePicker, List} from 'antd-mobile'
import 'css/announce.css'

const {TextArea} = Input

export default class AnnounceRelease extends Component {

    constructor() {
        super()

        this.state = {
            announceTitle: '',
            announceContent: '',

            previewVisible: false,
            previewImage: '',
            fileList: [{
                uid: '-1',
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }],
        }
    }

    componentDidMount() {
        document.title = '发布通知公告'
    }

    componentWillUnmount() {

    }

    render() {
        const {previewVisible, previewImage, fileList} = this.state;
        const {announceTitle, announceContent} = this.state
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className='common-column-layout'>
                <div className='gray-line'></div>
                <div className='announce-release-target-title'>发布对象</div>
                <div className='announce-release-target-layout'>
                    <div className='announce-release-target-list'>王芷含 王芷含 王芷含 王芷含 王芷含</div>
                    <Icon type="plus-circle" style={{color: '#4197FC', fontSize: '22px'}}/>
                </div>
                <div className='gray-line'></div>
                <input className='titleInput' placeholder='请输入通知标题'
                       value={announceTitle} onChange={this.titleChange}/>
                <div className='gray-line' style={{height: '1px'}}></div>
                <TextArea className='contentInput' placeholder='请输入通知内容'
                          autosize={{minRows: 6, maxRows: 12}} value={announceContent}
                          onChange={this.contentChange}/>
                <div className='gray-line'></div>
                <div className='annex-title'>附件</div>
                <div style={{padding: '12px 16px'}}>
                    <Upload
                        action="//jsonplaceholder.typicode.com/posts/"
                        listType="picture-card"
                        fileList={fileList}
                        multiple
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                        showUploadList={{showPreviewIcon: true, showRemoveIcon: true}}>
                        {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{width: '100%'}} src={previewImage}/>
                    </Modal>
                </div>

                <Button className='commonButton' type='primary' style={{margin: '35px'}}>发布</Button>

                <span className='announce-release-history'>历史发布</span>
            </div>
        )
    }


    titleChange = e => {
        this.setState({
            announceTitle: e.target.value
        })
    }

    contentChange = e => {
        this.setState({
            announceContent: e.target.value
        })
    }


    handleCancel = () => this.setState({previewVisible: false})

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({fileList}) => this.setState({fileList})
}
