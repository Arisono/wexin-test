import React, {Component} from 'react'
import 'css/account-bind.css'
import {Avatar} from 'antd'

export default class BindMenu extends Component {

    componentDidMount() {
        document.title = '账号绑定'
    }

    render() {
        return (
            <div className='bindParent'>
                <Avatar icon='user'/>

            </div>
        );
    }
}