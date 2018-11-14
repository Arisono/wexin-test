/**
 * Created by RaoMeng on 2018/11/11
 * Desc: 使用帮助
 */

import React, {Component} from 'react'
import {Skeleton, List} from 'antd'
import UseHelpItem from 'components/UseHelpItem'

export default class UseHelp extends Component {

    constructor() {
        super()

        this.state = {
            helpList: [],
            isLoading: true
        }
    }

    componentDidMount() {
        document.title = '使用帮助'

        const {helpList} = this.state
        setTimeout(() => {
            for (let i = 0; i < 8; i++) {
                helpList.push({
                    title: '如何开通智慧校园？',
                    content: '如果您是孩子家长，请向您孩子老师开通开通账号。如果您是任课老师，请向智慧校园系统管理员咨询开通'
                })
            }
            this.setState({
                helpList: helpList,
                isLoading: false
            })
        }, 2000)
    }

    render() {
        const {helpList, isLoading} = this.state
        return (
            <div>
                <Skeleton loading={isLoading} active paragraph={{rows:3}}>
                    <List dataSource={helpList} renderItem={
                        (item, index) => (
                            <UseHelpItem helpBean={item} index={index}/>
                        )
                    }/>
                </Skeleton>
            </div>
        )
    }
}