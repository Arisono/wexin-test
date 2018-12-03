/**
 * Created by RaoMeng on 2018/11/8
 * Desc: 通讯录列表
 */

import React, {Component} from 'react'
import PhonesBean from 'model/PhonesBean'
import {List, Skeleton} from 'antd'
import PhonesItem from "../../components/PhonesItem";
import 'css/phones.css'
import {isObjEmpty} from "../../utils/common";
import {fetchGet} from "../../utils/fetchRequest";
import {API} from "../../configs/api.config";
import {Toast} from "antd-mobile";

export default class PhonesList extends Component {

    constructor() {
        super()

        this.state = {
            phonesList: [],
            classTitle: '',
            isLoading: true,
        }
    }

    componentDidMount() {
        document.title = '通讯录'

        this.title = this.props.match.params.classTitle;
        this.classId = this.props.match.params.classId;
        if (this.title) {
            this.setState({
                classTitle: this.title
            })
        }

        Toast.loading('', 0)
        this.getParentPhones()
    }

    render() {
        const {phonesList, classTitle, isLoading} = this.state

        return (
            <div className='phone-select-root'>
                <div className={isObjEmpty(classTitle) ? 'displayNone' : 'phones-list-header'}>{classTitle}</div>
                <div className={isObjEmpty(classTitle) ? 'displayNone' : 'gray-line'}></div>
                <Skeleton loading={isLoading} active paragraph={{rows: 3}}>
                    <List className='phones-list-layout'
                          dataSource={phonesList}
                          renderItem={phonesBean => (
                              <List.Item>
                                  <PhonesItem phonesBean={phonesBean}/>
                              </List.Item>
                          )}/>
                </Skeleton>
            </div>
        )
    }

    getParentPhones = () => {

        fetchGet(API.getParentPhones, {
            schId: this.classId,
        }).then(response => {
            Toast.hide();

            response.data.map((item, index) => {
                let phoneBean = new PhonesBean()
                let phones = []
                phoneBean.name = item.stuName
                phoneBean.claName = this.title

                item.parents.map((ite, ind) => {
                    phoneBean.children.push(ite.userName)
                    phones.push(ite.userPhone)
                })

                if (phones.length > 0) {
                    phoneBean.phone = phones[0]
                }

                this.state.phonesList.push(phoneBean)
            })

            this.setState({
                phonesList: this.state.phonesList,
                isLoading: false,
            })
        }).catch(error => {
            Toast.hide()
            if (typeof error === 'string') {
                Toast.fail(error, 2)
            } else {
                Toast.fail('请求异常')
            }

            this.setState({
                phonesList: this.state.phonesList,
                isLoading: false,
            })
        })
    }
}