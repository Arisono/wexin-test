/**
 *   Created by FANGlh on 2018/11/13 18:24.
 */

import React, {Component} from 'react';
import {Icon} from 'antd';
import delete_img from '../../../style/imgs/delete.png';

export default class SelectItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            itemata: ''
        }
    }

    render() {
        return (
            <div onChange={this.handelValueCom}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <textarea rows="1" ref='itemContent' type="text"
                              placeholder="请输入选项内容" value={this.props.itemata == null ? '' : this.props.itemata}
                              className="textarea_sty" style={{resize: 'none', width: '90%'}}/>
                    {(this.props.index != 0 && this.props.index != 1) ?
                        <Icon type="minus-circle" style={{fontSize: '17px', color: '#ff0a0a'}}
                              onClick={this.itemEmpty}/> : ''}
                </div>
                <div className="comhline_sty1"></div>
            </div>
        )
    }

    itemEmpty = (index) => {
        console.log('index', index)
        this.props.removeSItem(this.props.index)
    }
    handelValueCom = (event) => {
        //请输入选项内容
        let itemContent = this.refs.itemContent.value;
        console.log('itemContent', itemContent)
        this.props.handelSItem(itemContent, this.props.index)
    }
}