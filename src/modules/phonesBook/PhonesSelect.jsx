/**
 * Created by RaoMeng on 2018/11/7
 * Desc: 通讯录首页
 */

import React, {Component} from 'react'
import Swiper from 'swiper/dist/js/swiper'
import 'swiper/dist/css/swiper.min.css'
import 'css/phones.css'
import {List, Icon} from 'antd'
import {isObjEmpty} from "../../utils/common";

let mySwiper

export default class PhonesSelect extends Component {

    constructor() {
        super()

        this.state = {
            selectIndex: 0,
            teacherList: [],
            parentList: []
        }
    }

    componentDidMount() {
        document.title = '通讯录'
        const that = this
        const {selectIndex, teacherList, parentList} = this.state

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

        let teachers = ['三年级(2)班', '三年级(1)班', '四年级(2)班', '三年级(2)班', '三年级(1)班', '四年级(2)班']
        let parents = ['三年级(4)班', '三年级(6)班', '四年级(12)班', '三年级(4)班', '三年级(6)班', '四年级(12)班', '四年级(12)班', '三年级(4)班', '三年级(6)班', '四年级(12)班']

        this.setState({
            teacherList: teacherList.concat(teachers),
            parentList: parentList.concat(parents)
        })
    }

    render() {
        const {selectIndex, teacherList, parentList} = this.state

        return (
            <div className='phone-select-root'>
                <div className='gray-line'></div>
                <div className='identity-select'>
                    <div className={selectIndex == 0 ?
                        'identity-item-select' : 'identity-item-normal'}
                         onClick={this.onTeacherClick}>老师
                    </div>
                    <div className={selectIndex == 1 ?
                        'identity-item-select' : 'identity-item-normal'}
                         onClick={this.onParentClick}>家长
                    </div>
                </div>
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <List dataSource={teacherList} renderItem={
                                item => (
                                    <List.Item>
                                        <div className='phoneListItem'>
                                            <div
                                                className='phoneItemText'>{item}</div>
                                            <Icon type="right" theme="outlined"/>
                                        </div>
                                    </List.Item>
                                )}/>
                        </div>
                        <div className="swiper-slide">
                            <List dataSource={parentList} renderItem={
                                item => (
                                    <List.Item>
                                        <div className='phoneListItem'>
                                            <div
                                                className='phoneItemText'>{item}</div>
                                            <Icon type="right" theme="outlined"/>
                                        </div>
                                    </List.Item>
                                )}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    onTeacherClick = () => {
        this.setState({
            selectIndex: 0
        }, () => {
            mySwiper.slideTo(this.state.selectIndex, 300, false)
        })
    }

    onParentClick = () => {
        this.setState({
            selectIndex: 1
        }, () => {
            mySwiper.slideTo(this.state.selectIndex, 300, false)
        })
    }
}