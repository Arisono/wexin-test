/**
 * Created by RaoMeng on 2018/11/7
 * Desc: 校长信箱
 */

import React, {Component} from 'react'
import {Icon, Input, Button, Switch, message} from 'antd'
import {Toast} from 'antd-mobile'
import 'css/principal-mailbox.css'
import {isObjEmpty} from "../../utils/common";
import UploadEnclosure from 'components/UploadEnclosure'
import {_baseURL, API} from "../../configs/api.config";
import {fetchPost} from "../../utils/fetchRequest";
import {connect} from 'react-redux'

const {TextArea} = Input
class PrincipalMailbox extends Component {

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

    releaseEvent = () => {
        const {fileList, suggest, isAnonymous} = this.state;

        if (isObjEmpty(suggest)) {
            Toast.fail('请填写您的意见或建议')
            return
        }

        Toast.loading('正在发布...', 0)

        const fileUrls = []
        if (fileList) {
            fileList.forEach((value, index) => {
                fileUrls.push(value.picUrl)
            })
        }

        fetchPost(API.PRINCIPAL_MAILBOX, {
            details: suggest,
            notifyFiles: JSON.stringify(fileUrls),
            userId: this.props.userInfo.userId,
            schId: 1,
            isAnonymity: isAnonymous ? 2 : 1
        }).then(response => {
            Toast.hide()
            Toast.success('提交成功，谢谢您的建议！')

            this.setState({
                suggest: '',
                fileList: []
            })
        }).catch(error => {
            Toast.hide()
            if (typeof error === 'string') {
                Toast.fail(error, 2)
            } else {
                Toast.fail('请求异常', 2)
            }
        })
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

let mapStateToProps = (state) => ({
    userInfo: {...state.redUserInfo}
})

let mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(PrincipalMailbox)