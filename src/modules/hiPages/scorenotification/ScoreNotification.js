/**
*   Created by FANGlh on 2019/1/16 17:32.
*   Desc: 成绩通知
*/

import React,{Component} from 'react';
import '../score-inquiry/ScoreInquiry.css';
import { Select  } from 'antd';
import ScoreData from '../score-inquiry/ScoreData';
import {fetchPost,fetchGet,fetchGetNoSession} from '../../../utils/fetchRequest';
import {API} from '../../../configs/api.config';
import {Toast,Picker,List} from 'antd-mobile';
import {connect} from 'react-redux';


class ScoreNotification extends Component{
    constructor(){
        super();
        this.state = {
            selectClass:null,
            selectTime:null,
            ScoreDataList:[

            ],
            scoreNames:[],
            scoreTypes:[]
        }
    }
    render(){
        return(
            <div className="this_contaior" >
                    <div style={{width:'100%',height:10,backgroundColor:'#F2F2F2'}}></div>
                    <div>
                        {this.state.ScoreDataList.map((itemdata,index) => <ScoreData key={index} itemdata = {itemdata}></ScoreData>)}
                    </div>
            </div>
        )
    }
    getScoreData =(selectClas,selectTime)=>{
        let params = {
            // stuId:this.props.userInfo.stuId,
            stuId:10003,
            scoreType:selectTime,
            // scoreName:selectClas 语文
            scoreName:'语文',
        }
        fetchGet(API.getScoreByStuId,params,{})
            .then((response)=>{
                console.log('response',response)
                if(response.success && response.data[0].schoolAverage !=  "NaN"){
                    this.setState({
                        ScoreDataList:response.data
                    })
                }else {
                    Toast.fail('暂无数据', 2)
                    this.setState({
                        ScoreDataList:[]
                    })
                }
            }).catch((error) =>{
            console.log('error',error)
            this.setState({
                ScoreDataList:[]
            })
            if (typeof error === 'string') {
                Toast.fail(error, 2)
            } else {
                Toast.fail('请求异常', 2)
            }
        })
    }

    componentWillMount() {
        document.title = '成绩通知'
    }
    componentDidMount() {
        let params = {
            stuId:this.props.userInfo.stuId
        }
        fetchGet(API.getCurr,params,{})
            .then((response)=>{
                console.log('response',response)
                if(response.success ){
                    this.setState({
                        scoreNames:response.data.scoreNames,
                        scoreTypes:response.data.scoreTypes
                    })
                    return
                    const scoreNames = []
                    const scoreTypes = []
                    if(response.data.scoreNames){
                        response.data.scoreNames.forEach((value,index) =>{
                            const item = {}
                            item.value = response.data.scoreNames[index]
                            item.label = response.data.scoreNames[index]
                            scoreNames.push(item)
                        })
                    }
                    if(response.data.scoreTypes){
                        response.data.scoreTypes.forEach((value,index) =>{
                            const item = {}
                            item.value = response.data.scoreTypes[index]
                            item.label = response.data.scoreTypes[index]
                            scoreTypes.push(item)
                        })
                    }
                    console.log('scoreNames',scoreNames)
                    console.log('scoreTypes',scoreTypes)
                    this.setState({
                        scoreNames:scoreNames,
                        scoreTypes:scoreTypes
                    })
                }
            })
            .catch((error) =>{
                console.log('error',error)
                if (typeof error === 'string') {
                    Toast.fail(error, 2)
                } else {
                    Toast.fail('请求异常', 2)
                }
            })

        this.getScoreData(null,null)
    }
}

let mapStateToProps = (state) => ({
    userInfo: {...state.redUserInfo}
})

let mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(ScoreNotification)