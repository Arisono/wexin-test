/**
 * Created by RaoMeng on 2018/11/6
 * Desc: 新建相册
 */

import React, {Component} from 'react'
import {Icon, Input, Button} from 'antd'
import 'css/new-album.css'
import {getStrValue, isObjEmpty} from "../../utils/common";
import {Picker, List, Toast} from 'antd-mobile'
import {fetchGet, fetchPost} from "../../utils/fetchRequest";
import {API} from "../../configs/api.config";
import ClassBean from 'model/ClassBean'
import {connect} from 'react-redux'

const {TextArea} = Input

class NewAlbum extends Component {

    componentWillMount() {
        document.title = '新建相册'
        const classId = this.props.match.params.classId
        const classname = this.props.match.params.name

        if (classId) {
            this.classId = classId
        }
        if (classname) {
            this.classname = classname
            this.setState({
                classText: [this.classId],
                classList: [{
                    label: this.classname,
                    value: this.classId
                }]
            })
        }
    }

    constructor() {
        super()
        this.state = {
            classText: [],
            albumTitle: '',
            albumdescription: '',
            classList: []
        }
    }

    componentDidMount() {
        Toast.loading('', 0)
        this.getClassList()
    }

    componentWillUnmount() {
        Toast.hide()

        clearTimeout(this.backTask)
    }

    render() {
        const {classText, albumTitle, albumdescription, classList} = this.state

        return (
            <div className='pageLayout'>
                <div className='gray-line'></div>
                <Picker data={classList} title='选择班级' extra='请选择'
                        value={classText} onChange={this.handleClassChange} cols={1}>
                    <List.Item arrow="horizontal">选择班级</List.Item>
                </Picker>
                <div className='gray-line'></div>
                <input className='titleInput' placeholder='请输入相册标题'
                       value={albumTitle} onChange={this.titleChange}/>
                <div className='gray-line' style={{height: '1px'}}></div>
                <TextArea className='contentInput' placeholder='请输入相册描述'
                          autosize={{minRows: 8, maxRows: 16}} value={albumdescription}
                          onChange={this.descriptionChange}/>
                <div style={{flex: '1'}}></div>
                <div className='confirmLayout'>
                    <Button className='commonButton' type="primary" block
                            onClick={this.releaseEvent}>新建</Button>
                </div>
            </div>
        );
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
        const {classList, classText} = this.state
        classList.length = 0
        classText.length = 0

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
                classText.push(classindex)
                this.setState({
                    classList,
                    classText
                })
            }
        }
    }

    handleClassChange = (v) => {
        this.setState({classText: v})
    }

    titleChange = e => {
        this.setState({
            albumTitle: e.target.value
        })
    }

    descriptionChange = e => {
        this.setState({
            albumdescription: e.target.value
        })
    }

    releaseEvent = () => {
        const {albumTitle, albumdescription} = this.state
        if (isObjEmpty(albumTitle, albumdescription)) {
            Toast.fail('请完善相册内容')
            return
        }

        const {classList, classText} = this.state

        if (classList[classText]) {
            this.classId = classList[classText].schId
        }

        Toast.loading('新建相册中...', 0)
        fetchPost(API.NEW_CLASS_ALBUM, {
            picName: albumTitle,
            picUrl: '',
            picType: 1,
            picRemarks: albumdescription,
            schId: this.classId
        }).then(response => {
            Toast.hide()
            Toast.success(`相册【${albumTitle}】新建成功`)
            this.setState({
                albumTitle: '',
                albumdescription: ''
            })

            this.backTask = setTimeout(() => {
                this.props.history.goBack()
            }, 2000)
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

export default connect(mapStateToProps, mapDispatchToProps)(NewAlbum)