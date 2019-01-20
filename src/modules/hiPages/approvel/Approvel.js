/**
 *   Created by FANGlh on 2018/11/23 18:03.
 *   Desc:审批主界面
 */

import React, {Component} from 'react';
import './Approvel.css';
import Swiper from 'swiper/dist/js/swiper';
import 'swiper/dist/css/swiper.min.css';
import ApprovelItem from './ApprovelItem';
import {Link} from 'react-router-dom';
import ReactDOM from 'react-dom';
import {fetchPost, fetchGet, fetchGetNoSession} from '../../../utils/fetchRequest';
import {API} from '../../../configs/api.config';
import InfiniteScroll from 'react-infinite-scroller'
import LoadingMore from "../../../components/LoadingMore";
import {Toast} from 'antd-mobile';
import {connect} from 'react-redux';
import RefreshLayout from "../../../components/RefreshLayout";
import {Skeleton, List} from 'antd';


let mySwiper;
let myApplypageIndex = 0;
let myApprovepageIndex = 0;
const mPageSize = 10

class Approvel extends Component {
    constructor() {
        super();
        this.state = {
            selectIndex: 0,
            hasMoreData: true,
            applyList: [],
            approvelList: [],
            isMyApplyRefreshing: false,
            isMyApproveRefreshing: false,
            isMyapplyding: true,
            isMyapproveding: true,
            height: document.documentElement.clientHeight,
        }
    }

    componentWillMount() {
        document.title = '我的审批'
    }

    componentDidMount() {
        const that = this
        const hei = this.state.height - ReactDOM.findDOMNode(this.contain).offsetTop;
        this.setState({
            height: hei
        })
        mySwiper = new Swiper('.swiper-container', {
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

        this.getMyApplyData();
        this.getMyApproveData();
    }


    render() {
        const isMyapplyItems =
            <RefreshLayout
                refreshing={this.state.isMyApplyRefreshing}
                onRefresh={this.getMyApplyData}
                height={this.state.height}>
                <Skeleton loading={this.state.isMyapplyding} active paragraph={{rows: 3}}>
                    <List dataSource={this.state.applyList}
                          renderItem={applyListBean => (
                              <List.Item>
                                  <ApprovelItem itemdata={applyListBean} type={1}/>
                              </List.Item>
                          )}/>
                </Skeleton>
            </RefreshLayout>

        const isMyapproveItems =
            <RefreshLayout
                refreshing={this.state.isMyApproveRefreshing}
                onRefresh={this.getMyApproveData}
                height={this.state.height}>
                <Skeleton loading={this.state.isMyapproveding} active paragraph={{rows: 3}}>
                    <List dataSource={this.state.approvelList}
                          renderItem={approvelListBean => (
                              <List.Item>
                                  <ApprovelItem itemdata={approvelListBean} type={2}/>
                              </List.Item>
                          )}/>
                </Skeleton>
            </RefreshLayout>

        return (
            <div className='phone-select-root'>
                <div className='gray-line'></div>
                <div className='identity-select'>
                    <div className={this.state.selectIndex == 0 ?
                        'identity-item-select' : 'identity-item-normal'}
                         onClick={this.onMyApplyClick}>我的申请
                    </div>
                    <div className={this.state.selectIndex == 1 ?
                        'identity-item-select' : 'identity-item-normal'}
                         onClick={this.onMyApprovelClick}>我的审批
                    </div>
                </div>
                <div className="swiper-container" style={{backgroundColor: "#F2F2F2", height: "100vh"}}
                     ref={el => {
                         this.contain = el
                     }}>
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            {/*{this.state.applyList.map((itemdata,index) => <ApprovelItem isMyApply={true} type={1} index={index} itemata = {itemdata} clickApplyItem ={this.clickApplyItem} ></ApprovelItem>)}*/}
                            {isMyapplyItems}
                        </div>
                        <div className="swiper-slide">
                            {/*{this.state.approvelList.map((itemdata,index) => <ApprovelItem isMyApply={false}  type={2} index={index} itemata = {itemdata} clickApprovelItem ={this.clickApprovelItem} ></ApprovelItem>)}*/}
                            {isMyapproveItems}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    getMyApplyData = () => {
        myApplypageIndex++
        try {
            this.setState({
                isMyApplyRefreshing: true
            })
        } catch (e) {

        }
        fetchGet(API.oaApproveList, {
            userId: this.props.userInfo.userId,
            pageIndex: myApplypageIndex,
            pageSize: mPageSize
        }, {}).then((response) => {
            if (response.success && response.data) {
                if (myApplypageIndex == 1) {
                    this.setState({
                        applyList: response.data.proposes,
                        // approvelList:response.data.approves
                    })
                } else {
                    this.setState({
                        applyList: this.state.applyList.push(response.data.proposes),
                        // approvelList:this.state.approvelList.push(response.data.approves)
                    })
                }
            }
            this.setState({
                isMyApplyRefreshing: false,
                isMyApproveRefreshing: false,
            })
        }).catch((error) => {
            if (typeof error === 'string') {
                Toast.fail(error, 2)
            } else {
                Toast.fail('请求异常', 2)
            }
        })
        this.setState({
            isMyApplyRefreshing: false,
            isMyApproveRefreshing: false,
        })
    }

    getMyApproveData = () => {
        myApprovepageIndex++
        try {
            this.setState({
                isMyApproveRefreshing: true
            })
        } catch (e) {

        }
        fetchGet(API.oaApproveList, {
            userId: this.props.userInfo.userId,
            pageIndex: myApprovepageIndex,
            pageSize: mPageSize
        }, {}).then((response) => {
            if (response.success && response.data) {
                if (myApprovepageIndex == 1) {
                    this.setState({
                        // applyList:response.data.proposes,
                        approvelList: response.data.approves
                    })
                } else {
                    this.setState({
                        // applyList:this.state.applyList.push(response.data.proposes),
                        approvelList: this.state.approvelList.push(response.data.approves)
                    })
                }

            }
            this.setState({
                isMyApplyRefreshing: false,
                isMyApproveRefreshing: false,
            })
        }).catch((error) => {
            if (typeof error === 'string') {
                Toast.fail(error, 2)
            } else {
                Toast.fail('请求异常', 2)
            }
            this.setState({
                isMyApplyRefreshing: false,
                isMyApproveRefreshing: false,
            })
        })
    }
    clickApplyItem = (itemdata) => {
        console.log('clickApplyItem', itemdata)
    }
    clickApprovelItem = (itemdata) => {
        console.log('clickApprovelItem', itemdata)
    }
    onMyApplyClick = () => {
        this.setState({
            selectIndex: 0
        }, () => {
            mySwiper.slideTo(this.state.selectIndex, 300, false)
        })
    }

    onMyApprovelClick = () => {
        this.setState({
            selectIndex: 1
        }, () => {
            mySwiper.slideTo(this.state.selectIndex, 300, false)
        })
    }

    componentWillReceiveProps(newProps) {
    }

    shouldComponentUpdate(newProps, newState) {
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
    }

    componentDidUpdate(prevProps, prevState) {
    }

    componentWillUnmount() {
    }
}

let mapStateToProps = (state) => ({
    userInfo: {...state.redUserInfo}
})

let mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Approvel)
