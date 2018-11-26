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
import ApprovelItem from './Approvel';

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
        console.log('Component WILL MOUNT!')
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
        let  applyListDataapplyListData = [
            {
                img:icon_trip,
                title:'出差申请',
                date:new Date().toLocaleString(),
                status:'待处理'
            },{
                img:icon_res,
                title:'用品申请',
                date:new Date().toLocaleString(),
                status:'已处理'
            },{
                img:icon_out,
                title:'外出申请',
                date:new Date().toLocaleString(),
                status:'待处理'
            }
        ]
    }
    componentWillReceiveProps(newProps) {
        console.log('Component WILL RECEIVE PROPS!')
    }
    shouldComponentUpdate(newProps, newState) {
        return true;
    }
    componentWillUpdate(nextProps, nextState) {
        console.log('Component WILL UPDATE!');
    }
    componentDidUpdate(prevProps, prevState) {
        console.log('Component DID UPDATE!')
    }
    componentWillUnmount() {
        console.log('Component WILL UNMOUNT!')
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
                            {this.state.applyList.map((itemata,index) => <ApprovelItem index={index} itemata = {itemata} onClick ={this.clickApplyItem(this,index)} ></ApprovelItem>)}
                        </div>
                        <div className="swiper-slide">
                            {this.state.approvelList.map((itemata,index) => <ApprovelItem index={index} itemata = {itemata} onClick ={this.clickApprovelItem(this,index)} ></ApprovelItem>)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    clickApplyItem = (index) =>{

    }
    clickApprovelItem = (index) =>{

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
