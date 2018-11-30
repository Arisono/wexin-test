/**
*   Created by FANGlh on 2018/11/13 18:24.
*/

import React,{Component} from 'react';
import { Icon} from 'antd';
import delete_img from '../../../style/imgs/delete.png';
export default class SelectItem extends Component{

    constructor(props){
        super(props);
        this.state = {
            itemata:''
        }
    }
    render(){
        return(
            <div onChange={this.handelValueCom}>
                <div style={{display:'flex',flexDirection:'row'}}>
                        <textarea style={{width:'90%'}}  rows="2" ref='itemContent'  type="text" placeholder="请输入选项内容" value={this.props.itemata == null ? '' : this.props.itemata} className="textarea_sty" />
                        <img src={delete_img} alt="" style={{height:30,width:30,marginTop:10,marginRight:10}} onClick={this.itemEmpty.bind(this,this.props.index)}/>
                </div>
                <div className="comhline_sty1"></div>
            </div>
        )
    }
        itemEmpty =(index)=> {
             console.log('index',index)
            this.props.removeSItem(this.props.index)
        }
        handelValueCom = (event)=>{
            //请输入选项内容
            let itemContent = this.refs.itemContent.value;
            console.log('itemContent',itemContent)
            this.props.handelSItem(itemContent,this.props.index)
        }
}