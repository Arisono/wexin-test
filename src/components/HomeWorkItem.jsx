/**
 * Created by RaoMeng on 2019/1/14
 * Desc: 作业列表item
 */

import React, {Component} from 'react'
import {isObjEmpty} from "../utils/common";
import 'css/homework.css'

export default class HomeWorkItem extends Component {

    constructor() {
        super()

        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        const {homeWork} = this.props

        return (
            <div style={{padding: '0 10px'}} onClick={this.onItemClick}>
                <div className='recharge-item-root'>
                    <div className='common-flex-row homework-item-title-layout'>
                        <div className='homework-item-title'>{homeWork.notifyName}</div>
                        <span className={homeWork.isRead === 1 ? 'homework-item-todo'
                            : 'homework-item-done'}>{homeWork.readStatus}</span>
                    </div>
                    <div className='gray-line' style={{height: '1px', marginBottom: '10px'}}></div>
                    <div className='recharge-item-line'>
                        <div className='recharge-item-caption'>内容：</div>
                        <div className='recharge-item-value'>{homeWork.notifyDetails}</div>
                    </div>
                    <div className='recharge-item-line'>
                        <div className='recharge-item-caption'>截止日期：</div>
                        <div className='recharge-item-value'>{homeWork.endDate}</div>
                    </div>
                    <div className='recharge-item-line'>
                        <div className='recharge-item-caption'>发布老师：</div>
                        <div className='recharge-item-value'>{homeWork.notifyCreatorName}</div>
                    </div>
                    <div className='recharge-item-line' style={{paddingBottom:'20px'}}>
                        <div className='recharge-item-caption'>发布时间：</div>
                        <div className='recharge-item-value'>{homeWork.creatDate}</div>
                    </div>
                </div>
            </div>
        )
    }

    onItemClick = () => {
        if (this.props.onItemClick) {
            this.props.onItemClick(this.props.index, this.props.homeWork.notifyId)
        }
    }
}