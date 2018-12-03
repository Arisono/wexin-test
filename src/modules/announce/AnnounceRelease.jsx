/**
 * Created by RaoMeng on 2018/11/14
 * Desc: 发布通知公告
 */

import React, {Component} from 'react'
import {Input, Button} from 'antd'
import 'css/announce.css'
import {Toast} from 'antd-mobile'
import TargetSelect from 'components/TargetSelect'
import UploadEnclosure from 'components/UploadEnclosure'
import {fetchPost} from "../../utils/fetchRequest";
import {_baseURL, API} from "../../configs/api.config";

const {TextArea} = Input
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
            fileList: [],
            targetList: ['1-1'],
            targetCount: 1
        }
    }

    componentDidMount() {
        document.title = '发布通知公告'

    }

    componentWillUnmount() {
        Toast.hide()
    }

    render() {
        const {announceTitle, announceContent, targetCount, targetList, fileList} = this.state

        const targetProps = {
            targetData: targetData,
            targetValues: targetList,
            title: '发布对象',
            targetCount: targetCount,
            onTargetChange: this.onTargetChange.bind(this)
        }
        return (
            <div className='common-column-layout'>
                <div className='gray-line'></div>
                <TargetSelect {...targetProps}/>
                <div className='gray-line'></div>
                <input className='titleInput' placeholder='请输入通知标题'
                       value={announceTitle} onChange={this.titleChange}/>
                <div className='gray-line' style={{height: '1px'}}></div>
                <TextArea className='contentInput' placeholder='请输入通知内容'
                          autosize={{minRows: 6, maxRows: 12}} value={announceContent}
                          onChange={this.contentChange}/>
                <div className='gray-line'></div>
                <UploadEnclosure
                    action={API.UPLOAD_FILE}
                    fileList={fileList}
                    count={4}
                    multiple={true}
                    beforeUpload={this.beforeUpload.bind(this)}
                    handleChange={this.handleChange.bind(this)}
                />

                <Button className='commonButton' type='primary' style={{margin: '35px'}}
                        onClick={this.releaseAnnounce}>发布</Button>

                {/*<span className='announce-release-history'>历史发布</span>*/}
            </div>
        )
    }

    releaseAnnounce = () => {
        Toast.loading('正在发布...', 0)
        const {announceTitle, announceContent, fileList} = this.state

        const fileUrls = []
        if (fileList) {
            fileList.forEach((value, index) => {
                fileUrls.push(value.picUrl)
            })
        }
        console.log(fileUrls)

        fetchPost(API.ISSUE_NOTIFICATION, {
            notifyName: announceTitle,
            notifyType: 4,
            notifyDetails: announceContent,
            notifyCreator: 10001,
            notifyStatus: 2,
            notifyFiles: JSON.stringify(fileUrls),
            userIds: JSON.stringify(['10000', '10001', '10002', '10003'])
        }).then(response => {
            Toast.hide()

        }).catch(error => {
            Toast.hide()
            if (typeof error === 'string') {
                Toast.fail(error, 2)
            }
        })
    }

    onTargetChange = (value, label, checkNodes, count) => {
        this.setState({
            targetList: value,
            targetCount: count
        });
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

    beforeUpload = (file, fileList) => {

    }

    handleChange = fileList => {
        if (fileList) {
            fileList.forEach((value, index) => {
                value.url = value.response ? (_baseURL + value.response.data) : value.url
                value.picUrl = value.response ? value.response.data : value.picUrl
            })

            this.setState({fileList})
        }
    }
}
