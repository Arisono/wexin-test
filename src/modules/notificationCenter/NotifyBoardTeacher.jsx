/**
 * Created by RaoMeng on 2018/11/23
 * Desc: 通知公告教职工端
 */

import React, {Component} from 'react'
import Swiper from 'swiper/dist/js/swiper'
import 'swiper/dist/css/swiper.min.css'
import 'css/consume-re.css'
import NotifyBoBean from 'model/NotifyBoBean'
import {List, Icon, Skeleton} from 'antd'
import {Modal, PullToRefresh} from 'antd-mobile'
import InfiniteScroll from 'react-infinite-scroller'
import LoadingMore from 'components/LoadingMore'
import NotifyBoardItem from "../../components/NotifyBoardItem";

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
            <div className='phone-select-root'>
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
        return (
            <Modal
                popup
                visible={this.state.detailVisible}
                onClose={this.onModalClose}
                animationType="slide-up">
                <div style={{height:'100px'}}>
                    {this.selectType === 'release' ? '我发布的' : '我接收的'}通知公告第{this.selectIndex}条详情
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

    scrollParentRef = (e) => {
        console.log('scroll', e)
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
        console.log(type, index)
        this.selectIndex = index
        this.selectType = type
        this.setState({
            detailVisible: true
        })
    }

    loadReleaseList = () => {
        setTimeout(() => {
            console.log('loadReleaseList')
            const {releaseList} = this.state
            for (let i = 0; i < 20; i++) {
                let notifyBoBean = new NotifyBoBean()

                notifyBoBean.noTitle = '2019春季校运会'
                if (i % 2 === 0) {
                    notifyBoBean.noStatu = '已读'
                } else {
                    notifyBoBean.noStatu = '未读'
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
            const {receiveList} = this.state
            for (let i = 0; i < 20; i++) {
                let notifyBoBean = new NotifyBoBean()

                notifyBoBean.noTitle = '2019春季校运会'
                if (i % 2 === 0) {
                    notifyBoBean.noStatu = '已读'
                } else {
                    notifyBoBean.noStatu = '未读'
                }
                notifyBoBean.noContent = ' 尊敬的家长和尊敬的各位来宾，你们好，我校将在10月25号举办校园运动会，请各位家长们积极配合校园运动会的工作的开展'
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

    onAddNotify=()=>{
        this.props.history.push('/announceRelease')
    }
}
