/**
*   Created by FANGlh on 2018/11/23 18:03.
*   Desc:审批主界面
*/

import React,{Component} from 'react';
import './Approvel.css';
import Swiper from 'swiper/dist/js/swiper';
import 'swiper/dist/css/swiper.min.css';
import {List, Icon} from 'antd'
import icon_out from '../../../style/imgs/out_img.png';
import icon_res from '../../../style/imgs/res_img.png';
import icon_trip from '../../../style/imgs/trip_img.png';
import ApprovelItem from './ApprovelItem';
import {Link} from 'react-router-dom';
import {fetchPost,fetchGet,fetchGetNoSession} from '../../../utils/fetchRequest';
import {API} from '../../../configs/api.config';

let mySwiper


export default class Approvel extends Component{
    constructor(){
        super();
        this.state = {
            selectIndex: 0,
            applyList: [1,2,3],
            approvelList: []
        }
    }
    componentWillMount() {
    }
    componentDidMount() {
        document.title = '审批'
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
        let approvelListData  = [
            {
                img:icon_trip,
                title:'出差申请',
                date:'2018/11/22   14:00',
                status:'待处理',
                statustype:1
            },{
                img:icon_res,
                title:'用品申请',
                date:'2018/11/22   14:00',
                status:'已处理',
                statustype:2
            },{
                img:icon_out,
                title:'外出申请',
                date:'2018/11/22   14:00',
                status:'已处理',
                statustype:2
            }
        ]
        let applyListData  = [
            {
                img:icon_res,
                title:'用品申请',
                date:'2018/11/22   14:00',
                status:'已审批',
                statustype:2
            },{
                img:icon_out,
                title:'外出申请',
                date:'2018/11/22   14:00',
                status:'待审批',
                statustype:1
            },
            {
                img:icon_trip,
                title:'出差申请',
                date:'2018/11/22   14:00',
                status:'待审批',
                statustype:1
            }
        ]

        this.setState({
            applyList:applyListData,
            approvelList:approvelListData
        })

        fetchGet(API.oaApproveList,{
            userId:10000,
            pageIndex:1,
            pageSize:10
        },{})
            .then((response)=>{
                console.log('response',response)
            })
            .catch((error) =>{
                console.log('error',error)
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
    render(){
        const {selectIndex, applyList, approvelList} = this.state
        return(
            <div className='phone-select-root'>
                <div className='gray-line'></div>
                <div className='identity-select'>
                    <div className={selectIndex == 0 ?
                        'identity-item-select' : 'identity-item-normal'}
                         onClick={this.onMyApplyClick}>我的申请
                    </div>
                    <div className={selectIndex == 1 ?
                        'identity-item-select' : 'identity-item-normal'}
                         onClick={this.onMyApprovelClick}>我的审批
                   </div>
                </div>
                <div className="swiper-container" style={{backgroundColor:"#F2F2F2",height:"100vh"}}>
                    <div className="swiper-wrapper">

                            <div className="swiper-slide">
                                <Link to="/approvel-detail">
                                {this.state.applyList.map((itemdata,index) => <ApprovelItem type={1} index={index} itemata = {itemdata} clickApplyItem ={this.clickApplyItem} ></ApprovelItem>)}
                                </Link>
                            </div>
                        <div className="swiper-slide">
                            <Link to="/approvel-detail">
                                {this.state.approvelList.map((itemdata,index) => <ApprovelItem type={2} index={index} itemata = {itemdata} clickApprovelItem ={this.clickApprovelItem} ></ApprovelItem>)}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
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
}
