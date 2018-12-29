/**
 * Created by RaoMeng on 2018/11/21
 * Desc: 选择对象组件
 */

import React, {Component} from 'react'
import {TreeSelect, Icon} from 'antd'
import {getCheckedNodes} from "../utils/common";
import PropTypes from 'prop-types';

const SHOW_PARENT = TreeSelect.SHOW_PARENT
const SHOW_CHILD = TreeSelect.SHOW_CHILD

export default class TargetSelect extends Component {


    static propTypes = {
        targetData: PropTypes.array.isRequired, //数据源
        targetValues: PropTypes.array.isRequired,//被选中的数据
        title: PropTypes.string,//标题
        targetCount: PropTypes.number, //被选中的数量
        multiple: PropTypes.bool
    }

    static defaultProps = {
        title: '选择对象',//标题
        targetCount: 0, //被选中的数量
        multiple: true
    }

    constructor() {
        super()
        // this.state = {
        //     targetData: []
        // }
    }

    componentDidMount() {
        // this.setState({
        //     targetData: this.props.targetData
        // })
    }

    componentWillUnmount() {

    }

    componentWillReceiveProps(nextProps) {
        // console.log('nextProps', JSON.stringify(nextProps.targetData))
        // this.setState({
        //     targetData: nextProps.targetData
        // })
    }

    render() {
        const {
            targetData, //数据源
            targetValues,//被选中的数据
            title,//标题
            targetCount, //被选中的数量
            multiple
        } = this.props

        const targetProps = {
            treeData: targetData,
            value: targetValues,
            onChange: this.onTargetChange,
            multiple: multiple,
            treeCheckable: multiple,
            showCheckedStrategy: SHOW_PARENT,
            searchPlaceholder: `请选择${title}`,
            style: {
                width: '100%',
            },
            allowClear: multiple,
            suffixIcon: (<Icon type="plus-circle" style={{color: '#4197FC', fontSize: '20px', marginTop: '-10px'}}/>)
        }
        return (
            <div>
                <div style={{padding: '12px'}}>
                    <span className='announce-release-target-title'>{title}</span>
                    <span className='announce-release-target-count'>(共{targetCount}人)</span>
                </div>
                <div className='announce-release-target-layout'>
                    <TreeSelect {...targetProps} onFocus={this.onTargetFocus}/>
                </div>
            </div>
        )
    }

    onTargetFocus = (e) => {
        if (this.props.onTargetFocus) {
            this.props.onTargetFocus(e)
        }
    }

    onTargetChange = (value, label, extra) => {
        let allCheckNodes = getCheckedNodes(extra)
        let count = allCheckNodes.count
        let checkNodes = allCheckNodes.checkedNodes

        this.props.onTargetChange(value, label, checkNodes, count)
    }
}