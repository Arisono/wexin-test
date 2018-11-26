/**
*   Created by FANGlh on 2018/11/26 17:02.
*   Desc:
*/

import React,{Component} from 'react';

export default class DetailItem extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }
     render(){
        return(
            <div style={{ display: 'flex',flexDirection:'row',fontsize:15,marginLeft:10,marginRight:10,marginTop:10}}>
                <span style={{width:"35%",textAlign:'left',color:'#666666'}}>{this.props.itemdata.key}</span>
                <span  style={{width:"65%",textAlign:'right',color:'#333333'}}>{this.props.itemdata.value}</span>
            </div>
        )
    }

}