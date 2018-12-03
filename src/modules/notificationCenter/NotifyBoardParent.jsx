import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import NotifyBoBean from 'model/NotifyBoBean'
import {List, Icon, Skeleton} from 'antd'
import InfiniteScroll from 'react-infinite-scroller'
import LoadingMore from 'components/LoadingMore'
import NotifyBoardItem from "../../components/NotifyBoardItem";
import 'css/consume-re.css'
import {Toast, Modal, PullToRefresh} from "antd-mobile";
import {getArrayValue, getIntValue, getStrValue, isObjEmpty, isObjNull} from "../../utils/common";
import {fetchGet, fetchPost} from "../../utils/fetchRequest";
import {_baseURL, API} from "../../configs/api.config";

const mPageSize = 10
let mPageIndex = 0

export default class NotifyBoardParent extends Component {

    constructor() {
        super()

        this.state = {
            notifyList: [],
            isLoading: true,
            detailVisible: false,
            isRefreshing: false,
            height: document.documentElement.clientHeight
        }
    }

    componentDidMount() {
        mPageIndex = 0
        const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
        setTimeout(() =>
                this.setState({
                    height: hei,
                })
            , 0);
        document.title = '通知公告'
        Toast.loading('努力加载中...', 0)
        this.loadRechargeList()
    }

    render() {
        const {notifyList, isLoading, isRefreshing} = this.state
        const detailModal = this.getDetailModal()

        return (
            <div className='notify-bg-root'>
                <PullToRefresh
                    direction='up'
                    refreshing={isRefreshing}
                    ref={el => this.ptr = el}
                    style={{
                        height: this.state.height,
                        overflow: 'auto',
                    }}
                    onRefresh={this.loadRechargeList}>
                    <Skeleton loading={isLoading} active paragraph={{rows: 3}}>
                        <List split={false} dataSource={notifyList}
                              renderItem={(notifyBoBean, index) => (
                                  <NotifyBoardItem notifyBoBean={notifyBoBean}
                                                   onDetailClick={this.onDetailClick.bind(this)}
                                                   index={index}/>
                              )}/>
                    </Skeleton>
                </PullToRefresh>
                {detailModal}
            </div>
        )
    }

