/**
 * Created by RaoMeng on 2019/1/15
 * Desc: 通讯录搜索页面
 */

import React, {Component} from 'react'
import PhonesBean from 'model/PhonesBean'
import {getStrValue, isObjEmpty} from "../../utils/common";
import RefreshLayout from "../../components/RefreshLayout";
import PhonesItem from "../../components/PhonesItem";
import {Toast, SearchBar} from "antd-mobile";
import {List, Skeleton} from 'antd'
import {API} from "../../configs/api.config";
import {fetchGet} from "../../utils/fetchRequest";

const mPageSize = 10
let mPageIndex = 0

export default class PhonesSearch extends Component {

    constructor() {
        super()

        this.state = {
            isRefreshing: false,
            phonesList: []
        }
    }

    componentDidMount() {
        this.searchInput.focus()

        this.mType = this.props.match.params.type
        if (this.mType === 'teacher') {
            this.title = '搜索老师'
        } else if (this.mType === 'parent') {
            this.title = '搜索家长'
        }
        document.title = this.title
    }

    componentWillUnmount() {

    }

    render() {
        const {phonesList, isRefreshing} = this.state

        return (
            <div className='phone-select-root' style={{height: '100%'}}>
                <SearchBar placeholder="搜索家长" maxLength={20}
                           ref={ref => this.searchInput = ref}/>

                <RefreshLayout
                    refreshing={isRefreshing}
                    onRefresh={this.loadPhones}>
                    <List className='phones-list-layout'
                          dataSource={phonesList}
                          renderItem={phonesBean => (
                              <List.Item>
                                  <PhonesItem phonesBean={phonesBean}/>
                              </List.Item>
                          )}/>
                </RefreshLayout>
            </div>
        )
    }


    loadPhones = () => {
        try {
            this.setState({
                isRefreshing: true
            })
        } catch (e) {
        }

        if (this.mType == 'parent') {
            this.url = API.GET_TEACHER_PHONES
            this.params = {
                stuId: this.classId
            }
            this.getPhones()
        } else if (this.mType == 'teacher') {
            this.url = API.GET_PARENT_PHONES
            this.params = {
                schId: this.classId
            }
            this.getPhones()
        } else {
            Toast.hide()
            this.setState({
                isRefreshing: false
            })
        }
    }

    getPhones = () => {
        mPageIndex++
        console.log(mPageIndex)

        const {phonesList} = this.state
        if (mPageIndex === 1) {
            phonesList.length = 0
        }

        fetchGet(this.url, {
            pageIndex: mPageIndex,
            pageSize: mPageSize,
            ...this.params
        }).then(response => {
            Toast.hide();

            if (response && response.data) {
                if (this.mType == 'parent') {
                    if (response.data.teachers && response.data.teachers.length > 0) {
                        response.data.teachers.forEach((item, index) => {
                            let phoneBean = new PhonesBean()

                            phoneBean.icon = require('imgs/ic_head' + (index % 15 + 1) + '.png')
                            phoneBean.name = getStrValue(item, 'userName')
                            phoneBean.claName = this.title
                            phoneBean.children = ['']

                            phoneBean.phone = [getStrValue(item, 'UserPhone')]
                            phonesList.push(phoneBean)
                        })
                    }
                } else if (this.mType == 'teacher') {
                    if (response.data.students && response.data.students.length > 0) {
                        response.data.students.forEach((item, index) => {
                            let phoneBean = new PhonesBean()
                            let phones = []
                            phoneBean.icon = require('imgs/ic_head' + (index % 15 + 1) + '.png')
                            phoneBean.name = getStrValue(item, 'stuName')
                            phoneBean.claName = this.title

                            if (item.parents && item.parents.length > 0) {
                                item.parents.forEach((ite, ind) => {
                                    phoneBean.children.push(getStrValue(ite, 'userName'))
                                    phones.push(getStrValue(ite, 'userPhone'))
                                })
                            }

                            // if (phones.length > 0) {
                            phoneBean.phone = phones
                            // }

                            phonesList.push(phoneBean)
                        })
                    } else {
                        if (mPageIndex > 1) {
                            mPageIndex--
                        }
                    }
                }
            } else {
                if (mPageIndex > 1) {
                    mPageIndex--
                }
            }

            this.setState({
                phonesList,
                isRefreshing: false,
            })
        }).catch(error => {
            Toast.hide()

            if (mPageIndex > 1) {
                mPageIndex--
            }
            if (typeof error === 'string') {
                Toast.fail(error, 2)
            } else {
                Toast.fail('请求异常')
            }

            this.setState({
                isRefreshing: false,
            })
        })
    }
}
