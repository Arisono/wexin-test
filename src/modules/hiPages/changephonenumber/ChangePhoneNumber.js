/**
*   Created by FANGlh on 2019/1/16 14:18.
*   Desc: 更换手机号
*/

import React,{Component} from 'react';
import {connect} from 'react-redux';
import { Result, Icon, WhiteSpace } from 'antd-mobile';
import './ChangePhoneNumber.css';
import {Input,Button} from 'antd';
import {Toast} from 'antd-mobile';
import {fetchPost,fetchGet,fetchGetNoSession} from '../../../utils/fetchRequest';
import {API,_baseURL} from '../../../configs/api.config';
let mSeconds = 0;

 class ChangePhoneNumber extends Component{
   constructor(props){
        super(props);
        this.state = {
            phoneNumber:null,
            vCode:null,
            changeSuccess:false, //修改成功后显示视图
            sendCodeSuccess:false, //已点击过发送验证吗
            obtainText: '重新发送(59)',
        }
    }
     render(){
        return(
            <div className="common-column-layout" style={{height:"100vh",backgroundColor:"#F6F6F6"}} onChange={this.handelValueCom}>
                {
                    this.state.changeSuccess == false ?
                        <div style={{marginTop:20}}>
                            <div className="input_phone_number">
                                <div className="add_86">+86</div>
                                <div className="shu_xian"></div>
                                <input type="number" placeholder="请输入手机号码" className="textarea_sty" maxLength={11} ref='phoneNumber' value={this.state.phoneNumber}/>
                            </div>

                            <div className="input_phone_number">
                                <input type="number" placeholder="请输入验证码" className="textarea_sty" style={{width:'60%'}} maxLength={6} ref='vCode' value={this.state.vCode}/>
                                {
                                    this.state.sendCodeSuccess == false ?
                                        <div className="send_code handle_code" onClick={this.getvCode}> 发送验证码</div>
                                        :
                                        <div className="send_code_again handle_code">{this.state.obtainText}</div>
                                }
                            </div>
                        </div>
                        :
                        <div style={{textAlign:'center',marginTop:100}}>
                            <Icon type="check-circle"  style={{ fill: '#1F90E6',width:98,height:98}} />
                            <div style={{fontFamily:'PingFangSC-Regular',fontSize:18,color:'#323232',letterSpacing:2.25,marginTop:20}}>更换手机号成功</div>
                        </div>
                }

                {
                    this.state.changeSuccess == false ? <Button className='commonButton' type='primary' style={{margin: '35px'}}
                                                                onClick={this.doBindPhone}>绑定</Button> : ''
                }

            </div>
        )
    }
     doBindPhone = ()=>{
         console.log('state',this.state)
         if(this.state.phoneNumber == null || this.state.phoneNumber.trim().length < 11){
             Toast.show("请输入正确的手机号码")
             return
         }
         if(this.state.vCode == null || this.state.vCode.trim().length == 0){
             Toast.show("请输入正确的验证码")
             return
         }
         this.setState({
             changeSuccess:true
         })
         var params = {

         }
         fetchPost(API.oaCreate,{params},{})
             .then((response)=>{
                 console.log('response',response)
                 if(response.success){

                 }
             })
             .catch((error) =>{
                 console.log('error',error)
             })
     }
     getvCode = () =>{
         if(this.state.phoneNumber == null || this.state.phoneNumber.trim().length < 11){
             Toast.show("请输入正确的手机号码")
             return
         }
         Toast.loading('验证码获取中...', 0)
         this.setState({
             obtainText: '获取中'
         })

         var params = {
             userPhone:this.state.phoneNumber.trim()
         }
         fetchGet(API.SEND_CODE, params).then(response => {
             Toast.hide()
             if (response.success){
                 Toast.success('验证码已发送，请注意查收', 2)
                 mSeconds = 60
                 this.setState({
                     sendCodeSuccess:true,
                     obtainText: '重新发送(' + mSeconds + ')'
                 })
                 this.countdown()
             }else {
                 Toast.fail(response.data.message, 2)
             }
         }).catch(error => {
             Toast.hide()
             this.setState({
                 obtainText: '获取验证码'
             })
             Toast.fail(error || '获取验证码失败', 2)
         })
     }
     countdown = () => {
         setTimeout(() => {
             if (mSeconds > 0) {
                 mSeconds--
                 this.setState({
                     obtainText: '重新发送(' + mSeconds + ')'
                 })
                 this.countdown()
             } else {
                 this.setState({
                     sendCodeSuccess:false,
                     obtainText: '重新发送(59)'
                 })
             }
         }, 1000)
     }
     handelValueCom = (event) => {
         //获取手机号
         let phoneNumber = this.refs.phoneNumber.value;
         //获得验证码
         let vCode = this.refs.vCode.value;
         this.setState({
             phoneNumber: phoneNumber,
             vCode:vCode
         })
     }
    componentWillMount() {
       document.title='更换手机号码'

    }
    componentDidMount() {

    }
}

let mapStateToProps = (state) => ({
    userInfo: {...state.redUserInfo}
})

let mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(ChangePhoneNumber)