    getDetailModal = () => {
        const {notifyList} = this.state

        let notifyBoBean = notifyList[this.selectIndex]

        if (isObjNull(notifyBoBean)) {
            return
        }
        let enclosureItem = <div></div>
        if (!isObjEmpty(notifyBoBean.enclosure) && notifyBoBean.enclosure != '[]') {
            enclosureItem =
                <div className='principal-enclosure-layout'>
                    <img src={_baseURL + notifyBoBean.enclosure[0]} className='principal-enclosure-img'/>
                    <span className='principal-enclosure-count'>({notifyBoBean.enclosure.length}张)</span>
                </div>
        }

        const receives = notifyBoBean.receiveList
        const receiveItems = []
        if (!isObjEmpty(receives) && receives != '[]') {
            for (let i = 0; i < receives.length; i++) {
                receiveItems.push(<span className='notify-detail-modal-receive'>{receives[i]}</span>)
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
                            {/* <span
                                className={notifyBoBean.noStatu === '已读' ?
                                    'notify-item-statuAl' : 'notify-item-statuNo'}>{notifyBoBean.noStatu}</span>*/}
                        </div>
                        <div className='notify-detail-modal-content-text'>{notifyBoBean.noContent}</div>
                        <div style={{padding: '10px'}}>
                            {enclosureItem}
                        </div>
                        <div className='notify-detail-modal-time'>{notifyBoBean.noIssue}</div>
                        <div className='notify-detail-modal-time'>{notifyBoBean.noTime}</div>
                        {/*<div className='gray-line'></div>
                        <div className='common-flex-row-10 common-font-family'>
                            <span style={{color: '#363636'}}>接收人</span>
                            <div style={{flex: '1', textAlign: 'right'}}>
                                <span style={{fontSize: '12px', color: '#CD1D1D'}}>未读：{notifyBoBean.unRead}</span>
                                <span style={{
                                    fontSize: '12px',
                                    color: '#161616',
                                    marginLeft: '10px'
                                }}>已读：{notifyBoBean.readed}</span>
                            </div>
                        </div>
                        <div>
                            {receiveItems}
                        </div>*/}
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


    onDetailClick = (index) => {
        const {notifyList} = this.state
        this.selectIndex = index

        Toast.loading('', 0)
        fetchGet(API.TASK_DETAIL, {
            notifyId: notifyList[index].noId,
            userId: '10001',
        }).then(response => {
            Toast.hide()
            if (response && response.data) {
                let item = response.data
                if (notifyList && notifyList[index]) {
                    let notifyBoBean = notifyList[index]

                    notifyBoBean.noId = getIntValue(item, 'notifyId')
                    notifyBoBean.noTitle = getStrValue(item, 'notifyName')
                    notifyBoBean.enclosure = getArrayValue(item, 'notifyFiles')
                    if (item.notifyRecords) {
                        notifyBoBean.unRead = getArrayValue(item.notifyRecords, 'unReads')
                        notifyBoBean.readed = getArrayValue(item.notifyRecords, 'reads')
                    }
                    notifyBoBean.noContent = getStrValue(item, 'notifyDetails')
                    notifyBoBean.noIssue = getStrValue(item, 'notifyCreatorName')
                    notifyBoBean.noTime = getStrValue(item, 'creatDate')
                    notifyBoBean.noStatu = '已读'
                }

                this.setState({
                    notifyList,
                    detailVisible: true
                })
            }
        }).catch(error => {
            Toast.hide()
            if (typeof error === 'string') {
                Toast.fail(error)
            }
        })
    }

    loadRechargeList = () => {
        mPageIndex++
        console.log(mPageIndex)
        try {
            this.setState({
                isRefreshing: true
            })
        } catch (e) {

        }

        const {notifyList} = this.state
        if (mPageIndex === 1) {
            notifyList.length = 0
        }

        fetchPost(API.notifyMessage, {
            userId: 10000,
            notifyType: 4,
            pageIndex: mPageIndex,
            pageSize: mPageSize
        }).then(response => {
            Toast.hide()
            if (response && response.data && response.data.notify.length > 0) {
                response.data.notify.forEach((item, index) => {
                    let notifyBoBean = new NotifyBoBean()

                    notifyBoBean.noId = getIntValue(item, 'notifyId')
                    notifyBoBean.noTitle = getStrValue(item, 'notifyName')
                    notifyBoBean.enclosure = getArrayValue(item, 'notifyFiles')
                    if (item.notifyRecords) {
                        notifyBoBean.unRead = getArrayValue(item.notifyRecords, 'unReads')
                        notifyBoBean.readed = getArrayValue(item.notifyRecords, 'reads')
                    }
                    notifyBoBean.noContent = getStrValue(item, 'notifyDetails')
                    notifyBoBean.noIssue = getStrValue(item, 'notifyCreatorName')
                    notifyBoBean.noTime = getStrValue(item, 'creatDate')

                    if (getIntValue(item, 'isRead') == 1) {
                        notifyBoBean.noStatu = '未读'
                    } else {
                        notifyBoBean.noStatu = '已读'
                    }

                    notifyList.push(notifyBoBean)
                })
            } else {
                if (mPageIndex > 1) {
                    mPageIndex--
                }
            }
            this.setState({
                notifyList,
                isLoading: false,
                isRefreshing: false,
            })

        }).catch(error => {
            Toast.hide();

            if (mPageIndex > 1) {
                mPageIndex--
            }
            this.setState({
                isLoading: false,
                isRefreshing: false
            })
            if (typeof error === 'string') {
                Toast.fail(error, 2)
            }
        })
    }

}
