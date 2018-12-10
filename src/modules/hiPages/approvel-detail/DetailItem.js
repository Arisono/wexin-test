/**
*   Created by FANGlh on 2018/11/26 17:02.
*   Desc:
*/

import React,{Component} from 'react';
import './ApprovelDetail.css';

function DetailItem2(props) {
    return(
       <div>
           <div style={{ display: 'flex',flexDirection:'row',fontsize:15,marginLeft:10,marginRight:10,marginTop:10}}>
               <span style={{width:"35%",textAlign:'left',color:'#666666'}}>{props.itemdata1[0].key}</span>
               <span  style={{width:"65%",textAlign:'right',color:'#333333'}}>{props.itemdata1[0].value}</span>
           </div>
           <div style={{ display: 'flex',flexDirection:'row',fontsize:15,marginLeft:10,marginRight:10,marginTop:10}}>
               <span style={{width:"35%",textAlign:'left',color:'#666666'}}>{props.itemdata1[1].key}</span>
               <span  style={{width:"65%",textAlign:'right',color:'#333333'}}>{props.itemdata1[1].value}</span>
           </div>
           <div className='comhline_sty'></div>
       </div>
    )
}
export default class DetailItem extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }
     render(){
        return(
            <div >
                {this.props.itemdata.key == '物品明细'?
                        <div>
                            {this.props.itemdata.value.map((itemdata1,index) =>
                                <DetailItem2 index = {index} itemdata1 = {itemdata1}></DetailItem2>
                            )}
                        </div> :<div>
                        <div style={{ display: 'flex',flexDirection:'row',fontsize:15,marginLeft:10,marginRight:10,marginTop:10}}>
                            <span style={{width:"35%",textAlign:'left',color:'#666666'}}>{this.props.itemdata.key}</span>
                            <span  style={{width:"65%",textAlign:'right',color:'#333333'}}>{this.props.itemdata.value}</span>
                        </div>
                        <div className="comhline_sty1"></div>
                    </div>
                }
            </div>
        )
    }

}