/**
*   Created by FANGlh on 2018/11/23 18:03.
*   Desc:审批主界面
*/

import React,{Component} from 'react';
import './Approvel.css';
import Swiper from 'swiper/dist/js/swiper';
import 'swiper/dist/css/swiper.min.css';
import ApprovelItem from './ApprovelItem';
import {Link} from 'react-router-dom';
import {fetchPost,fetchGet,fetchGetNoSession} from '../../../utils/fetchRequest';
import {API} from '../../../configs/api.config';
import InfiniteScroll from 'react-infinite-scroller'
import LoadingMore from "../../../components/LoadingMore";
import {Toast} from 'antd-mobile';
import {connect} from 'react-redux';

let mySwiper;


class Approvel extends Component{
    constructor(){
        super();
        this.state = {
            pageIndex:1,
            pageSize:20,
            selectIndex: 0,
            hasMoreData:true,
            applyList: [],
            approvelList: []
        }
    }
    componentWillMount() {
        document.title = '审批'
    }
    componentDidMount() {
        const that = this
        const {selectIndex, applyList, approvelList} = this.state

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

       this.getHttpData(this.state.pageIndex);
    }


    render(){
        return(
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
                <div className="swiper-container" style={{backgroundColor:"#F2F2F2",height:"100vh"}}>
                    <div className="swiper-wrapper">

                        <div className="swiper-slide">
                            {/*<InfiniteScroll*/}
                                {/*pageStart={0}*/}
                                {/*loadMore={this.loadMoreAction}*/}
                                {/*hasMore={this.state.hasMoreData}*/}
                                {/*loader={<LoadingMore/>}>*/}
                                {/*<Link to={"/approvel-detail"}>*/}
                                    {this.state.applyList.map((itemdata,index) => <ApprovelItem isMyApply={true} type={1} index={index} itemata = {itemdata} clickApplyItem ={this.clickApplyItem} ></ApprovelItem>)}
                                {/*</Link>*/}
                            {/*</InfiniteScroll>*/}
                        </div>
                        <div className="swiper-slide">
                            {/*<InfiniteScroll*/}
                                {/*pageStart={0}*/}
                                {/*loadMore={this.loadMoreAction}*/}
                                {/*hasMore={this.state.hasMoreData}*/}
                                {/*loader={<LoadingMore/>}>*/}
                                {/*<Link to="/approvel-detail">*/}
                                    {this.state.approvelList.map((itemdata,index) => <ApprovelItem isMyApply={false}  type={2} index={index} itemata = {itemdata} clickApprovelItem ={this.clickApprovelItem} ></ApprovelItem>)}
                                {/*</Link>*/}
                            {/*</InfiniteScroll>*/}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    getHttpData =(pageIndex)=>{
        fetchGet(API.oaApproveList,{
            userId:this.props.userInfo.userId,
            pageIndex:pageIndex,
            pageSize:this.state.pageSize
        },{}).then((response)=>{
            if(response.success && response.data){
                this.setState({
                    applyList:response.data.proposes,
                    approvelList:response.data.approves
                })
            }
        }).catch((error) =>{
            if (typeof error === 'string') {
                Toast.fail(error, 2)
            } else {
                Toast.fail('请求异常', 2)
            }
        })
    }
    loadMoreAction = () =>{
        setTimeout(()=>{
            this.state.pageIndex++
            this.getHttpData(this.state.pageIndex)
        },1500)
    }
    clickApplyItem = (itemdata) =>{
        console.log('clickApplyItem',itemdata)
    }
    clickApprovelItem = (itemdata) =>{
        console.log('clickApprovelItem',itemdata)
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
