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
                    <div className='notify-item-top'>
                        <div className='notify-item-title'>{notifyBoBean.noTitle}</div>
                        <div
                            className={notifyBoBean.noStatu == '已读' ? 'notify-item-statuAl' : 'notify-item-statuNo'}>{notifyBoBean.noStatu}</div>
                    </div>
                    <div></div>
                    <div className='notify-item-line'></div>
                    <div className="notify-item-isserLine">
                        <div className='notify-item-issuer'>通知人：</div>
                        <div className='notify-item-issuerName'>{notifyBoBean.noIssue}</div>

                    </div>

                    <div className="notify-item-timeLine">
                        <div className='notify-item-time'>通知时间：</div>
                        <div className='notify-item-timeDetail'>{notifyBoBean.noTime}</div>
                    </div>
                    <div className='notify-item-lineBottem'></div>
                    <div className="notify-item-detailLine">
                        <div className="notify-item-detail">详情</div>
                        <img className='notify-item-detailIcon' src={require('imgs/next_arrow.png')}/>
                        {/*<img className='notify-item-detailIcon' src={require('imgs/next_arrow.png')} />*/}
                    </div>

                </div>
            </div>
        )
    }
}