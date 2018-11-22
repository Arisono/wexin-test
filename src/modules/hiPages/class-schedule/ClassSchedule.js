/**
*   Created by FANGlh on 2018/11/12 15:34.
*/

import React,{Component} from 'react';
import  './ClassSchedule.css';
import line_img from '../../../style/imgs/line_img.png';

function HSItem() {
    return(
            <div style={{marginTop:0,marginLeft:10}}>
                <img src={line_img} alt="" style={{width:2,height:25,marginLeft:12}}/>
                <div className="sch_hang_sty">
                    <div className="green_point"></div>
                    <div className="sch_time_sty">08:00–8:45</div>
                    <div className="sch_class_sty">体育</div>
                    <img className="teach_img" src={"https://upload-images.jianshu.io/upload_images/1131704-eb8f2d63ed00682d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"}alt=""/>
                    <div className="sch_teacher_sty">陈冠希</div>
                </div>
                {/*<img src={line_img} alt="" style={{width:2,height:15,marginLeft:12}}/>*/}
            </div>
    )
}
export default class ClassSchedule extends Component{
    componentWillMount() {
        document.title = '课程表'
    }
    constructor(){
        super();
        this.state = {
            Class_SchData:[1,2,3,4],
            CurDay:2
        }
    }
    render(){
        return(
            <div>
                <div className="header_days_sty">
                    <div onClick={this.selectDayClick.bind(this,1)} className="each_day_default" ><div className={this.state.CurDay == 1 ? "isday_click" : ''}>周一</div></div>
                    <div onClick={this.selectDayClick.bind(this,2)} className="each_day_default"><div className={this.state.CurDay == 2 ? "isday_click" : ''}>周二</div></div>
                    <div onClick={this.selectDayClick.bind(this,3)} className="each_day_default"><div className={this.state.CurDay == 3 ? "isday_click" : ''}>周三</div></div>
                    <div onClick={this.selectDayClick.bind(this,4)} className="each_day_default"><div className={this.state.CurDay == 4 ? "isday_click" : ''}>周四</div></div>
                    <div onClick={this.selectDayClick.bind(this,5)} className="each_day_default"><div className={this.state.CurDay == 5 ? "isday_click" : ''}>周五</div></div>
                </div>
                {/*<div className="comhline_sty1"></div>*/}
                {/*<div style={{fontSize:14,color:"#333333",margin:20}}>11月12日，<span style={{fontSize:12}}>2018年</span></div>*/}
                <div className="scheedule_sty1">
                    <div style={{color:"#333333",fontSize:14,marginBottom:10,marginTop:10}}>上午</div>
                    <div className="comhline_sty1" style={{marginBottom:10}}></div>
                    <div>
                        {this.state.Class_SchData.map((itemata,index) => <HSItem key ={index} itemata = {itemata} handelSItem={this.handelSItem}></HSItem>)}
                    </div>
                </div>

                <div className="comhline_sty"></div>

              <div className="scheedule_sty1">
                    <div style={{color:"#333333",fontSize:14,marginBottom:10,marginTop:10}}>下午</div>
                    <div className="comhline_sty1" style={{marginBottom:10}}></div>
                  <div>
                      {this.state.Class_SchData.map((itemata,index) => <HSItem key ={index} itemata = {itemata} handelSItem={this.handelSItem}></HSItem>)}
                  </div>
              </div>
            </div>
        )
    }

    selectDayClick = (value)=>{
        console.log("value",value)
        this.setState({
            CurDay:value
        })
    }
}