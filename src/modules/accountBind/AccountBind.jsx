import React, {Component} from 'react'
import 'css/account-bind.css'
import {Avatar, Input, Icon, Button} from 'antd'

let mType = 'parents'

export default class AccountBind extends Component {

    componentWillMount() {
        if (this.props.match.params.type) {
            mType = this.props.match.params.type
        }

        if (mType == 'parents') {
            document.title = '家长端绑定'
        } else if (mType == 'teacher') {
            document.title = '教职工端绑定'
        }
    }

    constructor() {
        super()
        this.state = {
            account: '',
            phone: '',
            code: ''
        }
    }

    render() {
        const {account, phone, code} = this.state

        const idClear = account ? <Icon type="close-circle"
                                        onClick={this.accountEmpty}
                                        style={{color: 'white'}}/> : null;
        const phoneClear = phone ? <Icon type="close-circle"
                                         onClick={this.phoneEmpty}
                                         style={{color: 'white'}}/> : null;
        const codeClear = phone ? <Icon type="close-circle"
                                        onClick={this.codeEmpty}
                                        style={{color: 'white'}}/> : null;
        const idIcon = <img src={require('imgs/ic_account_input.png')} className='inputIcon1'/>
        const phoneIcon = <img src={require('imgs/ic_phone_input.png')} className='inputIcon2'/>
        const codeIcon = <img src={require('imgs/ic_code_input.png')} className='inputIcon3'/>

        const obtainCode = <div className='obtainCode'>获取验证码</div>

        return (
            <div className='bindParent'>
                <Avatar icon='user' size={65}/>
                <Input placeholder='编号' prefix={idIcon} suffix={idClear}
                       ref={input => this.accountInput = input} onChange={this.accountChange}
                       value={account} type='number' onKeyPress={this.phoneKeyPress}/>
                <Input placeholder='手机号' prefix={phoneIcon} suffix={phoneClear}
                       ref={input => this.phoneInput = input} onChange={this.phoneChange}
                       value={phone} type='number' onKeyPress={this.phoneKeyPress}
                       addonAfter={obtainCode}/>
                <Input placeholder='短信验证码' prefix={codeIcon} suffix={codeClear}
                       ref={input => this.codeInput = input} onChange={this.codeChange}
                       value={code} type='number' onKeyPress={this.phoneKeyPress}/>
                <div>

                </div>

                <Button type="primary" block style={{marginTop: '32px'}}>绑定</Button>
            </div>
        );
    }

    phoneKeyPress = (event) => {
        const invalidChars = ['-', '+', 'e', '.', 'E']
        if (invalidChars.indexOf(event.key) !== -1) {
            event.preventDefault()
        }
    }

    accountChange = (e) => {
        this.setState({
            account: e.target.value
        })
    }

    phoneChange = (e) => {
        this.setState({
            phone: e.target.value
        })
    }

    codeChange = (e) => {
        this.setState({
            code: e.target.value
        })
    }

    accountEmpty = () => {
        this.accountInput.focus()
        this.setState({
            account: ''
        })
    }

    phoneEmpty = () => {
        this.phoneInput.focus()
        this.setState({
            phone: ''
        })
    }

    codeEmpty = () => {
        this.codeINput.focus()
        this.setState({
            code: ''
        })
    }
}