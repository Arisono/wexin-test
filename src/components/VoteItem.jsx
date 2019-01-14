/**
 * Created by RaoMeng on 2019/1/13
 * Desc: 投票助手列表item
 */

import React, {Component} from 'react'
import icon_vote_items from "../style/imgs/icon_vote_items.png";
import {isObjEmpty} from "../utils/common";
import {Checkbox} from 'antd';
import 'css/vote.css'

export default class VoteItem extends Component {

    constructor() {
        super()

        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        const {voteBean} = this.props

        const voteList = voteBean.options
        const voteOptions = []
        if (!isObjEmpty(voteList)) {
            voteList.forEach((item, index) => {
                voteOptions.push(<div className='common-flex-row' style={{padding: '4px'}}>
                    <div className='vote-item-option-circle'></div>
                    <span className='vote-item-option-text'>{item.optionName}</span>
                </div>)
            })
        }

        return (
            <div className='vote-item-root' onClick={this.onItemClick}>
                <div className="common-flex-row">
                    <div className="vote-item-title">{voteBean.voteName}</div>
                    <div className={voteBean.voteStatusCode === 1 ? 'vote-item-status-doing'
                        : 'vote-item-status-done'}>
                        {voteBean.voteStatus}
                    </div>
                </div>
                <div className="common-flex-row-12">
                    <div className='common-flex-column-y-center' style={{flex: 1}}>
                        {voteOptions}
                    </div>
                    <img style={{margin: '10px 0 0 30px'}} src={icon_vote_items}
                         width={46} height={46}/>
                </div>
                <div className="common-flex-row">
                    <span className='vote-item-endData-capiton'>截止时间：</span>
                    <span className='vote-item-endData-value'>{voteBean.voteEndDate}</span>
                </div>
            </div>
        )
    }

    onItemClick = () => {
        if (this.props.onItemClick) {
            this.props.onItemClick(this.props.index, this.props.voteBean.voteId)
        }
    }
}