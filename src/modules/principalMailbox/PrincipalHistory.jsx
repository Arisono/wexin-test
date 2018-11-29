/**
 * Created by RaoMeng on 2018/11/14
 * Desc: 投递记录
 */

import React, {Component} from 'react'
import {Toast} from 'antd-mobile'
import {List, Icon, Skeleton} from 'antd'
import InfiniteScroll from 'react-infinite-scroller'
import LoadingMore from 'components/LoadingMore'
import PrincipalItem from 'components/PrincipalItem'
import {fetchPost} from "../../utils/fetchRequest";
import {API} from "../../configs/api.config";

const mPageSize = 10
let mPageIndex = 1
export default class PrincipalHistory extends Component {

    constructor() {
        super()

        this.state = {
            principalList: [],
            hasMoreData: true,
            isLoading: true
        }
    }

    componentDidMount() {
        document.title = '历史投递'
        Toast.loading('努力加载中...', 0)
    }

    componentWillUnmount() {

    }

    render() {
        const {principalList, hasMoreData, isLoading} = this.state

        return (
            <div className='recharge-page-layout' style={{background: '#F2F2F2'}}>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadPrincipalList}
                    hasMore={hasMoreData}
                    loader={<LoadingMore/>}>
                    <Skeleton loading={isLoading} active paragraph={{rows: 3}}>
                        <List
                            dataSource={principalList}
                            renderItem={(item, index) => (
                                <PrincipalItem
                                    principalBean={item}
                                    deleteItem={this.onDeleteItem}
                                    index={index}/>
                            )}/>
                    </Skeleton>
                </InfiniteScroll>
            </div>
        )
    }

    loadPrincipalList = () => {

            Toast.hide()
            const {principalList} = this.state
            // for (let i = 0; i < 10; i++) {
            //     // let rechargeBean = {}
            //     // if (i % 2 == 0) {
            //     //     rechargeBean.time = '2018-10-28 13:22:21'
            //     //     rechargeBean.status = '已查阅'
            //     //     rechargeBean.suggest = '张校长您好！我是二年级三班陈小龙的家长，我孩子的数学成绩最近下降好多，我了解的原因是我孩子的任何数学任何老师换了位新的老师。孩子反应不能适应新的数学老师的上课方式，恳请换回来之前的那位老师！ 谢谢'
            //     //     rechargeBean.enclosure = [
            //     //         'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543039474667&di=32c37088ba29d428392cee485ce29995&imgtype=0&src=http%3A%2F%2Fpic153.nipic.com%2Ffile%2F20171226%2F26515894_231421032000_2.jpg',
            //     //         'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543039450432&di=c4e6d3b8039a4b2b2713a8fa278a54cc&imgtype=0&src=http%3A%2F%2Ffx120.120askimages.com%2F120ask_news%2F2017%2F0706%2F201707061499322886181789.jpg'
            //     //     ]
            //     //     rechargeBean.reply = '尊敬的家长：\n您好！收到你的信件，校方非常重视你的意见，我们会加强班级主任老师与任课老师的教务工作，并与学生家长持久沟通！共同促进学生的健康成长！'
            //     // } else {
            //     //     rechargeBean.time = '2018-02-11 23:12:24'
            //     //     rechargeBean.status = '未查阅'
            //     //     rechargeBean.suggest = '张校长您好！我是二年级三班陈小龙的家长，我孩子的数学成绩最近下降好多，我了解的原因是我孩子的任何数学任何老师换了位新的老师。孩子反应不能适应新的数学老师的上课方式，恳请换回来之前的那位老师！ 谢谢'
            //     //     rechargeBean.enclosure = [
            //     //         'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543039450432&di=c4e6d3b8039a4b2b2713a8fa278a54cc&imgtype=0&src=http%3A%2F%2Ffx120.120askimages.com%2F120ask_news%2F2017%2F0706%2F201707061499322886181789.jpg'
            //     //     ]
            //     // }
            //     // principalList.push(rechargeBean)
            // }

            fetchPost(API.GET_MEETING_LIST, {
                userId: 10000,
                notifyType: 5,
                pageIndex: mPageIndex,
                pageSize: mPageSize
            }).then(response => {

                console.log(response)

                response.data.creat.map((item,index)=> {

                    let rechargeBean = {}

                    rechargeBean.time = item.creatDate
                    if (item.isRead == 1) {

                        rechargeBean.status = '已查阅'

                      }else{

                        rechargeBean.status = '未查阅'
                    }
                        rechargeBean.suggest = item.notifyDetails
                        rechargeBean.enclosure = item.notifyFiles
                        rechargeBean.reply = '尊敬的家长：\n您好！收到你的信件，校方非常重视你的意见，我们会加强班级主任老师与任课老师的教务工作，并与学生家长持久沟通！共同促进学生的健康成长！'
                    
                    principalList.push(rechargeBean)

                })

                this.setState({
                    principalList,
                    isLoading: false,
                    hasMoreData:false
                })
                Toast.hide()

            }).catch(error => {
                Toast.fail(error, 2)
            })

    }

    onDeleteItem = index => {
        const {principalList} = this.state
        principalList.splice(index, 1)
        this.setState({principalList})
        Toast.success('删除成功', 1.5)
    }
}