/**
*   Created by FANGlh on 2018/11/13 18:24.
*/

import React,{Component} from 'react';
import { Icon} from 'antd';

export default class SelectItem extends Component{

    constructor(props){
        super(props);
        this.state = {
            itemata:''
        }
    }
    render(){
        const itemClear = this.props.itemata ? <Icon type="close-circle"
                                        onClick={this.itemEmpty(this,this.props.index)}
                                        style={{color: 'white'}}/> : null;
        return(
            <div onChange={this.handelValueCom}>
                <input  ref='itemContent'  type="text" placeholder="请输入选项内容" value={this.props.itemata == null ? '' : this.props.itemata} className="select_item_sty" suffix={itemClear}/>
                <div className="comhline_sty1"></div>
            </div>
        )
    }
        itemEmpty =(index)=> {
            this.props.removeSItem(this.props.index)
        }
        handelValueCom = (event)=>{
            //请输入选项内容
            let itemContent = this.refs.itemContent.value;
            console.log('itemContent',itemContent)
            this.props.handelSItem(itemContent,this.props.index)
        }
}