/**
*   Created by FANGlh on 2018/11/26 18:01.
*   Desc:
*/
import './ApprovelDetail.css';
import React,{Component} from 'react';
import hi2_img from '../../../style/imgs/ic_head2.png';
import line_img from '../../../style/imgs/line_img.png';

export default class ItemApprovel extends Component{
    constructor(props){
        super(props);
        this.state = {
            itemdata:this.props.itemdata
        }
    }
     render(){
        return(
            <div style={{marginLeft:20}}>
                <img className="lineimg_sty" src={line_img} alt=""/>
                <div className="timeList_sty">
                    <img className="img-circle out_in" src={hi2_img} alt=""/>
                    <div style={{marginLeft:30,width:"62%"}}>
                        <div style={{color:'#666666',fontSize:12}}>{this.props.approveDate}</div>
                        <div style={{color:"#666666",fontSize:15,marginTop:5}}>{this.props.itemdata.value }<span>{this.props.suggest.value==null?"":"("+this.props.suggest.value+")"}</span></div>
                    </div>
                    <div style={{fontSize:12,textAlign:'right'}} className={this.props.approveStatus == 1?'doing':'done'}>
                        {this.props.approveStatus == 1 ? '待审批' : (this.props.approveStatus == 2 ? '已审批' : '已拒绝')}</div>
                </div>
            </div>
        )
    }

}