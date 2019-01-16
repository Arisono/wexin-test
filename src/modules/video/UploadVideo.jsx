/**
 * Created by RaoMeng on 2018/11/6
 * Desc: 上传视频
 */

import React, {Component} from 'react'
import 'css/new-album.css'
import {getFileType, getStrValue, isObjEmpty} from "../../utils/common";
import {Icon, Input, Button, Upload} from 'antd'
import {Picker, List, Toast} from 'antd-mobile'
import {API} from "../../configs/api.config";
import {fetchGet, fetchPost} from "../../utils/fetchRequest";
import ClassBean from 'model/ClassBean'
import {connect} from 'react-redux'

const {TextArea} = Input

class UploadVideo extends Component {

    static state = {
        raomeng: ''
    }

    constructor() {
        super()

        this.state = {
            classValue: [],
            videoTitle: '',
            videoDescription: '',
            fileList: [],
            classList: [],
            uploadDone: false,
        }
    }

    componentWillMount() {
        const classId = this.props.match.params.classId
        const classname = this.props.match.params.name

        if (classId) {
            this.classId = classId
        }
        if (classname) {
            this.classname = classname
            this.setState({
                classValue: [this.classId],
                classList: [{
                    label: this.classname,
                    value: this.classId
                }]
            })
        }
    }

    componentDidMount() {
        document.title = '上传视频'

        Toast.loading('', 0)
        this.getClassList()
    }

    componentWillUnmount() {
        Toast.hide()

        clearTimeout(this.backTask)
    }

    render() {
        const {classValue, videoTitle, fileList, classList} = this.state

        const props = {
            action: API.UPLOAD_FILE,
            listType: 'picture',
            defaultFileList: [],
            fileList: fileList,
        }

        return (
            <div className='pageLayout' style={{background: 'white'}}>
                <div className='gray-line'></div>
                <Picker data={classList} title='选择班级' extra='请选择'
                        value={classValue} onChange={this.handleClassChange}
                        onOk={this.handleClassChange} cols={1}>
                    <List.Item arrow="horizontal">选择班级</List.Item>
                </Picker>
                <div className='uploadCaptionText'>视频名称</div>
                <input className='titleInput' placeholder='请输入视频名称'
                       value={videoTitle} onChange={this.titleChange}/>
                <div className='gray-line' style={{height: '1px'}}></div>
                {/*<div className='uploadCaptionText'>视频描述</div>
                <TextArea className='contentInput' placeholder='请输入视频描述'
                          autosize={{minRows: 8, maxRows: 16}} value={videoDescription}
                          onChange={this.descriptionChange}/>*/}
                <div style={{padding: '10px', marginTop: '12px', flex: '1'}}>
                    <Upload {...props} disabled={fileList.length >= 1}
                            beforeUpload={this.handleBefore}
                            onChange={this.handleChange}>
                        <div style={{display: 'flex', padding: '10px', alignItems: 'center'}}>
                            <div className={fileList.length < 1 ? 'uploadBtn' : 'uploadBtn-disable'}>
                                <Icon type="upload" style={{color: fileList.length < 1 ? 'white' : 'gray'}}/>
                                <span style={{fontSize: '12px', marginLeft: '6px'}}>选择文件</span>
                            </div>
                            <span className='promptText'>（不能超过100MB）</span>
                        </div>
                    </Upload>
                </div>

                <div className='uploadLayout'>
                    <Button className='commonButton' type="primary" block
                            onClick={this.releaseEvent} disabled={!this.state.uploadDone}>发布</Button>
                </div>
            </div>
        )
    }

    getClassList = () => {
        const {classList} = this.state
        classList.length = 0

        let userRole = this.props.userInfo.userRole;
        let params
        if (userRole == 1) {
            params = {
                stuId: this.props.userInfo.stuId
            }
        } else {
            params = {
                userId: this.props.userInfo.userId
            }
        }
        fetchGet(API.GET_CLASS_LIST, params).then(response => {
            Toast.hide()

            this.analysisClassList(response)
        }).catch(error => {
            Toast.hide()
            if (typeof error === 'string') {
                Toast.fail(error, 2)
            }
        })
    }

    analysisClassList = response => {
        const {classList, classValue} = this.state
        classList.length = 0
        classValue.length = 0

        let dataArray = response.data
        if (dataArray) {
            let classindex = 0
            for (let i = 0; i < dataArray.length; i++) {
                let dataObject = dataArray[i]
                if (dataObject) {
                    let classBean = new ClassBean()

                    classBean.label = getStrValue(dataObject, 'parentName') + getStrValue(dataObject, 'schName')
                    classBean.value = i
                    classBean.schId = getStrValue(dataObject, 'schId')
                    if (this.classId == classBean.schId) {
                        classindex = i
                    }

                    classBean.parentId = getStrValue(dataObject, 'parentId')
                    classBean.schName = getStrValue(dataObject, 'schName')
                    classBean.schStatus = getStrValue(dataObject, 'schStatus')
                    classBean.schRemarks = getStrValue(dataObject, 'schRemarks')
                    classBean.grade = getStrValue(dataObject, 'parentName')

                    classList.push(classBean)
                }
            }

            if (classList.length > 0) {
                classValue.push(classindex)
                this.setState({
                    classList,
                    classValue
                })
            }
        }
    }

    handleBefore = (file) => {
        let fileType = getFileType(file.name)
        if (fileType.isStrEquals('mp4', 'rmvb', 'avi', 'ts', 'mov', 'qt', 'asf', 'rm', 'navi')) {
            if (file.size && file.size > 100 * 1024 * 1024) {
                this.fileCurrect = false
                Toast.fail('文件大小不能超过100M')
                return false
            }
            this.fileCurrect = true
            return true
        } else {
            this.fileCurrect = false
            Toast.fail('文件格式错误,请上传视频文件')
            return false
        }

    }

    handleChange = ({file, fileList}) => {
        if (this.fileCurrect) {
            console.log(file)
            if (file.status === 'done') {
                if (file.response) {
                    this.videoUrl = file.response.data
                }
                Toast.success('上传成功')

                this.setState({
                    uploadDone: true
                })
            }
            this.setState({fileList})
        }

    }

    titleChange = e => {
        this.setState({
            videoTitle: e.target.value
        })
    }

    descriptionChange = e => {
        this.setState({
            videoDescription: e.target.value
        })
    }

    handleClassChange = (v) => {
        this.setState({classValue: v})
    }

    releaseEvent = () => {
        if (isObjEmpty(this.state.videoTitle)) {
            Toast.fail('请输入视频名称')
            return
        }
        Toast.loading('视频发布中...', 0)
        const {classList, classValue} = this.state

        if (classList[classValue]) {
            this.classId = classList[classValue].schId
        }
        console.log(this.classId)
        fetchPost(API.INSERT_VIDEO, {
            picName: this.state.videoTitle,
            picUrl: this.videoUrl,
            schId: this.classId,
            picRemarks: ''
        }).then(response => {
            Toast.hide()
            Toast.success('视频发布成功',1)
            this.backTask = setTimeout(() => {
                this.props.history.goBack()
            }, 1000)
        }).catch(error => {
            Toast.hide()
            if (typeof error === 'string') {
                Toast.fail(error)
            }
        })
    }
}

let mapStateToProps = (state) => ({
    userInfo: {...state.redUserInfo}
})

let mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(UploadVideo)