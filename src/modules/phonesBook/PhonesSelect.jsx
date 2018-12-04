/**
 * Created by RaoMeng on 2018/11/7
 * Desc: 通讯录首页
 */

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Swiper from 'swiper/dist/js/swiper'
import 'swiper/dist/css/swiper.min.css'
import 'css/phones.css'
import {List, Icon, Skeleton} from 'antd'
import PhonesItem from "components/PhonesItem";
import PhonesBean from 'model/PhonesBean'
import {fetchGet} from "../../utils/fetchRequest";
import {API} from "../../configs/api.config";
import {Toast} from "antd-mobile";
import RefreshLayout from "../../components/RefreshLayout";
import {getStrValue} from "../../utils/common";

let mySwiper

const mPageSize = 10
let mPageIndex = 0

export default class PhonesSelect extends Component {

    constructor() {
        super()

        this.state = {
            selectIndex: 0,
            teacherList: [],
            parentList: [],
            isPhonesLoading: true,
            isClassLoading: true,
            isRefreshing: false,
        }
    }

    componentDidMount() {
        document.title = '通讯录'
        const hei = this.state.height - ReactDOM.findDOMNode(this.contain).offsetTop;
        this.setState({
            height: hei
        })
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
        const {
            selectIndex, teacherList, parentList
            , isPhonesLoading, isClassLoading, isRefreshing, height
        } = this.state

        const teacherItems =
            <RefreshLayout
                refreshing={isRefreshing}
                onRefresh={this.getTeacherPhones}
                height={height}>
                <Skeleton loading={isPhonesLoading} active paragraph={{rows: 3}}>
                    <List className='phones-list-layout' dataSource={teacherList}
                          renderItem={phonesBean => (
                              <List.Item>
                                  <PhonesItem phonesBean={phonesBean}/>
                              </List.Item>
                          )}/>
                </Skeleton>
            </RefreshLayout>

        const parentItems = <Skeleton loading={isClassLoading} active paragraph={{rows: 3}}>
            <List dataSource={parentList} renderItem={
                (item, index) => (
                    <List.Item>
                        <div className='phoneListItem'
                             onClick={this.onParentItemClick.bind(this, index)}>
                            <div
                                className='phoneItemText'>{item.parentName + item.schName}</div>
                            <Icon type="right" theme="outlined"/>
                        </div>
                    </List.Item>
                )}/>
        </Skeleton>

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
                <div className="swiper-container"
                     ref={el => {
                         this.contain = el
                     }}>
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
                    parentList: parentList,
                    isPhonesLoading: false
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
        mPageIndex++
        console.log(mPageIndex)
        try {
            this.setState({
                isRefreshing: true
            })
        } catch (e) {

        }

        const {teacherList} = this.state
        if (mPageIndex === 1) {
            teacherList.length = 0
        }

        fetchGet(API.TEACHER_PHONES_LIST, {
            roleId: 3,
            pageIndex: mPageIndex,
            pageSize: mPageSize
        }).then(response => {
            Toast.hide();

            if (response && response.data && response.data.length > 0) {
                response.data.map((item, index) => {
                    let phoneBean = new PhonesBean()
                    phoneBean.name = getStrValue(item, 'userName')
                    phoneBean.phone = getStrValue(item, 'userPhone')
                    phoneBean.claName = getStrValue(item, 'schName')
                    phoneBean.children = ['']

                    teacherList.push(phoneBean)

                })
            } else {
                if (mPageIndex > 1) {
                    mPageIndex--
                }
            }

            this.setState({
                isClassLoading: false,
                isRefreshing: false,
            })

        }).catch(error => {
            Toast.hide();

            if (mPageIndex > 1) {
                mPageIndex--
            }
            this.setState({
                isRefreshing: false
            })
            if (typeof error === 'string') {
                Toast.fail(error, 2)
            }
        })
    }

    onParentItemClick = (index) => {
        const {parentList} = this.state
        let selectItem = parentList[index]
        this.props.history.push('/phonesList/teacher/' + selectItem.schId + '/' + selectItem.parentName + selectItem.schName)
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