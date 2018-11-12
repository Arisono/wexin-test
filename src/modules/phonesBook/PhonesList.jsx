/**
 * Created by RaoMeng on 2018/11/8
 * Desc: 通讯录列表
 */

import React, {Component} from 'react'
import PhonesBean from 'model/PhonesBean'
import {List} from 'antd'
import PhonesItem from "../../components/PhonesItem";
import 'css/phones.css'
import {isObjEmpty} from "../../utils/common";

export default class PhonesList extends Component {

    constructor() {
        super()

        this.state = {
            phonesList: [],
            classTitle: ''
        }
    }

    componentDidMount() {
        document.title = '通讯录'

        let title = this.props.match.params.classTitle;
        if (title) {
            this.setState({
                classTitle: title
            })
        }

        for (let i = 0; i < 20; i++) {
            let phoneBean = new PhonesBean()
            phoneBean.name = '饶老师'
            phoneBean.phone = '13632423333'
            phoneBean.gradeClass = title
            phoneBean.children = [
                '语文', '数学','语文', '数学'
            ]

            this.state.phonesList.push(phoneBean)
        }

        this.setState({
            phonesList: this.state.phonesList
        })
    }

    render() {
        const {phonesList, classTitle} = this.state

        return (
            <div className='phone-select-root'>
                <div className={isObjEmpty(classTitle)?'displayNone':'phones-list-header'}>{classTitle}</div>
                <div className={isObjEmpty(classTitle)?'displayNone':'gray-line'}></div>
                <List className='phones-list-layout' dataSource={phonesList} renderItem={phonesBean => (
                    <List.Item>
                        <PhonesItem phonesBean={phonesBean}/>
                    </List.Item>
                )}/>
            </div>
        )
    }
}