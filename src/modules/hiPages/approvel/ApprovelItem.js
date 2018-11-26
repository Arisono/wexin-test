/**
*   Created by FANGlh on 2018/11/26 12:41.
*   Desc:
*/

import React,{Component} from 'react';
import './Approvel.css';
export default class ApprovelItem extends Component{
    constructor(props){
        super(props);
        this.state={
            itemData:{},
            type:this.props.type
        }
    }
    render(){

        return(
            <div className="item-Style" onClick={this.ItemClick.bind(this,this.state.type,this.props.itemata)}>
                <div style={{width:76,height:'100%'}}>
                    <img src={this.props.itemata.img} className={this.state.type==1?'img_sty':"img_circle"}/>
                </div>
                <div style={{width:'65%'}}>
                    <div style={{color:"#333333",fontSize:15,marginTop:10}}>{this.props.itemata.title}</div>
                    <div style={{color:"#666666",fontSize:12,marginTop:15}}>{this.props.itemata.date}</div>
                </div>
                <div className={this.props.itemata.statustype==1?'doing':'done'} style={{textAlign:'left',marginTop:10,fontSize:12}}>
                    {this.props.itemata.status}
                </div>
            </div>
        )
    }
    ItemClick =(type,data)=>{
        // console.log('type,data',type+'--'+data);
        if(type == 1){
            this.props.clickApplyItem(data)
        } else {
            this.props.clickApprovelItem(data)
        }
    }
}