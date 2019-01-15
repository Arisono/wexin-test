/**
 * Created by RaoMeng on 2019/1/15
 * Desc: 通知公告详情
 */

import React, {Component} from 'react'
import ImagesViewer from "../../components/imagesVIewer";
import {getArrayValue, getIntValue, getStrValue, isObjEmpty} from "../../utils/common";
import NotifyBoBean from "../../model/NotifyBoBean";
import {fetchGet} from "../../utils/fetchRequest";
import {_baseURL, API} from "../../configs/api.config";
import {List, Icon} from 'antd'
import {Toast} from 'antd-mobile'
import {connect} from 'react-redux'
import {saveListState} from 'action/listState'

class NotifyBoardDetail extends Component {

    constructor() {
        super()

        this.state = {
            notifyDetail: '',
            previewVisible: false,
        }
    }

    componentDidMount() {
        document.title = '通知公告详情'

        this.notifyId = this.props.match.params.notifyId

        this.obtainDetail()
    }

    componentWillUnmount() {

    }

    render() {
        const {previewVisible, notifyDetail} = this.state

        let enclosureItem = <div></div>
        let pictureUrls = []
        if (!isObjEmpty(notifyDetail.enclosure) && notifyDetail.enclosure != '[]') {
            enclosureItem =
                <div className='principal-enclosure-layout'>
                    <img src={_baseURL + notifyDetail.enclosure[0]} className='principal-enclosure-img'
                         onClick={this.handlePreview}/>
                    <span className='principal-enclosure-count'>({notifyDetail.enclosure.length}张)</span>
                </div>

            notifyDetail.enclosure.forEach((enclosure, index) => {
                pictureUrls.push(_baseURL + enclosure)
            })
        }

        const readedList = notifyDetail.readed
        const unReadList = notifyDetail.unRead
        const receiveItems = []

        if (!isObjEmpty(readedList) && readedList != '[]') {
            for (let i = 0; i < readedList.length; i++) {
                receiveItems.push(<span
                    className='notify-detail-modal-read'>{getStrValue(readedList[i], 'userName')}</span>)
            }
        }
        if (!isObjEmpty(unReadList) && unReadList != '[]') {
            for (let i = 0; i < unReadList.length; i++) {
                receiveItems.push(<span
                    className='notify-detail-modal-unread'>{getStrValue(unReadList[i], 'userName')}</span>)
            }
        }

        return (
            <div>
                {previewVisible ?
                    <ImagesViewer onClose={this.handleCancel} urls={pictureUrls}
                                  index={0}
                                  needPoint={pictureUrls.length <= 9}/> : ""}
                <div className='notify-detail-modal-layout'>
                    <div className='notify-detail-modal-content-layout'>
                        <div className='notify-detail-modal-content-header'>
                            <div className='notify-detail-modal-header-tilte'>{notifyDetail.noTitle}</div>
                            <span
                                className={notifyDetail.noStatu === '已读' ?
                                    'notify-item-statuAl' : 'notify-item-statuNo'}>{notifyDetail.noStatu}</span>
                        </div>
                        <div className='notify-detail-modal-content-text'>{notifyDetail.noContent}</div>
                        <div style={{padding: '10px'}}>
                            {enclosureItem}
                        </div>
                        <div className='notify-detail-modal-time'>{notifyDetail.noIssue}</div>
                        {/*<div className='notify-detail-modal-time'>{notifyDetail.noTime}</div>*/}
                        <div className='gray-line'></div>
                        <div className='common-flex-row-10 common-font-family'>
                            <span style={{color: '#363636'}}>接收人名单</span>
                            <div style={{flex: '1', textAlign: 'right'}}>
                                {/*<span style={{fontSize: '12px', color: '#CD1D1D'}}>未读：{notifyDetail.unRead}</span>*/}
                                <span style={{
                                    fontSize: '12px',
                                    color: '#161616',
                                    marginLeft: '10px'
                                }}>{getIntValue(notifyDetail.readed, 'length')}/{notifyDetail.allCount}</span>
                            </div>
                        </div>
                        <div>
                            {receiveItems}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    obtainDetail = () => {
        Toast.loading('', 0)
        fetchGet(API.TASK_DETAIL, {
            notifyId: this.notifyId,
            userId: '10000',
        }).then(response => {
            Toast.hide()
            if (response && response.data) {
                let notifyBoBean = new NotifyBoBean()

                let item = response.data
                if (item) {
                    notifyBoBean.noId = getIntValue(item, 'notifyId')
                    notifyBoBean.noTitle = getStrValue(item, 'notifyName')
                    console.log(getArrayValue(item, 'notifyFiles'))
                    notifyBoBean.enclosure = getArrayValue(item, 'notifyFiles').length > 0 ? JSON.parse(getArrayValue(item, 'notifyFiles')) : []
                    if (item.notifyRecords) {
                        notifyBoBean.unRead = getArrayValue(item.notifyRecords, 'unReads')
                        notifyBoBean.readed = getArrayValue(item.notifyRecords, 'reads')

                        notifyBoBean.allCount = getIntValue(notifyBoBean.unRead, 'length') + getIntValue(notifyBoBean.readed, 'length')
                    }
                    notifyBoBean.noContent = getStrValue(item, 'notifyDetails')
                    notifyBoBean.noIssue = getStrValue(item, 'notifyCreatorName')
                    notifyBoBean.noTime = getStrValue(item, 'creatDate')

                    notifyBoBean.noStatu = ''
                }
                this.setState({
                    notifyDetail: notifyBoBean
                })
            }
        }).catch(error => {
            Toast.hide()
            if (typeof error === 'string') {
                Toast.fail(error)
            } else {
                Toast.fail('请求异常')
            }
        })
    }

    handlePreview = () => {
        this.setState({
            previewVisible: true,
        });
    }

    handleCancel = () => this.setState({previewVisible: false})
}

let mapStateToProps = (state) => ({
    userInfo: {...state.redUserInfo},
    listState: {...state.redListState}
})

let mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(NotifyBoardDetail)
