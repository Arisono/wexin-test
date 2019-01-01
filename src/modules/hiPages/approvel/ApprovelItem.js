/**
*   Created by FANGlh on 2018/11/26 12:41.
*   Desc:
*/

import React,{Component} from 'react';
import './Approvel.css';
import icon_out from '../../../style/imgs/out_img.png';
import icon_res from '../../../style/imgs/res_img.png';
import icon_trip from '../../../style/imgs/trip_img.png';
import {Link} from 'react-router-dom';

export default class ApprovelItem extends Component{
    constructor(props){
        super(props);
        this.state={
            // imgheader:this.props.itemata.approveType == 1 ? icon_trip : (this.props.itemata.approveType == 2 ? icon_res : icon_out),
            isMyApply:props.isMyApply,
            // status:this.props.itemata.approveStatus == 1 ? "待审批" :"已审批"
        }
    }
    render(){

        return(
            <Link to={"/approvel-detail/" + this.props.itemata.approveId +"/"+this.props.isMyApply}>
                <div className="item-Style" onClick={this.ItemClick.bind(this,this.state.isMyApply,this.props.itemata)}>
                    <div style={{width:76,height:'100%'}}>
                        <img src={this.props.itemata.approveType == 1 ? icon_trip : (this.props.itemata.approveType == 2 ? icon_res : icon_out)} className={this.state.isMyApply==true?'img_sty':"img_circle"}/>
                    </div>
                    <div style={{width:'65%'}}>
                        <div style={{color:"#333333",fontSize:15,marginTop:10}}>
                            {this.props.itemata.approveType == 1 ? '出差申请' :  (this.props.itemata.approveType == 2 ? '用品申请' : '请假申请' )}
                        </div>
                        <div style={{color:"#666666",fontSize:12,marginTop:15}}>{this.props.itemata.creatDate}</div>
                    </div>
                    <div className={this.props.itemata.approveStatus==1?'doing':'done'} style={{textAlign:'left',marginTop:10,fontSize:12}}>
                        {this.props.itemata.approveStatus == 1 ? "待审批" :"已审批"}
                    </div>
                </div>
            </Link>
        )
    }
    ItemClick =(isMyApply,data)=>{
        // console.log('type,data',type+'--'+data);
        return
        if(isMyApply){
            this.props.clickApplyItem(data)
        } else {
            this.props.clickApprovelItem(data)
        }
    }
}