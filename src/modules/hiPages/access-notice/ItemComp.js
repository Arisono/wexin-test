/**
*   Created by FANGlh on 2018/12/29 15:54.
*   Desc:
*/

import React,{Component} from 'react';
import './AccessNotice.css';
import line_img from '../../../style/imgs/line_img.png';
import enter_img from '../../../style/imgs/ic_enter.png';
import exit_img from '../../../style/imgs/ic_exit.png';
import moment from 'moment';


export default class ItemComp extends Component{
   constructor(props){
        super(props);
        this.state = {
            showTime1:this.props.itemdata.inDate==null ? this.props.itemdata.outDate : this.props.itemdata.inDate,
        }
    }
     render(){
        return(
            <div>
                <img className="lineimg_sty" src={line_img} alt=""/>
                <div className="timeList_sty">
                    {this.props.itemdata.inDate == null ? <img className="mg-circle out_in" src={exit_img} alt=""/> :
                        <img className="mg-circle out_in" src={enter_img} alt=""/>
                    }
                    <div style={{marginLeft:30}}>
                        <div style={{color:"#666666",fontSize:12}}>{this.state.showTime1}</div>
                        <div style={{color:"#333333",fontSize:12,marginTop:5}}>{this.props.itemdata.recordName}</div>
                    </div>
                </div>
            </div>
        )
    }
}