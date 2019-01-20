/**
*   Created by FANGlh on 2019/1/19 12:32.
*   Desc:
*/

import React,{Component} from 'react';
import {Link} from 'react-router-dom';

export default class LeaveItem extends Component{
   constructor(props){
        super(props);
        this.state = {
            item:this.props.itemdata
        }
    }
     render(){
       const {item}  = this.state;
        return(
            <Link to={'/leavedetail/' +item.lvId+'/'+this.props.role}>
                <div className="col-xs-12 " >
                    <div className="row flex" >
                        <div id="global_page_title"  style={{fontSize:15,color:"#333333"}}>  {item.title}</div>
                        <div className="item_flex_1  flex_row_right margin_left_right_10">
                            {this.state.role==="parent"?(""):(<div>
                                {item.leaveMessages.length===0?<div style={{fontSize:12,color:"#FA5200"}}>未查阅</div>: <div style={{fontSize:12,color:"##686868"}}>已查阅</div>}
                            </div>)}
                        </div>
                    </div>
                    <div className="row ">
                        <div  className="col-xs-3" id="col-clear"   style={{fontSize:12,color:"#666666"}}>请假时间：</div>
                        <div  className="col-xs-9" id="col-clear-start"  style={{fontSize:12,color:"#333333"}}>{item.startTime}—{item.endTime}</div>
                    </div>
                    <div className="row " style={{marginTop:10,marginBottom:10}} >
                        <div  className="col-xs-3" id="col-clear"  style={{fontSize:12,color:"#666666"}}>请假事由：</div>
                        <div  className="col-xs-9" id="col-clear-start"  style={{fontSize:12,color:"#333333"}}>{item.content}</div>
                    </div>
                </div>
            </Link>
        )
    }
}