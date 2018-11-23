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
            hasMoreReceive: true
        }
    }

    componentDidMount() {
        document.title = '通知公告'

        const that = this
        const {selectIndex, releaseList, receiveList} = this.state

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
    }

    componentWillUnmount() {

    }

    render() {
        const {selectIndex, releaseList, receiveList} = this.state
        const releaseItems = this.getReleaseItems()
        const receiveItems = this.getReceiveItems()

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
            </div>
        )
    }

    getReleaseItems = () => (
        <div className='notify-bg-root'>
            <InfiniteScroll
                pageStart={0}
                loadMore={this.loadReleaseList}
                hasMore={this.state.hasMoreRelease}
                loader={<LoadingMore/>}>
                <Skeleton loading={this.state.isReleaseLoading} active paragraph={{rows: 3}}>
                    <List split={false} dataSource={this.state.releaseList}
                          renderItem={notifyBoBean => (
                              <NotifyBoardItem notifyBoBean={notifyBoBean}/>
                          )}/>
                </Skeleton>
            </InfiniteScroll>
        </div>
    )

    getReceiveItems = () => (
        <div className='notify-bg-root'>
            <InfiniteScroll
                pageStart={0}
                loadMore={this.loadReceiveList}
                hasMore={this.state.hasMoreReceive}
                loader={<LoadingMore/>}>
                <Skeleton loading={this.state.isReceiveLoading} active paragraph={{rows: 3}}>
                    <List split={false} dataSource={this.state.receiveList}
                          renderItem={notifyBoBean => (
                              <NotifyBoardItem notifyBoBean={notifyBoBean}/>
                          )}/>
                </Skeleton>
            </InfiniteScroll>
        </div>
    )

    loadReleaseList = () => {
        setTimeout(() => {
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
}
