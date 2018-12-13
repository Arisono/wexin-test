/**
*   Created by FANGlh on 2018/11/12 20:13.
*/

import React,{Component} from 'react';
import './ScoreInquiry.css';
import moment from 'moment';

export default class ScoreData extends Component{
    componentWillMount() {
        document.title = '成绩查询'
    }
    constructor(props){
        super();
    }
    render(){

        return(
            <div className="score_data_sty">
                <div className="title_sty">{this.props.itemdata.title}</div>
                <div className="comhline_sty1"></div>
                <div className="left_sty1">
                    <div style={{width:"50%",margin:10}}>
                        <div style={{fontSize:11,color:"#333333",margin:10}}>考试时间:<span style={{color:"#666666",marginLeft:20}}>{moment(this.props.itemdata.scoreBasic.scoreDate).format('YYYY-MM-DD')}</span></div>
                        <div className="left_sty">姓名: <span className="right_sty">{this.props.itemdata.scoreBasic.stuName} </span></div>
                        <div className="left_sty">科目: <span className="right_sty">{this.props.itemdata.scoreBasic.scoreName}</span></div>
                        <div className="left_sty">满分: <span className="right_sty">{this.props.itemdata.scoreBasic.scoreTotal}</span></div>
                        <div className="left_sty">得分: <span className="right_sty">{this.props.itemdata.scoreBasic.scoreNum}</span></div>
                    </div>
                    <div style={{height:136,width:2,background:"#F2F2F2",marginTop:20}}></div>
                    <div style={{width:"50%",margin:10}}>
                        <div style={{fontSize:11,color:"#333333",margin:10}}>考试范围:<span style={{color:"#666666",marginLeft:20}}>{this.props.itemdata.scoreBasic.scoreScope}</span></div>
                        <div className="left_sty">班级排名: <span className="right_sty">{this.props.itemdata.classRank}</span></div>
                        <div className="left_sty">年级排名: <span className="right_sty">{this.props.itemdata.schoolRank}</span></div>
                        <div className="left_sty">班级平均分: <span className="right_sty">{this.props.itemdata.classAverage}</span></div>
                        <div className="left_sty">年级平均分: <span className="right_sty">{this.props.itemdata.schoolAverage}</span></div>
                    </div>
                </div>
            </div>
        )
    }
}