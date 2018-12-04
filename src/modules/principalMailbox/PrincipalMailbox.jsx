/**
 * Created by RaoMeng on 2018/11/7
 * Desc: 校长信箱
 */

import React, {Component} from 'react'
import {Icon, Input, Button, Switch, message} from 'antd'
import 'css/principal-mailbox.css'
import {isObjEmpty} from "../../utils/common";
import UploadEnclosure from 'components/UploadEnclosure'
import {_baseURL, API} from "../../configs/api.config";

const {TextArea} = Input

export default class PrincipalMailbox extends Component {

    constructor() {
        super()

        this.state = {
            suggest: '',
            fileList: [],
            isAnonymous: false,
            previewIndex: 0
        }
    }

    componentDidMount() {
        document.title = '校长信箱'
    }

    render() {
        const {fileList, suggest, isAnonymous} = this.state;
        const imgs = []
        if (!isObjEmpty(fileList) && fileList !== '[]') {
            for (let i = 0; i < fileList.length; i++) {
                imgs.push(fileList[i].url)
            }
        }

        return (
            <div className='principal-pageLayout'>
                <div className='headerLayout'>欢迎各位家长向本校提出意见和建议</div>
                <TextArea className='suggestInput' placeholder='请填写意见或建议…'
                          autosize={{minRows: 6, maxRows: 12}} value={suggest}
                          onChange={this.suggestChange}/>
                <span className='wordCount'>{suggest.length + '/500'}</span>
                <div className='gray-line'></div>
                <UploadEnclosure
                    action={API.UPLOAD_FILE}
                    fileList={fileList}
                    count={4}
                    multiple={true}
                    beforeUpload={this.beforeUpload.bind(this)}
                    handleChange={this.handleChange.bind(this)}
                />
                <div className='anonymousLayout'>
                    <Switch size="small" checked={isAnonymous} onChange={this.switchChange}/>
                    <span style={{marginLeft: '5px'}}>匿名</span>
                </div>
                <div className='principal-uploadLayout'>
                    <Button className='commonButton' type="primary" block
                            onClick={this.releaseEvent}>提交</Button>
                </div>

                <span className='common-record-text' onClick={this.principalRecord}>历史投递</span>
            </div>
        )
    }

    suggestChange = e => {
        if (e.target.value.length <= 500) {
            this.setState({
                suggest: e.target.value
            })
        } else {
            message.error('字数已超限')
        }
    }

    switchChange = (checked) => {
        console.log(checked)
        this.setState({
            isAnonymous: checked
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

    principalRecord = () => {
        this.props.history.push('/principalHistory')
    }
}