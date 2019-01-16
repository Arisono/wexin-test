/**
 * Created by RaoMeng on 2019/1/13
 * Desc: 投票助手教师端
 */

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Swiper from 'swiper/dist/js/swiper'
import 'swiper/dist/css/swiper.min.css'
import {List, Icon, Skeleton} from 'antd'
import {Modal, Toast} from 'antd-mobile'
import RefreshLayout from '../../components/RefreshLayout'
import {_baseURL, API} from "../../configs/api.config";
import {connect} from 'react-redux'
import {saveListState} from 'action/listState'
import {getArrayValue, getIntValue, getStrValue, isObjEmpty} from "../../utils/common"
import VoteItem from 'components/VoteItem'
import NotifyBoardItem from "../../components/NotifyBoardItem";
import {fetchGet, fetchPost} from "../../utils/fetchRequest";
import NotifyBoBean from "../../model/NotifyBoBean";

const mPageSize = 10
let mReleaseIndex = 0
let mReceiveIndex = 0

class VoteListTeacher extends Component {

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

        document.title = '投票助手'
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
        Toast.hide()
    }

    render() {
        const {selectIndex} = this.state
        const releaseItems = this.getReleaseItems()
        const receiveItems = this.getReceiveItems()

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
                      onClick={this.onAddVote}/>
            </div>
        )
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

        fetchGet(API.voteListTeacher, {
            userId: this.props.userInfo.userId,
            voteType: '1',
            pageIndex: mReleaseIndex,
            pageSize: mPageSize
        }).then(response => {
            if (response && response.data && response.data.create.length > 0) {
                response.data.create.forEach((item, index) => {
                    let voteBean = {}

                    voteBean.voteId = getIntValue(item, 'voteId')
                    voteBean.voteName = getStrValue(item, 'voteName')
                    voteBean.voteType = getIntValue(item, 'voteType')
                    voteBean.voteStatusCode = getIntValue(item, 'voteStatus')
                    if (voteBean.voteStatusCode === 1) {
                        voteBean.voteStatus = '进行中'
                    } else {
                        voteBean.voteStatus = '已投票'
                    }
                    voteBean.creatDate = getStrValue(item, 'creatDate')
                    voteBean.voteEndDate = getStrValue(item, 'voteEndDate')
                    voteBean.voteRemarks = getStrValue(item, 'voteRemarks')

                    const topics = getStrValue(item, 'topics')
                    if (!isObjEmpty(topics)) {
                        voteBean.options = topics[0].options
                    }

                    releaseList.push(voteBean)
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

        fetchGet(API.voteListTeacher, {
            userId: this.props.userInfo.userId,
            voteType: '1',
            pageIndex: mReceiveIndex,
            pageSize: mPageSize
        }).then(response => {
            if (response && response.data && response.data.notify.length > 0) {
                response.data.notify.forEach((item, index) => {
                    let voteBean = {}

                    voteBean.voteId = getIntValue(item, 'voteId')
                    voteBean.voteName = getStrValue(item, 'voteName')
                    voteBean.voteType = getIntValue(item, 'voteType')
                    voteBean.voteStatusCode = getIntValue(item, 'voteStatus')
                    if (voteBean.voteStatusCode === 1) {
                        voteBean.voteStatus = '进行中'
                    } else {
                        voteBean.voteStatus = '已投票'
                    }
                    voteBean.creatDate = getStrValue(item, 'creatDate')
                    voteBean.voteEndDate = getStrValue(item, 'voteEndDate')
                    voteBean.voteRemarks = getStrValue(item, 'voteRemarks')

                    const topics = getStrValue(item, 'topics')
                    if (!isObjEmpty(topics)) {
                        voteBean.options = topics[0].options
                    }

                    receiveList.push(voteBean)
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
                          renderItem={(item, index) => (
                              <VoteItem
                                  voteBean={item}
                                  onItemClick={this.onItemClick.bind(this)}
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
                          renderItem={(item, index) => (
                              <VoteItem
                                  voteBean={item}
                                  onItemClick={this.onItemClick.bind(this)}
                                  index={index}
                                  type='receive'/>
                          )}/>
                </Skeleton>
            </RefreshLayout>
        </div>
    )

    onItemClick = (index, voteId) => {
        this.saveListStatus(false, index)
        this.props.history.push('/voteDetail/' + voteId)
    }

    onAddVote = () => {
        this.saveListStatus(true, -1)
        this.props.history.push('/send-vote')
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
            itemIndex: itemIndex
        })()
    }
}


let mapStateToProps = (state) => ({
    userInfo: {...state.redUserInfo},
    listState: {...state.redListState}
})

let mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(VoteListTeacher)
