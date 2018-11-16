import React, {Component} from 'react'
import NotifyBoBean from 'model/NotifyBoBean'
import 'css/consume-re.css'

export default class NotifyBoardItem extends Component {

    constructor() {
        super()

        this.state = {
            notifyBoBean: new NotifyBoBean()

        }
    }

    componentDidMount() {
        this.setState({
            notifyBoBean: this.props.notifyBoBean
        })
    }

    render() {
        const {notifyBoBean} = this.state
        return (
            <div className='notify-item-root'>
                <div className='notify-item-bg'>
                <div className = 'notify-item-top'>
                <div className='notify-item-title'>{notifyBoBean.noTitle}</div>
                    <div className='notify-item-statu'>{notifyBoBean.noStatu}</div>
                </div>
                    <div className='notify-item-line'></div>
                    <div className='notify-item-content'>{notifyBoBean.noContent}</div>
                    <div className='notify-item-issuer'>{notifyBoBean.noIssue}</div>
                    <div className='notify-item-time'>{notifyBoBean.noTime}</div>
            </div>
            </div>
        )
    }
}