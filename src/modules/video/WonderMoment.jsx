/**
 * Created by RaoMeng on 2018/11/13
 * Desc: 精彩瞬间列表
 */

import React, {Component} from 'react'
import {Icon, List, Skeleton} from 'antd'
import {Picker, List as Mlist, Toast} from 'antd-mobile'
import VideoItem from 'components/VideoItem'
import {fetchGet, fetchPost} from "../../utils/fetchRequest";
import {_baseURL, API} from "../../configs/api.config";
import ClassBean from 'model/ClassBean'
import AlbumBean from "../../model/AlbumBean";
import {getStrValue, isObjEmpty} from "../../utils/common";
import PictureBean from "../../model/PictureBean";
import {connect} from 'react-redux'
import {saveClassData} from "../../redux/actions/classData";

const {alertClose} = VideoItem

class WonderMoment extends Component {

    constructor() {
        super()

        this.state = {
            classList: [],
            classValue: [],
            videoList: [],
            isLoading: true
        }
    }

    componentWillMount() {
        if (this.props.match.params.type) {
            this.mType = this.props.match.params.type
        }
    }

    componentWillUnmount() {
        Toast.hide()
        // alertClose()
    }

    componentDidMount() {
        document.title = '精彩瞬间'
        console.log(this.props.classData)
        if (isObjEmpty(this.props.classData.classList)) {
            Toast.loading('', 0)
            this.getClassList()
        } else {
            const {classValue} = this.state
            if (isObjEmpty(this.props.classData.classValue)) {
                classValue.push(this.props.classData.classList[0].value)
            }
            this.setState({
                classList: this.props.classData.classList,
                classValue: this.props.classData.classValue,
            }, () => {
                Toast.loading('获取视频中...', 0)
                this.getVideoList(this.state.classList[this.state.classValue])
            })
        }
    }

    render() {
        const {classList, classValue, videoList, isLoading} = this.state

        let addIcon = ''
        let deleteAble = false
        if (this.mType == 'parents') {
            addIcon = ''
            deleteAble = false
        } else if (this.mType == 'teacher') {
            addIcon = <Icon type="plus-circle" theme='filled' className='common-add-icon'
                            onClick={this.onAddVideo}/>
            deleteAble = true
        }

        return (
            <div style={{width: '100%', height: '100vh', display: 'flex', flexDirection: 'column'}}>
                <div className='gray-line'></div>
                <Picker data={classList} title='选择班级' extra='请选择'
                        value={classValue} onChange={this.handleClassChange} cols={1}>
                    <Mlist.Item arrow="horizontal">选择班级</Mlist.Item>
                </Picker>
                <div className='gray-line'></div>
                <div style={{flex: '1', overflow: 'scroll', webkitOverflowScrolling: 'touch'}}>
                    <Skeleton loading={isLoading} active paragraph={{rows: 3}}>
                        <List dataSource={videoList} renderItem={
                            (item, index) => (
                                <VideoItem
                                    videoInfo={item} index={index}
                                    deleteEvent={this.onDeleteVideo.bind(this)}
                                    deleteAble={deleteAble}/>
                            )
                        }/>
                    </Skeleton>
                </div>
                {addIcon}
            </div>
        )
    }

    getClassList = () => {
        const {classList, classValue} = this.state
        classList.length = 0

        fetchGet(API.GET_CLASS_LIST, {
            userId: this.props.userInfo.userId,
        }).then(response => {
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
            for (let i = 0; i < dataArray.length; i++) {
                let dataObject = dataArray[i]
                if (dataObject) {
                    let classBean = new ClassBean()

                    classBean.label = getStrValue(dataObject, 'parentName') + getStrValue(dataObject, 'schName')
                    classBean.value = i
                    classBean.schId = getStrValue(dataObject, 'schId')
                    classBean.parentId = getStrValue(dataObject, 'parentId')
                    classBean.schName = getStrValue(dataObject, 'schName')
                    classBean.schStatus = getStrValue(dataObject, 'schStatus')
                    classBean.schRemarks = getStrValue(dataObject, 'schRemarks')
                    classBean.grade = getStrValue(dataObject, 'parentName')

                    classList.push(classBean)
                }
            }

            if (classList.length > 0) {
                classValue.push(classList[0].value)
                this.setState({
                    classList,
                    classValue
                })

                Toast.loading('获取视频中...', 0)
                this.getVideoList(classList[0])
            }
        }
    }


    getVideoList = classBean => {
        const {videoList} = this.state
        videoList.length = 0

        fetchGet(API.GET_ALBUM_LIST, {
            schId: classBean.schId,
            picStatus: 2,
            picType: 2
        }).then(response => {
            Toast.hide()

            if (response) {
                const dataArray = response.data
                if (dataArray) {
                    if (dataArray) {
                        dataArray.forEach((video, index) => {
                            const videoeBean = new PictureBean()

                            videoeBean.picId = getStrValue(video, 'picId')
                            videoeBean.picName = getStrValue(video, 'picName')
                            videoeBean.picUrl = getStrValue(video, 'picUrl')
                            videoeBean.picDate = getStrValue(video, 'picDate')
                            videoeBean.picType = getStrValue(video, 'picType')
                            videoeBean.picStatus = getStrValue(video, 'picStatus')
                            videoeBean.parentId = getStrValue(video, 'parentId')
                            videoeBean.picRemarks = getStrValue(video, 'picRemarks')
                            videoeBean.schId = getStrValue(video, 'schId')
                            videoeBean.quantity = getStrValue(video, 'quantity')
                            videoeBean.schName = getStrValue(video, 'schName')
                            videoeBean.url = _baseURL + getStrValue(video, 'picUrl')

                            videoList.push(videoeBean)
                        })
                    }
                }
            }

            this.setState({
                videoList,
                isLoading: false
            })
        }).catch(error => {
            Toast.hide()
            if (typeof error === 'string') {
                Toast.fail(error)
            }

            this.setState({
                videoList,
                isLoading: false
            })
        })
    }


    onDeleteVideo = (index) => {
        Toast.loading('视频删除中...', 0)
        const {videoList} = this.state
        fetchPost(API.DELETE_FILE, {
            fileUrls: [videoList[index].picUrl]
        }).then(response => {
            Toast.hide()
            Toast.success('视频删除成功')
            videoList.splice(index, 1)
            this.setState({videoList})
        }).catch(error => {
            Toast.hide()
            if (typeof error === 'string') {
                Toast.fail(error)
            }
        })
    }

    onAddVideo = () => {
        const {classList, classValue} = this.state
        saveClassData({
            classList: classList,
            classValue: classValue,
        })()
        let classId = -1
        let classname = ''
        if (classList[classValue]) {
            classId = classList[classValue].schId
            classname = classList[classValue].label
        }
        this.props.history.push('/uploadVideo/' + classId + '/' + classname)
    }

    handleClassChange = (v) => {
        this.setState({classValue: v})
        this.getVideoList(this.state.classList[v])
    }
}

let mapStateToProps = (state) => ({
    userInfo: {...state.redUserInfo},
    classData: {...state.redClassData}
})

let mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(WonderMoment)