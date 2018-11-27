/**
 * Created by RaoMeng on 2018/11/14
 * Desc: 历史投递item
 */

import React, {Component} from 'react'
import {Modal} from 'antd-mobile'
import {isObjEmpty} from "../utils/common";
import 'css/principal-mailbox.css'

const {alert} = Modal

export default class PrincipalItem extends Component {

    constructor() {
        super()

        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        const {principalBean} = this.props

        let enclosureItem = <div></div>
        if (!isObjEmpty(principalBean.enclosure) && principalBean.enclosure != '[]') {
            enclosureItem =
                <div className='principal-enclosure-layout'>
                    <img src={principalBean.enclosure[0]} className='principal-enclosure-img'/>
                    <span className='principal-enclosure-count'>({principalBean.enclosure.length}张)</span>
                </div>
        }
        let replayItem = <span></span>
        if (principalBean.reply) {
            replayItem = <pre className='common-font-family'
                              style={{
                                  color: '#333333',
                                  fontSize: '12px',
                                  letterSpacing: '1.5px',
                                  marginTop: '10px',
                                  borderTop: '1px solid #d0d0d0',
                                  padding: '10px',
                                  whiteSpace: 'pre-line'
                              }}>{principalBean.reply}</pre>
        }

        return (
            <div style={{padding: '10px'}}>
                <div className='principal-item-root'>
                    <div className='principal-item-top'>
                        <div className='principal-item-time'>{principalBean.time}</div>
                        <span className={principalBean.status == '已查阅' ?
                            'principal-item-status-done' :
                            'principal-item-status-todo'}>{principalBean.status}</span>
                    </div>
                    <div className='principal-item-content'>{principalBean.suggest}</div>
                    {enclosureItem}
                    <div style={{textAlign: 'right', marginTop: '10px'}}>
                        <span className='principal-item-delete'
                              onClick={this.onDeleteEvent}>删除</span>
                    </div>
                    {replayItem}
                </div>
            </div>
        )
    }

    onDeleteEvent = () => {
        alert('提示', '确定删除该条记录吗？', [
            {
                text: '取消', onPress: () => {
                }
            },
            {
                text: '确定', onPress: () => {
                    this.props.deleteItem(this.props.index)
                }
            }
        ])
    }
}