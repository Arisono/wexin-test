import React, {Component} from 'react'
import ConsumeBean from 'model/ConsumeBean'
import 'css/consume-re.css'

export default class ConsumeReItem extends Component {

    constructor() {
        super()

        this.state = {
            consumeBean: new ConsumeBean()

        }
    }

    componentDidMount() {
        this.setState({
            consumeBean: this.props.consumeBean
        })
    }

    render() {
        const {consumeBean} = this.state
        return (
            <div className='consume-item-root'>
                <div className='consume-item-top'>
                    <div className='consume-item-name'>{consumeBean.chargeName}</div>
                    <div className={consumeBean.chargeStatus === 1 ?
                        'consume-item-amount' : 'consume-item-amountBlack'}>
                        {consumeBean.chargeStatus === 1 ? '+' : '-'}{consumeBean.chargeAmount}</div>
                </div>
                <div className='consume-item-time'>{consumeBean.chargeTime}</div>
            </div>
        )
    }
}