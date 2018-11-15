/**
 * Created by RaoMeng on 2018/11/14
 * Desc: 缴费发布
 */

import React, {Component} from 'react'
import {Icon, Input, Button, TreeSelect} from 'antd'
import {Picker, InputItem, DatePicker, List} from 'antd-mobile'
import 'css/payment.css'

const {TextArea} = Input

const SHOW_PARENT = TreeSelect.SHOW_PARENT
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
            classList: [],
            classText: '',
            remarks: '',
            endTime: now,
            date: now
        }
    }

    componentDidMount() {
        document.title = '缴费发布'


        const {classList} = this.state

        for (let i = 0; i < 10; i++) {
            if (i % 2 == 0) {
                classList.push({
                    label: '三年级（一）班',
                    value: '三年级（一）班'
                })
            } else {
                classList.push({
                    label: '三年级（二）班',
                    value: '三年级（二）班'
                })
            }
        }

        this.setState({classList})
    }

    render() {
        const {classList, classText, remarks, endTime, date} = this.state
        const targetProps = {
            treeData: targetData,
            value: this.state.targetList,
            onChange: this.onTargetChange,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            searchPlaceholder: '请选择发布对象',
            style: {
                width: '100%',
            },
            allowClear: true,
        }

        return (
            <div className='common-column-layout'>
                <div className='gray-line'></div>
                <Picker data={classList} title='选择班级' extra='请选择'
                        value={classText} onChange={this.handleClassChange}
                        onOk={this.handleClassChange} cols={1}>
                    <List.Item arrow="horizontal">选择班级</List.Item>
                </Picker>
                <div className='gray-line'></div>
                <div className='recharge-release-money-title'>人均收款金额</div>
                <div className='recharge-release-amount-layout'>
                    <div className='recharge-release-amount-caption'>￥</div>
                    <InputItem className='recharge-release-amount-input'
                               type='money' clear
                               moneyKeyboardAlign='left'
                               placeholder='请输入金额'></InputItem>
                </div>
                <TextArea className='remarks-input' placeholder='请输入备注'
                          autosize={{minRows: 4, maxRows: 8}} value={remarks}
                          onChange={this.remarksChange}/>
                <div className='gray-line'></div>
                <DatePicker
                    value={this.state.date}
                    onChange={date => this.setState({date})}>
                    <List.Item arrow="horizontal">截止时间</List.Item>
                </DatePicker>
                <div className='gray-line'></div>
                <div className='recharge-release-target-title'>收款对象</div>
                <div className='recharge-release-target-layout'>
                    {/*<div className='recharge-release-target-list'>王芷含 王芷含 王芷含 王芷含 王芷含</div>
                    <Icon type="plus-circle" style={{color: '#4197FC', fontSize: '22px'}}/>*/}
                    <TreeSelect {...targetProps} />
                </div>

                <Button type='primary' style={{margin: '35px'}} className='commonButton'>发起收款</Button>
            </div>
        )
    }

    onTargetChange = (value) => {
        console.log('onChange ', value);
        this.setState({targetList: value});
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
        this.setState({
            endTime: date
        })
    }

    formatDate = (date) => {
        const pad = n => n < 10 ? `0${n}` : n;
        const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
        const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
        return `${dateStr} ${timeStr}`;
    }
}