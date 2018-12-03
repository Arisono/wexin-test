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
import PhonesItem from "components/PhonesItem";
import PhonesBean from 'model/PhonesBean'
import {fetchGet} from "../../utils/fetchRequest";
import {API} from "../../configs/api.config";
import {Toast} from "antd-mobile";

let mySwiper

const mPageSize = 10
var mPageIndex = 0

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
        const {selectIndex} = this.state

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

        this.getTeacherPhones()
        this.getClassList()
    }

    render() {
        const {selectIndex, teacherList, parentList} = this.state

        const teacherItems = <List className='phones-list-layout' dataSource={teacherList}
                                   renderItem={phonesBean => (
                                       <List.Item>
                                           <PhonesItem phonesBean={phonesBean}/>
                                       </List.Item>
                                   )}/>

        const parentItems = <List dataSource={parentList} renderItem={
            (item, index) => (
                <List.Item>
                    <div className='phoneListItem'
                         onClick={this.onParentItemClick.bind(this, index)}>
                        <div
                            className='phoneItemText'>{item.schName}</div>
                        <Icon type="right" theme="outlined"/>
                    </div>
                </List.Item>
            )}/>

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
                            {teacherItems}
                        </div>
                        <div className="swiper-slide">
                            {parentItems}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    getClassList = () => {
        const {parentList} = this.state

        fetchGet(API.GET_CLASS_LIST, {
            userId: 10000,
        }).then(response => {
            Toast.hide();

            if (response && response.data) {
                response.data.map((item, index) => {
                    parentList.push(item)
                })

                this.setState({
                    parentList: parentList
                })
            }

        }).catch(error => {
            Toast.hide();

            if (typeof error === 'string') {
                Toast.fail(error, 2)
            }
        })
    }

    getTeacherPhones = () => {
        const {teacherList} = this.state

        fetchGet(API.getTeacherPhones, {
            stuId: 10000,
        }).then(response => {
            Toast.hide();

            response.data.map((item, index) => {
                let phoneBean = new PhonesBean()
                phoneBean.name = item.userName
                phoneBean.phone = item.UserPhone
                phoneBean.claName = item.schName
                phoneBean.children = ['']

                teacherList.push(phoneBean)

            })

            this.setState({
                isLoading: false,
                hasMoreData: false
            })

        }).catch(error => {
            Toast.hide();
            if (typeof error === 'string') {
                Toast.fail(error, 2)
            }
        })
    }

    onParentItemClick = (index) => {
        const {parentList} = this.state
        let selectItem = parentList[index]
        this.props.history.push('/phonesList/' + selectItem.schId + '/' + selectItem.schName)
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