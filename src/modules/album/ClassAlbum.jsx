/**
 * Created by RaoMeng on 2018/11/7
 * Desc: 班级相册
 */

import React, {Component} from 'react'
import AlbumItem from 'components/AlbumItem'
import {getStrValue, isObjEmpty} from "../../utils/common";
import {Icon} from 'antd'
import {Picker, List, Toast} from 'antd-mobile'
import {fetchGet} from "../../utils/fetchRequest";
import {API} from "../../configs/api.config";
import ClassBean from 'model/ClassBean'
import AlbumBean from "../../model/AlbumBean";

const uploadItem = new AlbumItem()
uploadItem.coverImg = 'upload'
uploadItem.albumName = '新建相册'
uploadItem.quantity = -1

export default class ClassAlbum extends Component {

    constructor() {
        super()

        this.state = {
            albumList: [],
            classList: [],
            classText: []
        }
    }

    componentWillMount() {
        if (this.props.match.params.type) {
            this.mType = this.props.match.params.type
        }

        this.initAlbumList()
    }

    componentDidMount() {
        document.title = '班级相册'
        this.node.scrollIntoView();

        Toast.loading('', 0)
        this.getClassList()
    }

    render() {
        const {albumList, classList, classText} = this.state

        let albumItems = []
        if (!isObjEmpty(albumList)) {
            for (let i = 0; i < albumList.length; i++) {
                const albumBean = albumList[i]
                if (!isObjEmpty(albumBean)) {
                    albumItems.push(
                        <AlbumItem
                            albumBean={albumBean}
                            itemClick={this.onItemClick.bind(this)}
                            index={i}/>
                    )
                }
            }
        }
        return (
            <div ref={node => this.node = node}>
                <div className='gray-line'></div>
                <Picker data={classList} title='选择班级' extra='请选择'
                        value={classText} onChange={this.handleClassChange} cols={1}>
                    <List.Item arrow="horizontal">选择班级</List.Item>
                </Picker>
                <div className='gray-line'></div>
                <div style={{padding: '20px'}}>
                    {albumItems}
                </div>
            </div>
        )
    }

    getClassList = () => {
        const {classList, classText} = this.state
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

    getAlbumList = classBean => {
        this.initAlbumList()

        fetchGet(API.GET_ALBUM_LIST, {
            schId: classBean.schId,
            picStatus: 2
        }).then(response => {
            Toast.hide()

            const {albumList} = this.state
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
            }
        }).catch(error => {
            Toast.hide()
            if (typeof error === 'string') {
                Toast.fail(error)
            }
        })
    }

    onItemClick = (index) => {
        const {classList, classText, albumList} = this.state
        if (index == 0 && this.mType == 'teacher') {
            let classId = -1
            let classname = ''
            if (classList[classText]) {
                classId = classList[classText].schId
                classname = classList[classText].label
            }
            this.props.history.push('/newAlbum/' + classId + '/' + classname)
        } else {
            this.props.history.push('/pictureList/' + getStrValue(albumList[index], 'albumId')
                + '/' + this.state.albumList[index].albumName)
        }
    }

    handleClassChange = (v) => {
        this.setState({classText: v})
        this.getAlbumList(this.state.classList[v])
    }

    initAlbumList = () => {
        const {albumList} = this.state
        albumList.length = 0
        if (this.mType == 'parents') {
        } else if (this.mType == 'teacher') {
            this.setState({
                albumList: [uploadItem]
            })
        }
    }

    analysisClassList = response => {
        const {classList, classText} = this.state
        classList.length = 0
        classText.length = 0

        let dataArray = response.data
        if (dataArray) {
            for (let i = 0; i < dataArray.length; i++) {
                let dataObject = dataArray[i]
                if (dataObject) {
                    let classBean = new ClassBean()

                    classBean.label = dataObject.parentName + dataObject.schName
                    classBean.value = i
                    classBean.schId = dataObject.schId
                    classBean.parentId = dataObject.parentId
                    classBean.schName = dataObject.schName
                    classBean.schStatus = dataObject.schStatus
                    classBean.schRemarks = dataObject.schRemarks
                    classBean.grade = dataObject.parentName

                    classList.push(classBean)
                }
            }

            if (classList.length > 0) {
                classText.push(classList[0].value)
                this.setState({
                    classList,
                    classText
                })

                Toast.loading('获取相册中...', 0)
                this.getAlbumList(classList[0])
            }
        }
    }
}