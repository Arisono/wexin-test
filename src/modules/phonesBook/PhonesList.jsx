/**
 * Created by RaoMeng on 2018/11/8
 * Desc: 通讯录列表
 */

import React, {Component} from 'react'
import PhonesBean from 'model/PhonesBean'
import {List, Skeleton} from 'antd'
import PhonesItem from "../../components/PhonesItem";
import 'css/phones.css'
import {getStrValue, isObjEmpty} from "../../utils/common";
import {fetchGet} from "../../utils/fetchRequest";
import {API} from "../../configs/api.config";
import {Toast} from "antd-mobile";
import RefreshLayout from "../../components/RefreshLayout";


const mPageSize = 10
let mPageIndex = 0

export default class PhonesList extends Component {

    constructor() {
        super()

        this.state = {
            phonesList: [],
            classTitle: '',
            isLoading: true,
            isRefreshing: false,
        }
    }

    componentDidMount() {
        document.title = '通讯录'

        this.title = this.props.match.params.classTitle;
        this.mType = this.props.match.params.type
        if (this.props.match.params.classId) {
            this.classId = this.props.match.params.classId;
        } else {
            this.classId = 10001
        }
        if (this.title) {
            this.setState({
                classTitle: this.title
            })
        }

        Toast.loading('', 0)

        mPageIndex = 0
        this.loadPhones()
    }

    render() {
        const {phonesList, classTitle, isLoading, isRefreshing} = this.state

        return (
            <div className='phone-select-root'>
                <div className={isObjEmpty(classTitle) ? 'displayNone' : 'phones-list-header'}>{classTitle}</div>
                <div className={isObjEmpty(classTitle) ? 'displayNone' : 'gray-line'}></div>

                <RefreshLayout
                    refreshing={isRefreshing}
                    onRefresh={this.loadPhones}>
                    <Skeleton loading={isLoading} active paragraph={{rows: 3}}>
                        <List className='phones-list-layout'
                              dataSource={phonesList}
                              renderItem={phonesBean => (
                                  <List.Item>
                                      <PhonesItem phonesBean={phonesBean}/>
                                  </List.Item>
                              )}/>
                    </Skeleton>
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
                            phoneBean.name = getStrValue(item, 'userName')
                            phoneBean.claName = this.title
                            phoneBean.children = ['']

                            phoneBean.phone = getStrValue(item, 'UserPhone')
                            phonesList.push(phoneBean)
                        })
                    }
                } else if (this.mType == 'teacher') {
                    if (response.data.students && response.data.students.length > 0) {
                        response.data.students.forEach((item, index) => {
                            let phoneBean = new PhonesBean()
                            let phones = []
                            phoneBean.name = getStrValue(item, 'stuName')
                            phoneBean.claName = this.title

                            if (item.parents && item.parents.length > 0) {
                                item.parents.forEach((ite, ind) => {
                                    phoneBean.children.push(getStrValue(ite, 'userName'))
                                    phones.push(getStrValue(ite, 'userPhone'))
                                })
                            }

                            if (phones.length > 0) {
                                phoneBean.phone = phones[0]
                            }

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
                isLoading: false,
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
                isLoading: false,
                isRefreshing: false,
            })
        })
    }
}