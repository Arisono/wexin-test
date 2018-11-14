import React, {Component} from 'react'
import NotifyBoBean from 'model/NotifyBoBean'
import {List} from 'antd'
import NotifyBoardItem from "../../components/NotifyBoardItem";
import 'css/consume-re.css'


export default class PhonesList extends Component {

    constructor() {
        super()

        this.state = {
            notifyList: [],

        }
    }

    componentDidMount() {

        document.title = '通知公告'

        for (let i = 0; i < 20; i++) {
            let notifyBoBean = new NotifyBoBean()

            notifyBoBean.noTitle = '2019春季校运会'
            if (i % 2 === 0) {
                notifyBoBean.noStatu = '已读'
            } else {
                notifyBoBean.noStatu = '未读'
            }
            notifyBoBean.noContent = ' 尊敬的家长和尊敬的各位来宾，你们好，我校将在10月25号举办校园运动会，请各位家长们积极配合校园运动会的工作的开展'

            notifyBoBean.noIssue = '周老师'

            notifyBoBean.noTime = '2019-20-20 28:00'

            this.state.notifyList.push(notifyBoBean)
        }

        this.setState({
            notifyList: this.state.notifyList
        })
    }

    render() {
        const {notifyList, typeTitle} = this.state

        return (
            <div className='notify-bg-root'>
                <div className='displayNone'></div>
                <div className='displayNone'></div>
                <List className='notifyBoBean-list-layout' split={false} dataSource={notifyList} renderItem={notifyBoBean => (
                        <NotifyBoardItem notifyBoBean={notifyBoBean}/>
                )}/>
            </div>
        )
    }}
