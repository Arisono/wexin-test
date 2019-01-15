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
import {Modal, Toast} from 'antd-mobile'
import RefreshLayout from '../../components/RefreshLayout'
import NotifyBoardItem from "../../components/NotifyBoardItem";
import {getArrayValue, getIntValue, getStrValue, isObjEmpty} from "../../utils/common";
import {fetchGet, fetchPost} from "../../utils/fetchRequest";
import {_baseURL, API} from "../../configs/api.config";
import ImagesViewer from "../../components/imagesVIewer";
import NotifyBoardParent from "./NotifyBoardParent";
import {connect} from 'react-redux'
import {saveListState} from 'action/listState'

const mPageSize = 10
let mReleaseIndex = 0
let mReceiveIndex = 0

class NotifyBoardTeacher extends Component {

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
            height: document.documentElement.clientHeight,
            previewVisible: false
        }
    }

    componentDidMount() {
        const hei = this.state.height - ReactDOM.findDOMNode(this.contain).offsetTop;
        this.setState({
            height: hei
        })
        document.title = '通知公告'

        const that = this
        console.log(this.props.listState)

        this.mySwiper = new Swiper('.swiper-container', {
            autoplay: false,
            loop: false,
            noSwiping: false,
            initialSlide: that.state.selectIndex,
            on: {
                slideChangeTransitionEnd: function () {
                    that.setState({
                        selectIndex: this.activeIndex
                    })
                }
            }
        })

        if (this.props.listState.tabIndex >= 0) {
            this.setState({
                selectIndex: this.props.listState.tabIndex
            }, () => {
                this.mySwiper.slideTo(this.state.selectIndex, 0, false)
            })
        }

        if (this.props.listState && !isObjEmpty(this.props.listState.listData)) {
            this.setState({
                releaseList: this.props.listState.listData,
                isReleaseLoading: false,
            }, () => {
                ReactDOM.findDOMNode(this.releaseTab).scrollTop =
                    this.props.listState.scrollTop
            })
            mReleaseIndex = this.props.listState.pageIndex
        } else {
            mReleaseIndex = 0
            this.loadReleaseList()
        }

        if (this.props.listState && !isObjEmpty(this.props.listState.listData2)) {
            this.setState({
                receiveList: this.props.listState.listData2,
                isReceiveLoading: false,
            }, () => {
                ReactDOM.findDOMNode(this.receiveTab).scrollTop =
                    this.props.listState.scrollTop2
            })
            mReceiveIndex = this.props.listState.pageIndex2
        } else {
            mReceiveIndex = 0
            this.loadReceiveList()
        }

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
                            <div className='swiper-content'>
                                {releaseItems}
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className='swiper-content'>
                                {receiveItems}
                            </div>
                        </div>
                    </div>
                </div>

                <Icon type="plus-circle" theme='filled' className='common-add-icon'
                      onClick={this.onAddNotify}/>
                {detailModal}
            </div>
        )
    }

    getDetailModal = () => {
        const {releaseList, receiveList, previewVisible} = this.state

        let notifyBoBean = new NotifyBoBean()
        if (this.selectType === 'release') {
            notifyBoBean = releaseList[this.selectIndex]
        } else if (this.selectType === 'receive') {
            notifyBoBean = receiveList[this.selectIndex]
        }

        let enclosureItem = <div></div>
        let pictureUrls = []
        if (!isObjEmpty(notifyBoBean.enclosure) && notifyBoBean.enclosure != '[]') {
            enclosureItem =
                <div className='principal-enclosure-layout'>
                    <img src={_baseURL + notifyBoBean.enclosure[0]} className='principal-enclosure-img'
                         onClick={this.handlePreview}/>
                    <span className='principal-enclosure-count'>({notifyBoBean.enclosure.length}张)</span>
                </div>

            notifyBoBean.enclosure.forEach((enclosure, index) => {
                pictureUrls.push(_baseURL + enclosure)
            })
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
            <div>
                {previewVisible ?
                    <ImagesViewer onClose={this.handleCancel} urls={pictureUrls}
                                  index={0}
                                  needPoint={pictureUrls.length <= 9}/> : ""}
                <Modal
                    popup
                    visible={this.state.detailVisible}
                    onClose={this.onModalClose}
                    animationType="slide-up">
                    <div className='notify-detail-modal-layout'>
                        <div style={{
                            width: '100%',
                            padding: '12px 14px',
                            background: 'transparent',
                            textAlign: 'right'
                        }}>
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
            </div>

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
                ref={el => {
                    this.releaseTab = el
                }}
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
                ref={el => {
                    this.receiveTab = el
                }}
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
            notifyBoBean.noStatu = '已读'
            this.setState({
                receiveList
            })
        }

        this.saveListStatus(false, index)

        this.props.history.push('/notifyDetail/' + notifyBoBean.noId)

        /*Toast.loading('', 0)
        fetchGet(API.TASK_DETAIL, {
            notifyId: notifyBoBean.noId,
            userId: this.props.userInfo.userId,
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
                    if (this.selectType === 'receive') {
                        notifyBoBean.noStatu = '已读'
                    }
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
            }else {
                Toast.fail('请求异常')
            }
        })*/
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
            userId: this.props.userInfo.userId,
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

                    /*if (getIntValue(item, 'isRead') == 1) {
                        notifyBoBean.noStatu = '未读'
                    } else {
                        notifyBoBean.noStatu = '已读'
                    }*/

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
            } else {
                Toast.fail('请求异常')
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
            userId: this.props.userInfo.userId,
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
            } else {
                Toast.fail('请求异常')
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
        this.saveListStatus(true, null)
        this.props.history.push('/announceRelease')
    }

    saveListStatus = (pageLimit, itemIndex) => {
        const {releaseList, receiveList} = this.state
        let releaseScroll = 0, receiveScroll = 0, releaseIndex = 0, receiveIndex = 0

        if (releaseList.length <= 10 && pageLimit) {
            releaseList.length = 0
            releaseIndex = 0
            releaseScroll = 0
        } else {
            releaseIndex = mReleaseIndex
            releaseScroll = ReactDOM.findDOMNode(this.releaseTab).scrollTop
        }
        if (receiveList.length <= 10 && pageLimit) {
            receiveList.length = 0
            receiveIndex = 0
            receiveScroll = 0
        } else {
            receiveIndex = mReceiveIndex
            receiveScroll = ReactDOM.findDOMNode(this.receiveTab).scrollTop
        }
        saveListState({
            scrollTop: releaseScroll,
            listData: releaseList,
            pageIndex: releaseIndex,
            tabIndex: this.state.selectIndex,
            scrollTop2: receiveScroll,
            listData2: receiveList,
            pageIndex2: receiveIndex,
            itemIndex: itemIndex || this.props.listState.itemIndex
        })()
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

export default connect(mapStateToProps, mapDispatchToProps)(NotifyBoardTeacher)