/**
*   Created by FANGlh on 2018/11/13 18:24.
*/

import React,{Component} from 'react';

export default class SelectItem extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div onChange={this.handelValueCom}>
                <textarea  ref='itemContent'  rows={1} type="text" placeholder="请输入选项内容" value={this.props.itemata} className="select_item_sty"/>
                <div className="comhline_sty1"></div>
            </div>
        )
    }
    handelValueCom = (event)=>{
        //请输入选项内容
        let itemContent = this.refs.itemContent.value;
        console.log('itemContent',itemContent)
        this.props.handelSItem(itemContent,this.props.index)
    }
}