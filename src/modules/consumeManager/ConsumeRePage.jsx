import React, {Component} from 'react'
import ConsumeBean from 'model/ConsumeBean'
import {List} from 'antd'
import ConsumeReItem from "../../components/ConsumeReItem";
import 'css/consume-re.css'
import {isObjEmpty} from "../../utils/common";

export default class PhonesList extends Component {

    constructor() {
        super()

        this.state = {
            consumeList: [],
            typeTitle: ''
        }
    }

    componentDidMount() {
        document.title = '消费记录'

        for (let i = 0; i < 20; i++) {
            let consumeBean = new ConsumeBean()
            consumeBean.chargeName = '线上充值'+i
            consumeBean.chargeTime = '2018-08-01 12:20:23'+i*i
            consumeBean.chargeAmount = '+200000'+i

            this.state.consumeList.push(consumeBean)
        }

        this.setState({
            consumeList: this.state.consumeList
        })
    }

    render() {
        const {consumeList, typeTitle} = this.state

        return (
            <div className='consume-select-root'>
                <div className={isObjEmpty(typeTitle) ? 'displayNone' : 'consume-list-header'}>{typeTitle}</div>
                <div className={isObjEmpty(typeTitle) ? 'displayNone' : 'gray-line'}></div>
                <List className='phones-list-layout' dataSource={consumeList} renderItem={consumeBean => (
                    <List.Item>
                        <ConsumeReItem consumeBean={consumeBean}/>
                    </List.Item>
                )}/>
            </div>
        )
    }}