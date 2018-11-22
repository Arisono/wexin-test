import React, {Component} from 'react'
import 'css/user-info.css'
import 'css/phones.css'

export default class UserInfo extends Component {

    static defaultProps = {
        userName: '王小明',
        identity: '教师',
        school: '广西科技大学',
        phone: '15915408583',
        id: '1665628',
    }

    constructor(props) {
        super(props);
        this.state = {
            userName: props.userName,
            identity: props.identity,
            school: props.school,
            phone: props.phone,
            id: props.id
        }
    }

    render() {
        return <div className={'user-column'}>
            {this.showUserInfo()}
            <span className={'lineMax'} style={{marginTop: 10}}/>
            {this.showLocation()}
            <span className={'lineMax'} style={{marginTop: 10}}/>
            <div  style={{padding: 10}} className='phones-item-top'>
                <text className='phones-item-name'>身份</text>
                <text className='phones-item-phone'>{this.state.identity}</text>
            </div>
            <span className={'lineMax'} />
            {this.showUserContact()}
        </div>
    }

    //显示顶部个人信息
    showUserInfo() {
        return <div className='user-row'>
            <img style={{borderRadius: 360}} width={50} height={50} onClick={this.onAvatarClick}
                 src={'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'}/>
            <span style={{marginLeft: 10}}>{this.state.userName}</span>
        </div>
    }

    //显示个人位置信息
    showLocation() {
        return <div className={'user-column'}>
            <div style={{padding: 10}} className='phones-item-top'>
                <text className='phones-item-name'>工号ID</text>
                <text className='phones-item-phone'>{this.state.id}</text>
            </div>
            <div style={{padding: 10}} className='phones-item-top'>
                <text className='phones-item-name'>所在学校</text>
                <text className='phones-item-phone'>{this.state.school}</text>
            </div>
        </div>
    }

    //显示个人联系方式
    showUserContact() {
        return <div className={'user-column'}>
            <div style={{padding: 10}} className='phones-item-top'>
                <text className='phones-item-name'>手机号码</text>
                <a href={'tel:' + this.state.phone} style={{display: 'flex', alignItems: 'center'}}>
                    <div className='phones-item-phone'>{this.state.phone}</div>
                    <div style={{textAlign: 'right'}}>
                        <img width={8} height={15} src={require('../../style/imgs/next_arrow.png')}/>
                    </div>
                </a>
            </div>
            <div onClick={this.passWordClick} style={{padding: 10}} className='phones-item-top'>
                <text className='phones-item-name'>登陆密码</text>
                <div style={{textAlign: 'right'}}>
                    <img width={8} height={15} src={require('../../style/imgs/next_arrow.png')}/>
                </div>
            </div>
            <div style={{padding: 10}} className='phones-item-top'>
                <text className='phones-item-name'>人脸照</text>
            </div>
        </div>
    }

    //头像点击事件
    onAvatarClick = (event) => {
        //TODO 点击头像
    }
    //点击密码
    passWordClick = (event) => {
        //TODO 点击密码
    }
}