/**
 * Created by RaoMeng on 2018/11/14
 * Desc: 缴费发布
 */

import React, {Component} from 'react'
import {Input, Button} from 'antd'
import {Picker, InputItem, DatePicker, List, Toast} from 'antd-mobile'
import 'css/payment.css'
import {API} from 'api'
import TargetSelect from 'components/TargetSelect'
import {fetchPost} from "../../utils/fetchRequest";

const {TextArea} = Input

const teacherData = []
const parentData = []

for (let i = 1; i < 6; i++) {
    parentData.push({
        title: `三年级${i}班`,
        value: `0-${i}`,
        key: `0-${i}`,
        children: [{
            title: `饶猛`,
            value: `0-${i}-0`,
            key: `0-${i}-0`
        }, {
            title: `李泞`,
            value: `0-${i}-1`,
            key: `0-${i}-1`,
        }, {
            title: `章晨望`,
            value: `0-${i}-2`,
            key: `0-${i}-2`,
        }],
    })
}

const targetData = [
    {
        title: `全体家长`,
        value: `0`,
        key: `0`,
        children: parentData,
    },
    {
        title: `全体老师`,
        value: `1`,
        key: `1`,
        children: teacherData,
    }
]

for (let i = 1; i < 10; i++) {
    teacherData.push({
        title: `老师${i}`,
        value: `1-${i}`,
        key: `1-${i}`,
    })
}

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

export default class RechargeRelease extends Component {

    constructor() {
        super()

        this.state = {
            typeList: [],
            classText: '',
            remarks: '',
            endTime: now,
            targetList: ['1-1'],
            targetCount: 1
        }
    }

    componentDidMount() {
        document.title = '缴费发布'

        const {typeList} = this.state

        typeList.push({
            label: '学校收费',
            value: '学校收费'
        })
        typeList.push({
            label: '班级收费',
            value: '班级收费'
        })
        typeList.push({
            label: '学杂费',
            value: '学杂费'
        })
        typeList.push({
            label: '书本费',
            value: '书本费'
        })

        this.setState({typeList: typeList})
    }

    componentWillUnmount() {
        Toast.hide()
    }

    render() {
        const {typeList, classText, remarks, targetCount, targetList} = this.state

        const targetProps = {
            targetData: targetData,
            targetValues: targetList,
            title: '收款对象',
            targetCount: targetCount,
            onTargetChange: this.onTargetChange.bind(this)
        }

        return (
            <div className='common-column-layout'>
                <div className='gray-line'></div>
                <TargetSelect {...targetProps}/>
                <div className='gray-line'></div>
                <Picker
                    data={typeList} title='收款类型' extra='请选择'
                    value={classText} onChange={this.handleClassChange}
                    onOk={this.handleClassChange} cols={1}>
                    <List.Item arrow="horizontal">收款类型</List.Item>
                </Picker>
                <div className='gray-line'></div>
                <div className='recharge-release-money-title'>人均收款金额</div>
                <div className='recharge-release-amount-layout'>
                    <div className='recharge-release-amount-caption'>￥</div>
                    <InputItem
                        className='recharge-release-amount-input'
                        type='money' clear
                        moneyKeyboardAlign='left'
                        placeholder='请输入金额'
                        onChange={this.amountChange}/>
                </div>
                <TextArea className='remarks-input' placeholder='请输入备注'
                          autosize={{minRows: 4, maxRows: 8}} value={remarks}
                          onChange={this.remarksChange}/>
                <div className='gray-line'></div>
                <DatePicker
                    value={this.state.endTime}
                    onChange={this.onDateChange}>
                    <List.Item arrow="horizontal">截止时间</List.Item>
                </DatePicker>
                <div className='gray-line'></div>

                <Button type='primary'
                        style={{margin: '35px'}}
                        className='commonButton'
                        onClick={this.onRechargeRelease}>发起收款</Button>
            </div>
        )
    }

    onRechargeRelease = () => {
        Toast.loading('正在发布...', 0)

        const {} = this.state

        const userList = ['10000', '10001', '10002', '10003']
        console.log(JSON.stringify(userList))
        fetchPost(API.PAYMENT_PAYFEE, {
            payName: '',
            payTotal: '',
            payStartDate: '',
            payEndDate: '',
            payStatus: 1,
            payRemarks: '',
            userId: 10001,
            stuIds: ''
        })
    }

    amountChange = (value) => {
        console.log(value)
    }

    onTargetChange = (value, label, checkNodes, count) => {
        this.setState({
            targetList: value,
            targetCount: count
        });
    }

    handleClassChange = (v) => {
        this.setState({classText: v})
    }

    remarksChange = e => {
        this.setState({
            remarks: e.target.value
        })
    }

    onDateChange = date => {
        console.log(date)
        this.setState({
            endTime: date
        })
    }

}

