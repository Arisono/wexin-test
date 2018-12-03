/**
 * Created by RaoMeng on 2018/11/23
 * Desc: 通知公告教职工端
 */

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Swiper from 'swiper/dist/js/swiper'
import 'swiper/dist/css/swiper.min.css'
import 'css/consume-re.css'
import NotifyBoBean from '../../model/NotifyBoBean'
import {List, Icon, Skeleton} from 'antd'
import {Modal, PullToRefresh, Toast} from 'antd-mobile'
import RefreshLayout from '../../components/RefreshLayout'
import NotifyBoardItem from "../../components/NotifyBoardItem";
import {getArrayValue, getIntValue, getStrValue, isObjEmpty} from "../../utils/common";
import {fetchGet, fetchPost} from "../../utils/fetchRequest";
import {_baseURL, API} from "../../configs/api.config";


const mPageSize = 10
let mReleaseIndex = 0
let mReceiveIndex = 0

export default class NotifyBoardTeacher extends Component {

    constructor() {
        super()

        this.state = {
            selectIndex: 0,
            releaseList: [],
            receiveList: [],
            isReleaseLoading: true,
            isReceiveLoading: true,
            detailVisible: false,
            isReleaseRefreshing: false,
            isReceiveRefreshing: false,
            height: document.documentElement.clientHeight
        }
    }

    componentDidMount() {
        mReleaseIndex = 0
        mReceiveIndex = 0
        const hei = this.state.height - ReactDOM.findDOMNode(this.contain).offsetTop;
        this.setState({
            height: hei
        })
        document.title = '通知公告'

        const that = this

        this.mySwiper = new Swiper('.swiper-container', {
            autoplay: false,
            loop: false,
            on: {
                slideChangeTransitionEnd: function () {
                    that.setState({
                        selectIndex: this.activeIndex
                    })
                }
            }
        })

        this.loadReceiveList()
        this.loadReleaseList()
    }

    componentWillUnmount() {

    }

    render() {
        const {selectIndex} = this.state
        const releaseItems = this.getReleaseItems()
        const receiveItems = this.getReceiveItems()
        const detailModal = this.getDetailModal()

        return (
            <div className='notify-select-root'>
                <div className='gray-line'></div>
                <div className='identity-select'>
                    <div className={selectIndex == 0 ?
                        'identity-item-select' : 'identity-item-normal'}
                         onClick={this.onReleaseClick}>我发布的
                    </div>
                    <div className={selectIndex == 1 ?
                        'identity-item-select' : 'identity-item-normal'}
                         onClick={this.onReceiveClick}>我接收的
                    </div>
                </div>
                <div className="swiper-container"
                     ref={el => {
                         this.contain = el
                     }}>
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            {releaseItems}
                        </div>
                        <div className="swiper-slide">
                            {receiveItems}
                        </div>
                    </div>
                </div>

                <Icon type="plus-circle" theme='filled' className='common-add-icon'
                      onClick={this.onAddNotify}/>
                {detailModal}

                <Icon type="plus-circle" theme='filled' className='common-add-icon'
                      onClick={this.onAddNotify}/>
            </div>
        )
    }

