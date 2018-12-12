/**
*   Created by FANGlh on 2018/11/12 18:19.
*/

import React,{Component} from 'react';
import './ScoreInquiry.css';
import { Select  } from 'antd';
import ScoreData from './ScoreData';
import {fetchPost,fetchGet,fetchGetNoSession} from '../../../utils/fetchRequest';
import {API} from '../../../configs/api.config';
import {Toast,Picker,List} from 'antd-mobile';
const Option = Select.Option;
function OptionS(props) {
    return(
        <div>
            <Option >单科-{props.itemdata}</Option>
        </div>
    )
}
export default class ScoreInquiry extends Component{
    constructor(){
        super();
        this.state = {
            selectClass:null,
            selectTime:null,
            ScoreDataList:[1,2,3,4,5,6,7,8,9],
            scoreNames:[],
            scoreTypes:[]
        }
    }
    render(){
        return(
            <div className="this_contaior" >
               <div className="header_select_sty">
                   <div style={{width:"50%",}}>
                       <Select defaultValue="单科查询-请选择" style={{ width:'100%'}} onChange={this.handleSelectClass}>
                           <Option value={null} >清空</Option>
                           <Option value={this.state.scoreNames[0]} >{this.state.scoreNames[0]}</Option>
                           <Option value={this.state.scoreNames[1]} >{this.state.scoreNames[1]}</Option>
                           <Option value={this.state.scoreNames[2]} >{this.state.scoreNames[2]}</Option>
                           <Option value={this.state.scoreNames[3]} >{this.state.scoreNames[3]}</Option>
                           <Option value={this.state.scoreNames[4]} >{this.state.scoreNames[4]}</Option>
                           <Option value={this.state.scoreNames[5]} >{this.state.scoreNames[5]}</Option>
                           <Option value={this.state.scoreNames[6]} >{this.state.scoreNames[6]}</Option>
                           <Option value={this.state.scoreNames[7]} >{this.state.scoreNames[7]}</Option>
                           <Option value={this.state.scoreNames[8]} >{this.state.scoreNames[8]}</Option>
                           <Option value={this.state.scoreNames[9]} >{this.state.scoreNames[9]}</Option>
                           <Option value={this.state.scoreNames[10]} >{this.state.scoreNames[10]}</Option>
                       </Select>
                   </div>
                   <div style={{width:"50%"}}>
                       <Select defaultValue="阶段查询-请选择" style={{width:"100%"}} onChange={this.handleSelectTime}>
                           <Option value={null}>清空</Option>
                           <Option value={this.state.scoreTypes[0]} >{this.state.scoreTypes[0]}</Option>
                           <Option value={this.state.scoreTypes[1]} >{this.state.scoreTypes[1]}</Option>
                           <Option value={this.state.scoreTypes[2]} >{this.state.scoreTypes[2]}</Option>
                           <Option value={this.state.scoreTypes[3]} >{this.state.scoreTypes[3]}</Option>
                           <Option value={this.state.scoreTypes[4]} >{this.state.scoreTypes[4]}</Option>
                           <Option value={this.state.scoreTypes[5]} >{this.state.scoreTypes[5]}</Option>
                           <Option value={this.state.scoreTypes[6]} >{this.state.scoreTypes[6]}</Option>
                           <Option value={this.state.scoreTypes[7]} >{this.state.scoreTypes[7]}</Option>
                           <Option value={this.state.scoreTypes[8]} >{this.state.scoreTypes[8]}</Option>
                           <Option value={this.state.scoreTypes[9]} >{this.state.scoreTypes[9]}</Option>
                           <Option value={this.state.scoreTypes[10]} >{this.state.scoreTypes[10]}</Option>
                       </Select>
                   </div>
               </div>

                <div style={{marginTop:20}}>
                    <div style={{width:'100%',height:10,backgroundColor:'#F2F2F2'}}></div>
                    <div>
                        {this.state.ScoreDataList.map((itemata,index) => <ScoreData key={index} itemata = {itemata}></ScoreData>)}
                    </div>
                </div>
            </div>
        )
    }
    getScoreData =(selectClas,selectTime)=>{
        let params = {
            stuId:10000,
            scoreType:selectTime,
            scoreName:selectClas
        }
        fetchGet(API.getScoreByStuId,params,{})
            .then((response)=>{
                console.log('response',response)
                if(response.success){

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
    }
    handleSelectClass =(value) =>{
        console.log(`selected`,value);
        this.setState({
            selectClass:value
        },function () {
            this.getScoreData(this.state.selectClas,this.state.selectTime)
        })
    }
    handleSelectTime =(value) =>{
        console.log(`selected`,value);
        this.setState({
           selectTime:value
        },function () {
            this.getScoreData(this.state.selectClas,this.state.selectTime)
        })
    }
    componentWillMount() {
        document.title = '成绩查询'
    }
    componentDidMount() {
        let params = {
            stuId:10000
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
    }


}