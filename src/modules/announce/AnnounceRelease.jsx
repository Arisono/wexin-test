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
import {fetchGet, fetchPost} from "../../utils/fetchRequest";
import {_baseURL, API} from "../../configs/api.config";
import {getIntValue, getStrValue, isObjEmpty} from "../../utils/common";
import {connect} from 'react-redux'

const {TextArea} = Input

class AnnounceRelease extends Component {

    constructor() {
        super()

        this.state = {
            announceTitle: '',
            announceContent: '',

            previewVisible: false,
            previewImage: '',
            fileList: [],
            targetList: [],
            targetCount: 0,
            targetData: [],
        }
    }

    componentDidMount() {
        document.title = '发布通知公告'

        this.getOrganization()
    }

    componentWillUnmount() {
        Toast.hide()

        clearTimeout(this.backTask)
    }

    render() {
        const {announceTitle, announceContent, targetCount, targetList, fileList, targetData} = this.state

        const targetProps = {
            targetData: targetData,
            targetValues: targetList,
            title: '发布对象',
            targetCount: targetCount,
            onTargetChange: this.onTargetChange.bind(this),
            onTargetFocus: this.onTargetFocus.bind(this)
        }

        const defaultTargetProps = {
            targetData: [],
            targetValues: targetList,
            title: '发布对象',
            targetCount: targetCount,
            onTargetChange: this.onTargetChange.bind(this),
            onTargetFocus: this.onTargetFocus.bind(this)
        }
        return (
            <div className='common-column-layout'>
                <div className='gray-line'></div>
                {targetData.length > 0 ? <TargetSelect {...targetProps}/>
                    : <TargetSelect {...defaultTargetProps}/>}
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

    getOrganization = () => {
        Toast.loading('', 0)

        fetchGet(API.USER_GETOBJECT, {
            userId: this.props.userInfo.userId
        }).then(response => {
            Toast.hide()
            const {targetData} = this.state
            targetData.length = 0
            if (response && response.data) {
                const schoolArray = response.data.schools
                const teacherArray = response.data.teachers

                if (!isObjEmpty(teacherArray)) {
                    const teacherData = []
                    teacherArray.forEach((teacherObj, index) => {
                        if (teacherObj) {
                            teacherData.push({
                                title: getStrValue(teacherObj, 'userName'),
                                userId: getIntValue(teacherObj, 'userId'),
                                userPhone: getStrValue(teacherObj, 'userPhone'),
                                value: getStrValue(teacherObj, 'userName') + `-1-${index}`,
                                key: `1-${index}`,
                            })
                        }
                    })

                    targetData.push({
                        title: `全体老师`,
                        value: `1`,
                        key: `1`,
                        children: teacherData,
                    })
                }

                if (!isObjEmpty(schoolArray)) {
                    const classData = []

                    schoolArray.forEach((schoolObj, sIndex) => {
                        if (schoolObj) {
                            const parentArray = schoolObj.parents

                            const parentData = []
                            if (!isObjEmpty(parentArray)) {
                                parentArray.forEach((parentObj, pIndex) => {
                                    parentData.push({
                                        title: getStrValue(parentObj, 'userName'),
                                        userId: getIntValue(parentObj, 'userId'),
                                        userPhone: getStrValue(parentObj, 'userPhone'),
                                        value: getStrValue(parentObj, 'userName') + `-0-${sIndex}-${pIndex}`,
                                        key: `0-${sIndex}-${pIndex}`,
                                    })
                                })

                                classData.push({
                                    title: getStrValue(schoolObj, 'parentName') + getStrValue(schoolObj, 'schName'),
                                    value: getStrValue(schoolObj, 'parentName') + getStrValue(schoolObj, 'schName') + `-0-${sIndex}`,
                                    key: `0-${sIndex}`,
                                    children: parentData,
                                })
                            }
                        }
                    })

                    targetData.push({
                        title: `全体家长`,
                        value: `0`,
                        key: `0`,
                        children: classData,
                    })
                }
            }

            console.log('targetData', targetData)
            this.setState({
                targetData,
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

    releaseAnnounce = () => {
        const {announceTitle, announceContent, fileList} = this.state

        if (isObjEmpty(announceTitle)) {
            Toast.fail('请输入通知标题')
            return
        }
        if (isObjEmpty(announceContent)) {
            Toast.fail('请输入通知内容')
            return
        }
        Toast.loading('正在发布...', 0)

        const fileUrls = []
        if (fileList) {
            fileList.forEach((value, index) => {
                fileUrls.push(value.picUrl)
            })
        }
        const userList = []
        if (!isObjEmpty(this.checkNodes)) {
            this.checkNodes.forEach((node, index) => {
                userList.push(node.userId)
            })
        }
        console.log(userList)

        fetchPost(API.ISSUE_NOTIFICATION, {
            notifyName: announceTitle,
            notifyType: 4,
            notifyDetails: announceContent,
            notifyCreator: this.props.userInfo.userId,
            notifyStatus: 2,
            notifyFiles: JSON.stringify(fileUrls),
            userIds: JSON.stringify(userList)
        }).then(response => {
            Toast.hide()
            Toast.success('发布成功')

            this.setState({
                announceTitle: '',
                announceContent: '',
                fileList: []
            })
            this.backTask = setTimeout(() => {
                this.props.history.goBack()
            }, 2000)
        }).catch(error => {
            Toast.hide()
            if (typeof error === 'string') {
                Toast.fail(error, 2)
            } else {
                Toast.fail('请求异常', 2)
            }
        })
    }

    onTargetFocus = (e) => {
        if (isObjEmpty(this.state.targetData)) {
            this.getOrganization()
        }
    }

    onTargetChange = (value, label, checkNodes, count) => {
        this.checkNodes = checkNodes
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

let mapStateToProps = (state) => ({
    userInfo: {...state.redUserInfo}
})

let mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(AnnounceRelease)