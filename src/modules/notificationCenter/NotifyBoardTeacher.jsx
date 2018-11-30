/**
 * Created by RaoMeng on 2018/11/23
 * Desc: 通知公告教职工端
 */

import React, {Component} from 'react'
import Swiper from 'swiper/dist/js/swiper'
import 'swiper/dist/css/swiper.min.css'
import 'css/consume-re.css'
import NotifyBoBean from '../../model/NotifyBoBean'
import {List, Icon, Skeleton} from 'antd'
import {Modal, PullToRefresh} from 'antd-mobile'
import InfiniteScroll from 'react-infinite-scroller'
import LoadingMore from 'components/LoadingMore'
import NotifyBoardItem from "../../components/NotifyBoardItem";
import {isObjEmpty} from "../../utils/common";

export default class NotifyBoardTeacher extends Component {

    constructor() {
        super()

        this.state = {
            selectIndex: 0,
            releaseList: [],
            receiveList: [],
            isReleaseLoading: true,
            isReceiveLoading: true,
            hasMoreRelease: true,
            hasMoreReceive: true,
            detailVisible: false
        }
    }

    componentDidMount() {
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
            <div className='notify-select-root' ref={this.scrollRef}>
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
                <div className="swiper-container">
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
                    <img src={notifyBoBean.enclosure[0]} className='principal-enclosure-img'/>
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
                                }}>{notifyBoBean.readed}/{notifyBoBean.allCount}</span>
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
            <InfiniteScroll
                pageStart={0}
                loadMore={this.loadReleaseList}
                initialLoad={false}
                useWindow={false}
                getScrollParent={this.scrollRef}
                hasMore={this.state.hasMoreRelease}
                loader={<LoadingMore/>}>
                <Skeleton loading={this.state.isReleaseLoading} active paragraph={{rows: 3}}>
                    <List split={false} dataSource={this.state.releaseList}
                          renderItem={(notifyBoBean, index) => (
                              <NotifyBoardItem notifyBoBean={notifyBoBean}
                                               onDetailClick={this.onDetailClick.bind(this)}
                                               index={index}
                                               type='release'/>
                          )}/>
                </Skeleton>
            </InfiniteScroll>
        </div>
    )

    scrollRef = (e) => {
        console.log('scroll',e)
    }

    getReceiveItems = () => (
        <div className='notify-bg-root'>
            <InfiniteScroll
                pageStart={0}
                initialLoad={false}
                loadMore={this.loadReceiveList}
                hasMore={this.state.hasMoreReceive}
                loader={<LoadingMore/>}>
                <Skeleton loading={this.state.isReceiveLoading} active paragraph={{rows: 3}}>
                    <List split={false} dataSource={this.state.receiveList}
                          renderItem={(notifyBoBean, index) => (
                              <NotifyBoardItem notifyBoBean={notifyBoBean}
                                               onDetailClick={this.onDetailClick.bind(this)}
                                               index={index}
                                               type='receive'/>
                          )}/>
                </Skeleton>
            </InfiniteScroll>
        </div>
    )

    onDetailClick = (index, type) => {
        this.selectIndex = index
        this.selectType = type
        this.setState({
            detailVisible: true
        })
    }

    loadReleaseList = () => {
        setTimeout(() => {
            console.log('loadReleaseList')
            const receivesDemo = ['李泞', '章晨望', '赖斯睿', '左熹', '李爽']
            const {releaseList} = this.state
            for (let i = 0; i < 20; i++) {
                let notifyBoBean = new NotifyBoBean()

                notifyBoBean.noTitle = '2019春季校运会'
                if (i % 2 === 0) {
                    notifyBoBean.noStatu = ''
                    notifyBoBean.enclosure = [
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543039474667&di=32c37088ba29d428392cee485ce29995&imgtype=0&src=http%3A%2F%2Fpic153.nipic.com%2Ffile%2F20171226%2F26515894_231421032000_2.jpg',
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543039450432&di=c4e6d3b8039a4b2b2713a8fa278a54cc&imgtype=0&src=http%3A%2F%2Ffx120.120askimages.com%2F120ask_news%2F2017%2F0706%2F201707061499322886181789.jpg'
                    ]
                    notifyBoBean.receiveList = receivesDemo.concat(receivesDemo, receivesDemo, receivesDemo)
                    notifyBoBean.unRead = 25
                    notifyBoBean.readed = 20
                    notifyBoBean.allCount = 45
                } else {
                    notifyBoBean.noStatu = ''
                    notifyBoBean.enclosure = []
                    notifyBoBean.receiveList = receivesDemo.concat(receivesDemo, receivesDemo)
                    notifyBoBean.unRead = 30
                    notifyBoBean.readed = 15
                    notifyBoBean.allCount = 45
                }
                notifyBoBean.noContent = ' 尊敬的家长和尊敬的各位来宾，你们好，我校将在10月25号举办校园运动会，请各位家长们积极配合校园运动会的工作的开展'
                notifyBoBean.noIssue = '周老师'
                notifyBoBean.noTime = '2019-03-20 18:00'

                releaseList.push(notifyBoBean)
            }
            this.setState({
                releaseList,
                isReleaseLoading: false
            })
        }, 1500)
    }

    loadReceiveList = () => {
        setTimeout(() => {
            console.log('loadReceiveList')
            const receivesDemo = ['李泞', '章晨望', '赖斯睿', '左熹', '李爽']
            const {receiveList} = this.state
            for (let i = 0; i < 20; i++) {
                let notifyBoBean = new NotifyBoBean()

                notifyBoBean.noTitle = '国庆全体师生出游活动'
                if (i % 2 === 0) {
                    notifyBoBean.noStatu = '已读'
                    notifyBoBean.enclosure = [
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543039474667&di=32c37088ba29d428392cee485ce29995&imgtype=0&src=http%3A%2F%2Fpic153.nipic.com%2Ffile%2F20171226%2F26515894_231421032000_2.jpg',
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543039450432&di=c4e6d3b8039a4b2b2713a8fa278a54cc&imgtype=0&src=http%3A%2F%2Ffx120.120askimages.com%2F120ask_news%2F2017%2F0706%2F201707061499322886181789.jpg'
                    ]
                    notifyBoBean.receiveList = receivesDemo.concat(receivesDemo, receivesDemo, receivesDemo)
                    notifyBoBean.unRead = 25
                    notifyBoBean.readed = 20
                } else {
                    notifyBoBean.noStatu = '未读'
                    notifyBoBean.enclosure = []
                    notifyBoBean.receiveList = receivesDemo.concat(receivesDemo, receivesDemo)
                    notifyBoBean.unRead = 30
                    notifyBoBean.readed = 15
                }
                notifyBoBean.noContent = ' 尊敬的家长和尊敬的各位来宾，你们好，我校将在10月1号组织全体师生出游活动，请各位家长们积极配合'
                notifyBoBean.noIssue = '周老师'
                notifyBoBean.noTime = '2019-03-20 18:00'
                receiveList.push(notifyBoBean)
            }
            this.setState({
                receiveList,
                isReceiveLoading: false
            })
        }, 3000)
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
