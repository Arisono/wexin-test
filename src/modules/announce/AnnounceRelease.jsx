/**
 * Created by RaoMeng on 2018/11/14
 * Desc: 发布通知公告
 */

import React, {Component} from 'react'
import {Icon, Input, Button, Upload, Modal, TreeSelect} from 'antd'
import 'css/announce.css'

const {TextArea} = Input

const SHOW_PARENT = TreeSelect.SHOW_PARENT
const teacherData = []
const parentData = []

for (let i = 1; i < 6; i++) {
    parentData.push({
        title: `三年级${i}班`,
        value: `0-${i}`,
        key: `0-${i}`,
        children: [{
            title: `饶猛`,
            value: `0-${i}-0`,
            key: `0-${i}-0`
        }, {
            title: `李泞`,
            value: `0-${i}-1`,
            key: `0-${i}-1`,
        }, {
            title: `章晨望`,
            value: `0-${i}-2`,
            key: `0-${i}-2`,
        }],
    })
}

for (let i = 1; i < 10; i++) {
    teacherData.push({
        title: `老师${i}`,
        value: `1-${i}`,
        key: `1-${i}`,
    })
}

const targetData = [
    {
        title: `全体家长`,
        value: `0`,
        key: `0`,
        children: parentData,
    },
    {
        title: `全体老师`,
        value: `1`,
        key: `1`,
        children: teacherData,
    }
]

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
            targetList: ['1-1'],
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
        const uploadProps = {
            action: "//jsonplaceholder.typicode.com/posts/",
            listType: "picture-card",
            fileList: fileList,
            multiple: false,
            onPreview: this.handlePreview,
            onChange: this.handleChange,
            showUploadList: {showPreviewIcon: true, showRemoveIcon: true}
        }
        const targetProps = {
            treeData: targetData,
            value: this.state.targetList,
            onChange: this.onTargetChange,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            searchPlaceholder: '请选择发布对象',
            style: {
                width: '100%',
            },
            allowClear: true,
        }
        return (
            <div className='common-column-layout'>
                <div className='gray-line'></div>
                <div className='announce-release-target-title'>发布对象</div>
                <div className='announce-release-target-layout'>
                    {/*<Icon type="plus-circle" style={{color: '#4197FC', fontSize: '22px'}}/>*/}
                    <TreeSelect {...targetProps} suffixIcon={{type: "plus-circle"}}/>
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
                    <Upload {...uploadProps}>
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

    onTargetChange = (value, label, extra) => {
        console.log('onChange ', value + '/' + label);
        this.setState({targetList: value});
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
