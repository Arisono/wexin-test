/**
*   Created by FANGlh on 2018/11/14 17:36.
*   Desc:
*/

import React,{Component} from 'react';
import './ResApply.css';
import delete_img from '../../../style/imgs/delete.png';


export default class UserItem extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div onChange={this.handelValueCom}>
                <div style={{display:'flex',flexDirection:'row',backgroundColor:'#F2F2F2'}}>
                    <div className="res_detail">物品明细({this.props.index+1})</div>
                    <div>
                        <img src={delete_img} alt="" style={{height:20,width:20,marginRight:20}} onClick={this.deleteItem.bind(this,this.props.index)}/>
                    </div>
                </div>
                <div className="item_sty">
                    <div className="left_title">物品名称</div>
                    <input  ref='itemuser'  className="text-right right_input" type="text" placeholder="请输入"  value={this.props.itemata.artName} />
                </div>
                <div className="comhline_sty1"></div>
                <div className="item_sty">
                    <div className="left_title">数量</div>
                    <input   ref='itemnumber' className="text-right right_input" type="number" placeholder="请输入" value={this.props.itemata.artCount} />
                </div>
                <div className="comhline_sty1"></div>
            </div>
        )
    }
    deleteItem =(index)=> {
        console.log('index',index)
        this.props.removeSItem(this.props.index)
    }
    handelValueCom = (event)=>{
        //请输入选项内容
        let itemuser = this.refs.itemuser.value;
        let itemnumber = this.refs.itemnumber.value;
        // console.log('itemuser',itemuser)
        // console.log('itemnumber',itemnumber)
        this.props.handelRItem({
            artName:itemuser,
            artCount:itemnumber
        },this.props.index)
    }
}