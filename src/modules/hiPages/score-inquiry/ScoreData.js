/**
*   Created by FANGlh on 2018/11/12 20:13.
*/

import React,{Component} from 'react';
import './ScoreInquiry.css';

export default class ScoreData extends Component{
    componentWillMount() {
        document.title = '成绩查询'
    }
    constructor(){
        super();
    }
    render(){
        return(
            <div className="score_data_sty">
                <div className="title_sty">三年级(2)班语文模拟考试</div>
                <div className="comhline_sty1"></div>
                <div className="left_sty1">
                    <div style={{width:"50%",margin:10}}>
                        <div style={{fontSize:11,color:"#333333",margin:10}}>考试时间 <span style={{color:"#666666",marginLeft:20}}>2018-9-10</span></div>
                        <div className="left_sty">姓名: <span className="right_sty">吴彦祖</span></div>
                        <div className="left_sty">科目: <span className="right_sty">粤语</span></div>
                        <div className="left_sty">满分: <span className="right_sty">100</span></div>
                        <div className="left_sty">得分: <span className="right_sty">99</span></div>
                    </div>
                    <div style={{height:136,width:2,background:"#F2F2F2",marginTop:20}}></div>
                    <div style={{width:"50%",margin:10}}>
                        <div style={{fontSize:11,color:"#333333",margin:10}}>考试范围 <span style={{color:"#666666",marginLeft:20}}>全年级</span></div>
                        <div className="left_sty">班级排名: <span className="right_sty">1</span></div>
                        <div className="left_sty">年级排名: <span className="right_sty">1</span></div>
                        <div className="left_sty">班级平均分: <span className="right_sty">80</span></div>
                        <div className="left_sty">年级平均分: <span className="right_sty">79</span></div>
                    </div>
                </div>
            </div>
        )
    }
}