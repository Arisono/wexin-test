/**
*   Created by FANGlh on 2018/11/26 18:01.
*   Desc:
*/
import './ApprovelDetail.css';
import React,{Component} from 'react';
import hi_img from '../../../style/imgs/hiimg.png';
import line_img from '../../../style/imgs/line_img.png';

export default class ItemApprovel extends Component{
    constructor(props){
        super(props);
        this.state = {
            itemData:this.props.itemdata
        }
    }
     render(){
        const {itemData} = this.state
        return(
            <div style={{marginLeft:20}}>
                <img className="lineimg_sty" src={line_img} alt=""/>
                <div className="timeList_sty">
                    <img className="img-circle out_in" src={itemData.img} alt=""/>
                    <div style={{marginLeft:30,width:"62%"}}>
                        <div style={{color:"#666666",fontSize:15,color:'#000'}}>{itemData.name} </div>
                        <div style={{color:'#666666',fontSize:12,marginTop:5}}>{itemData.date}</div>
                    </div>
                    <div style={{fontSize:12,textAlign:'right'}} className={itemData.statustype==1?'doing':'done'}>{itemData.status}</div>
                </div>
            </div>
        )
    }

}