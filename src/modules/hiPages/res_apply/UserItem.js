/**
*   Created by FANGlh on 2018/11/14 17:36.
*   Desc:
*/

import React,{Component} from 'react';
import './ResApply.css';

export default class UserItem extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div onChange={this.handelValueCom}>
                <div className="res_detail">物品明细({this.props.index+1})</div>
                <div className="item_sty">
                    <div className="left_title">物品用途</div>
                    <input  ref='itemuser'  className="text-right right_input" type="text" placeholder="请输入"  value={this.props.itemata.res_user} />
                </div>
                <div className="comhline_sty1"></div>
                <div className="item_sty">
                    <div className="left_title">数量</div>
                    <input   ref='itemnumber' className="text-right right_input" type="number" placeholder="请输入" value={this.props.itemata.res_number} />
                </div>
                <div className="comhline_sty1"></div>
            </div>
        )
    }
    handelValueCom = (event)=>{
        //请输入选项内容
        let itemuser = this.refs.itemuser.value;
        let itemnumber = this.refs.itemnumber.value;
        // console.log('itemuser',itemuser)
        // console.log('itemnumber',itemnumber)
        this.props.handelRItem({
            res_user:itemuser,
            res_number:itemnumber
        },this.props.index)
    }
}