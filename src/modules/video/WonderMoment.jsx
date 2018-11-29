/**
 * Created by RaoMeng on 2018/11/13
 * Desc: 精彩瞬间列表
 */

import React, {Component} from 'react'
import {Icon, List} from 'antd'
import {Picker, List as Mlist, Toast} from 'antd-mobile'
import VideoItem from 'components/VideoItem'
import {fetchGet} from "../../utils/fetchRequest";
import {API} from "../../configs/api.config";
import ClassBean from 'model/ClassBean'
import AlbumBean from "../../model/AlbumBean";
import {getStrValue} from "../../utils/common";

export default class WonderMoment extends Component {

    constructor() {
        super()

        this.state = {
            classList: [],
            classValue: [],
            videoList: []
        }
    }

    componentWillMount() {
        if (this.props.match.params.type) {
            this.mType = this.props.match.params.type
        }
    }

    componentDidMount() {
        document.title = '精彩瞬间'

        Toast.loading('', 0)
        this.getClassList()

        const {classList, videoList} = this.state

        for (let i = 0; i < 10; i++) {
            videoList.push({
                title: '六一儿童节舞蹈'
            })
        }

        this.setState({classList, videoList})
    }

    render() {
        const {classList, classValue, videoList} = this.state

        let addIcon = ''

        if (this.mType == 'parents') {
            addIcon = ''
        } else if (this.mType == 'teacher') {
            addIcon = <Icon type="plus-circle" theme='filled' className='common-add-icon'
                            onClick={this.onAddVideo}/>
        }

        return (
            <div style={{width: '100%', height: '100vh', display: 'flex', flexDirection: 'column'}}>
                <div className='gray-line'></div>
                <Picker data={classList} title='选择班级' extra='请选择'
                        value={classValue} onChange={this.handleClassChange}
                        onOk={this.handleClassChange} cols={1}>
                    <Mlist.Item arrow="horizontal">选择班级</Mlist.Item>
                </Picker>
                <div className='gray-line'></div>
                <div style={{flex: '1', overflow: 'scroll', webkitOverflowScrolling: 'touch'}}>
                    <List dataSource={videoList} renderItem={
                        (item, index) => (
                            <VideoItem
                                videoInfo={item} index={index}
                                deleteEvent={this.onDeleteVideo.bind(this)}/>
                        )
                    }/>
                </div>
                {addIcon}
            </div>
        )
    }

    getClassList = () => {
        const {classList, classValue} = this.state
        classList.length = 0

        fetchGet(API.GET_CLASS_LIST, {
            userId: 10002,
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

        fetchGet(API.GET_ALBUM_LIST, {
            schId: classBean.schId,
            picStatus: 2,
            picType: 2
        }).then(response => {
            Toast.hide()

            /*const {albumList} = this.state
            let dataArray = response.data
            if (dataArray) {
                for (let i = 0; i < dataArray.length; i++) {
                    let dataObject = dataArray[i]
                    if (dataObject) {
                        let albumBean = new AlbumBean()

                        albumBean.albumId = dataObject.picId
                        albumBean.coverImg = dataObject.picUrl
                        albumBean.albumName = dataObject.picName
                        albumBean.quantity = dataObject.quantity
                        albumBean.albumDate = dataObject.picDate
                        albumBean.type = dataObject.picType
                        albumBean.status = dataObject.picStatus
                        albumBean.remarks = dataObject.picStatus
                        albumBean.gradeId = dataObject.parentId
                        albumBean.classId = dataObject.schId
                        albumBean.classname = dataObject.schName

                        albumList.push(albumBean)
                    }
                }
                this.setState({albumList})
            }*/
        }).catch(error => {
            Toast.hide()
            if (typeof error === 'string') {
                Toast.fail(error)
            }
        })
    }


    onDeleteVideo = (index) => {
        console.log('删除第' + index)
    }

    onAddVideo = () => {
        const {classList, classValue} = this.state
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