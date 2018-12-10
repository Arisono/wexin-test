/**
*   Created by FANGlh on 2018/11/12 18:19.
*/

import React,{Component} from 'react';
import './ScoreInquiry.css';
import { Select  } from 'antd';
import ScoreData from './ScoreData';
import {fetchPost,fetchGet,fetchGetNoSession} from '../../../utils/fetchRequest';
import {API} from '../../../configs/api.config';
import {Toast} from 'antd-mobile';

const Option = Select.Option;

export default class ScoreInquiry extends Component{
    constructor(){
        super();
        this.state = {
            selectClass:null,
            selectTime:null,
            ScoreDataList:[1,2,3,4,5,6,7,8,9]
        }
    }
    render(){
        return(
            <div className="this_contaior" >
               <div className="header_select_sty">
                   <div style={{width:"50%",}}>
                       <Select defaultValue="单科查询-请选择" style={{ width:'100%',height:40 }} onChange={this.handleSelectClass}>
                           <Option value="5" >单科-语文</Option>
                           <Option value="15">单科-数学</Option>
                           <Option value="25">单科-英语</Option>
                           <Option value="35">单科-体育</Option>
                       </Select>
                   </div>
                   <div style={{width:"50%"}}>
                       <Select defaultValue="阶段查询-请选择" style={{width:"100%",height:40}} onChange={this.handleSelectClass}>
                           <Option value="5">月考一</Option>
                           <Option value="15">期中考试</Option>
                           <Option value="25">月考二</Option>
                           <Option value="35">期末考试</Option>
                       </Select>
                   </div>
               </div>

                <div style={{marginTop:40}}>
                    {this.state.ScoreDataList.map((itemata,index) => <ScoreData key={index} itemata = {itemata}></ScoreData>)}
                </div>
            </div>
        )
    }

    handleSelectClass =(value) =>{
        console.log(`selected ${value}`);
        this.setState({
            selectClass:value
        })
    }
    handleSelectClass =(value) =>{
        console.log(`selected ${value}`);
        this.setState({
            selectTime:value
        })
    }
    componentWillMount() {
        document.title = '成绩查询'
    }
    componentDidMount() {
        let params = {
            stuId:10000,
            scoreDate:'',
            scoreName:'语文'
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
}