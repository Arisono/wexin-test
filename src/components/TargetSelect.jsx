/**
 * Created by RaoMeng on 2018/11/21
 * Desc: 选择对象组件
 */

import React, {Component} from 'react'
import {TreeSelect} from 'antd'
import {getCheckedNodes} from "../utils/common";

const SHOW_PARENT = TreeSelect.SHOW_PARENT

export default class TargetSelect extends Component {

    constructor() {
        super()
    }

    componentDidMount() {
    }

    componentWillUnmount() {

    }

    render() {
        const {
            placeholder, targetData,
            targetValues,
            title, targetCount,
            style
        } = this.props

        const targetProps = {
            treeData: targetData,
            value: targetValues,
            onChange: this.onTargetChange,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            searchPlaceholder: placeholder,
            style:style,
            allowClear: true,
        }
        return (
            <div>
                <div style={{padding: '12px'}}>
                    <span className='announce-release-target-title'>{title}</span>
                    <span className='announce-release-target-count'>(共{targetCount}人)</span>
                </div>
                <div className='announce-release-target-layout'>
                    <TreeSelect {...targetProps}/>
                </div>
            </div>
        )
    }

    onTargetChange = (value, label, extra) => {
        let allCheckNodes = getCheckedNodes(extra)
        let count = allCheckNodes.count
        let checkNodes = allCheckNodes.checkedNodes

        this.props.onTargetChange(value, label, checkNodes, count)
    }
}