    getDetailModal = () => {
        const {releaseList, receiveList} = this.state

        let notifyBoBean = new NotifyBoBean()
        if (this.selectType === 'release') {
            notifyBoBean = releaseList[this.selectIndex]
        } else if (this.selectType === 'receive') {
            notifyBoBean = receiveList[this.selectIndex]
        }

        let enclosureItem = <div></div>
        if (!isObjEmpty(notifyBoBean.enclosure) && notifyBoBean.enclosure != '[]') {
            enclosureItem =
                <div className='principal-enclosure-layout'>
                    <img src={_baseURL + notifyBoBean.enclosure[0]} className='principal-enclosure-img'/>
                    <span className='principal-enclosure-count'>({notifyBoBean.enclosure.length}张)</span>
                </div>
        }

        const receives = notifyBoBean.readed
        const receiveItems = []
        if (!isObjEmpty(receives) && receives != '[]') {
            for (let i = 0; i < receives.length; i++) {
                receiveItems.push(<span
                    className='notify-detail-modal-receive'>{getStrValue(receives[i], 'userName')}</span>)
            }
        }

        return (
            <Modal
                popup
                visible={this.state.detailVisible}
                onClose={this.onModalClose}
                animationType="slide-up">
                <div className='notify-detail-modal-layout'>
                    <div style={{width: '100%', padding: '12px 14px', background: 'transparent', textAlign: 'right'}}>
                        <Icon type="close-circle" style={{color: 'white', fontSize: '20px'}}
                              onClick={this.onModalClose}/>
                    </div>
                    <div className='notify-detail-modal-content-layout'>
                        <div className='notify-detail-modal-content-header'>
                            <div className='notify-detail-modal-header-tilte'>{notifyBoBean.noTitle}</div>
                            <span
                                className={notifyBoBean.noStatu === '已读' ?
                                    'notify-item-statuAl' : 'notify-item-statuNo'}>{notifyBoBean.noStatu}</span>
                        </div>
                        <div className='notify-detail-modal-content-text'>{notifyBoBean.noContent}</div>
                        <div style={{padding: '10px'}}>
                            {enclosureItem}
                        </div>
                        <div className='notify-detail-modal-time'>{notifyBoBean.noIssue}</div>
                        {/*<div className='notify-detail-modal-time'>{notifyBoBean.noTime}</div>*/}
                        <div className='gray-line'></div>
                        <div className='common-flex-row-10 common-font-family'>
                            <span style={{color: '#363636'}}>接收人名单</span>
                            <div style={{flex: '1', textAlign: 'right'}}>
                                {/*<span style={{fontSize: '12px', color: '#CD1D1D'}}>未读：{notifyBoBean.unRead}</span>*/}
                                <span style={{
                                    fontSize: '12px',
                                    color: '#161616',
                                    marginLeft: '10px'
                                }}>{getIntValue(notifyBoBean.readed, 'length')}/{notifyBoBean.allCount}</span>
                            </div>
                        </div>
                        <div>
                            {receiveItems}
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }

    onModalClose = () => {
        this.setState({
            detailVisible: false
        })
    }

    getReleaseItems = () => (
        <div className='notify-bg-root'>
            <RefreshLayout
                refreshing={this.state.isReleaseRefreshing}
                onRefresh={this.loadReleaseList}
                height={this.state.height}>
                <Skeleton loading={this.state.isReleaseLoading} active paragraph={{rows: 3}}>
                    <List split={false} dataSource={this.state.releaseList}
                          renderItem={(notifyBoBean, index) => (
                              <NotifyBoardItem notifyBoBean={notifyBoBean}
                                               onDetailClick={this.onDetailClick.bind(this)}
                                               index={index}
                                               type='release'/>
                          )}/>
                </Skeleton>
            </RefreshLayout>
        </div>
    )

    getReceiveItems = () => (
        <div className='notify-bg-root'>
            <RefreshLayout
                refreshing={this.state.isReceiveRefreshing}
                onRefresh={this.loadReceiveList}
                height={this.state.height}>
                <Skeleton loading={this.state.isReceiveLoading} active paragraph={{rows: 3}}>
                    <List split={false} dataSource={this.state.receiveList}
                          renderItem={(notifyBoBean, index) => (
                              <NotifyBoardItem notifyBoBean={notifyBoBean}
                                               onDetailClick={this.onDetailClick.bind(this)}
                                               index={index}
                                               type='receive'/>
                          )}/>
                </Skeleton>
            </RefreshLayout>
        </div>
    )

    onDetailClick = (index, type) => {
        const {releaseList, receiveList} = this.state
        this.selectIndex = index
        this.selectType = type

        let notifyBoBean = new NotifyBoBean()
        if (this.selectType === 'release') {
            notifyBoBean = releaseList[this.selectIndex]
        } else if (this.selectType === 'receive') {
            notifyBoBean = receiveList[this.selectIndex]
        }

        Toast.loading('', 0)
        fetchGet(API.TASK_DETAIL, {
            notifyId: notifyBoBean.noId,
            userId: '10000',
        }).then(response => {
            Toast.hide()
            if (response && response.data) {
                let item = response.data
                if (notifyBoBean) {

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
                    notifyBoBean.noStatu = '已读'
                }

                this.setState({
                    detailVisible: true
                })

                if (this.selectType === 'release') {
                    this.setState({
                        releaseList
                    })
                    notifyBoBean = releaseList[this.selectIndex]
                } else if (this.selectType === 'receive') {
                    this.setState({
                        receiveList
                    })
                }
            }
        }).catch(error => {
            Toast.hide()
            if (typeof error === 'string') {
                Toast.fail(error)
            }
        })
    }

    loadReleaseList = () => {
        mReleaseIndex++
        console.log(mReleaseIndex)
        try {
            this.setState({
                isReleaseRefreshing: true
            })
        } catch (e) {

        }
        const {releaseList} = this.state
        if (mReleaseIndex === 1) {
            releaseList.length = 0
        }

        fetchPost(API.notifyMessage, {
            userId: 10000,
            notifyType: 4,
            pageIndex: mReleaseIndex,
            pageSize: mPageSize
        }).then(response => {
            if (response && response.data && response.data.creat.length > 0) {
                response.data.creat.forEach((item, index) => {
                    let notifyBoBean = new NotifyBoBean()

                    notifyBoBean.noId = getIntValue(item, 'notifyId')
                    notifyBoBean.noTitle = getStrValue(item, 'notifyName')
                    notifyBoBean.enclosure = getArrayValue(item, 'notifyFiles')
                    if (item.notifyRecords) {
                        notifyBoBean.unRead = getArrayValue(item.notifyRecords, 'unReads')
                        notifyBoBean.readed = getArrayValue(item.notifyRecords, 'reads')

                        notifyBoBean.allCount = getIntValue(notifyBoBean.unRead, 'length') + getIntValue(notifyBoBean.readed, 'length')
                    }
                    notifyBoBean.noContent = getStrValue(item, 'notifyDetails')
                    notifyBoBean.noIssue = getStrValue(item, 'notifyCreatorName')
                    notifyBoBean.noTime = getStrValue(item, 'creatDate')

                    if (getIntValue(item, 'isRead') == 1) {
                        notifyBoBean.noStatu = '未读'
                    } else {
                        notifyBoBean.noStatu = '已读'
                    }

                    releaseList.push(notifyBoBean)
                })
            } else {
                if (mReleaseIndex > 1) {
                    mReleaseIndex--
                }
            }
            this.setState({
                releaseList,
                isReleaseLoading: false,
                isReleaseRefreshing: false,
            })

        }).catch(error => {
            if (mReleaseIndex > 1) {
                mReleaseIndex--
            }
            this.setState({
                isReleaseLoading: false,
                isReleaseRefreshing: false
            })
            if (typeof error === 'string') {
                Toast.fail(error, 2)
            }
        })
    }

    loadReceiveList = () => {
        mReceiveIndex++
        console.log(mReceiveIndex)
        try {
            this.setState({
                isReceiveRefreshing: true
            })
        } catch (e) {

        }
        const {receiveList} = this.state
        if (mReceiveIndex === 1) {
            receiveList.length = 0
        }

        fetchPost(API.notifyMessage, {
            userId: 10000,
            notifyType: 4,
            pageIndex: mReceiveIndex,
            pageSize: mPageSize
        }).then(response => {
            if (response && response.data && response.data.notify.length > 0) {
                response.data.notify.forEach((item, index) => {
                    let notifyBoBean = new NotifyBoBean()

                    notifyBoBean.noId = getIntValue(item, 'notifyId')
                    notifyBoBean.noTitle = getStrValue(item, 'notifyName')
                    notifyBoBean.enclosure = getArrayValue(item, 'notifyFiles')
                    if (item.notifyRecords) {
                        notifyBoBean.unRead = getArrayValue(item.notifyRecords, 'unReads')
                        notifyBoBean.readed = getArrayValue(item.notifyRecords, 'reads')

                        notifyBoBean.allCount = getIntValue(notifyBoBean.unRead, 'length') + getIntValue(notifyBoBean.readed, 'length')
                    }
                    notifyBoBean.noContent = getStrValue(item, 'notifyDetails')
                    notifyBoBean.noIssue = getStrValue(item, 'notifyCreatorName')
                    notifyBoBean.noTime = getStrValue(item, 'creatDate')

                    if (getIntValue(item, 'isRead') == 1) {
                        notifyBoBean.noStatu = '未读'
                    } else {
                        notifyBoBean.noStatu = '已读'
                    }

                    receiveList.push(notifyBoBean)
                })
            } else {
                if (mReceiveIndex > 1) {
                    mReceiveIndex--
                }
            }
            this.setState({
                receiveList,
                isReceiveLoading: false,
                isReceiveRefreshing: false,
            })

        }).catch(error => {
            if (mReceiveIndex > 1) {
                mReceiveIndex--
            }
            this.setState({
                isReceiveLoading: false,
                isReceiveRefreshing: false
            })
            if (typeof error === 'string') {
                Toast.fail(error, 2)
            }
        })
    }

    onReleaseClick = () => {
        this.setState({
            selectIndex: 0
        }, () => {
            this.mySwiper.slideTo(this.state.selectIndex, 300, false)
        })
    }

    onReceiveClick = () => {
        this.setState({
            selectIndex: 1
        }, () => {
            this.mySwiper.slideTo(this.state.selectIndex, 300, false)
        })
    }

    onAddNotify = () => {
        this.props.history.push('/announceRelease')
    }
}
