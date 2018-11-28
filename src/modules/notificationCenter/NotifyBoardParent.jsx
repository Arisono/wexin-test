import React, {Component} from 'react'
import NotifyBoBean from 'model/NotifyBoBean'
import {List, Icon, Skeleton} from 'antd'
import InfiniteScroll from 'react-infinite-scroller'
import LoadingMore from 'components/LoadingMore'
import NotifyBoardItem from "../../components/NotifyBoardItem";
import 'css/consume-re.css'
import {Toast, Modal} from "antd-mobile";
import {isObjEmpty, isObjNull} from "../../utils/common";
import {fetchGet,fetchPost} from "../../utils/fetchRequest";
import {API} from "../../configs/api.config";


const mPageSize = 10
var mPageIndex = 1

export default class NotifyBoardParent extends Component {

    constructor() {
        super()

        this.state = {
            notifyList: [],
            hasMoreData: true,
            isLoading: true,
            detailVisible: false
        }
    }

    componentDidMount() {

        document.title = '通知公告'
        // Toast.loading('努力加载中...', 0)

    }

    render() {
        const {notifyList, hasMoreData, isLoading} = this.state
        const detailModal = this.getDetailModal()

        return (
            <div className='notify-bg-root'>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadRechargeList}
                    hasMore={hasMoreData}
                    loader={<LoadingMore/>}>
                    <Skeleton loading={isLoading} active paragraph={{rows: 3}}>
                        <List split={false} dataSource={notifyList}
                              renderItem={(notifyBoBean, index) => (
                                  <NotifyBoardItem notifyBoBean={notifyBoBean}
                                                   onDetailClick={this.onDetailClick.bind(this)}
                                                   index={index}/>
                              )}/>
                    </Skeleton>
                </InfiniteScroll>
                {detailModal}
            </div>
        )
    }


    getDetailModal = () => {
        const {notifyList} = this.state

        let notifyBoBean = notifyList[this.selectIndex]

        if (isObjNull(notifyBoBean)) {
            return
        }
        let enclosureItem = <div></div>
        if (!isObjEmpty(notifyBoBean.enclosure) && notifyBoBean.enclosure != '[]') {
            enclosureItem =
                <div className='principal-enclosure-layout'>
                    <img src={notifyBoBean.enclosure[0]} className='principal-enclosure-img'/>
                    <span className='principal-enclosure-count'>({notifyBoBean.enclosure.length}张)</span>
                </div>
        }

        const receives = notifyBoBean.receiveList
        const receiveItems = []
        if (!isObjEmpty(receives) && receives != '[]') {
            for (let i = 0; i < receives.length; i++) {
                receiveItems.push(<span className='notify-detail-modal-receive'>{receives[i]}</span>)
            }
        }

        return (
            <Modal
                popup
                visible={this.state.detailVisible}
                onClose={this.onModalClose}
                animationType="slide-up">
                <div className='notify-detail-modal-layout'>
                    <div style={{width: '100%', padding: '12px 14px', background: 'transparent', textAlign: 'right'}}>
                        <Icon type="close-circle" style={{color: 'white', fontSize: '20px'}}
                              onClick={this.onModalClose}/>
                    </div>
                    <div className='notify-detail-modal-content-layout'>
                        <div className='notify-detail-modal-content-header'>
                            <div className='notify-detail-modal-header-tilte'>{notifyBoBean.noTitle}</div>
                           {/* <span
                                className={notifyBoBean.noStatu === '已读' ?
                                    'notify-item-statuAl' : 'notify-item-statuNo'}>{notifyBoBean.noStatu}</span>*/}
                        </div>
                        <div className='notify-detail-modal-content-text'>{notifyBoBean.noContent}</div>
                        <div style={{padding: '10px'}}>
                            {enclosureItem}
                        </div>
                        <div className='notify-detail-modal-time'>{notifyBoBean.noIssue}</div>
                        <div className='notify-detail-modal-time'>{notifyBoBean.noTime}</div>
                        {/*<div className='gray-line'></div>
                        <div className='common-flex-row-10 common-font-family'>
                            <span style={{color: '#363636'}}>接收人</span>
                            <div style={{flex: '1', textAlign: 'right'}}>
                                <span style={{fontSize: '12px', color: '#CD1D1D'}}>未读：{notifyBoBean.unRead}</span>
                                <span style={{
                                    fontSize: '12px',
                                    color: '#161616',
                                    marginLeft: '10px'
                                }}>已读：{notifyBoBean.readed}</span>
                            </div>
                        </div>
                        <div>
                            {receiveItems}
                        </div>*/}
                    </div>
                </div>
            </Modal>
        )
    }

    onModalClose = () => {
        this.setState({
            detailVisible: false
        })
    }


    onDetailClick = (index) => {
        this.selectIndex = index
        this.setState({
            detailVisible: true
        })
    }

    loadRechargeList = () => {
        // setTimeout(() => {

            const {notifyList} = this.state



            fetchPost(API.notifyMessage, {
                userId: 10001,
                notifyType:4,
                pageIndex: mPageIndex,
                pageSize: mPageSize
            }).then(response => {
                Toast.hide()
                console.log(response)
               
                response.data.notify.map((item,index)=>{

                    let notifyBoBean = new NotifyBoBean()

                    notifyBoBean.noTitle = item.notifyName
                    notifyBoBean.enclosure = []
                    notifyBoBean.unRead = 25
                    notifyBoBean.readed = 20
                    notifyBoBean.noContent=item.notifyDetails
                    notifyBoBean.noIssue = item.notifyCreator
                    notifyBoBean.noTime = item.creatDate

                    if(item.isRead == 1){

                        notifyBoBean.noStatu = '已读'

                    }else{

                        notifyBoBean.noStatu = '未读'

                    }

                    notifyList.push(notifyBoBean)

                })


                this.setState({
                    notifyList,
                    isLoading: false,
                    hasMoreData:false

                })

                Toast.hide();
            }).catch(error => {
                // Toast.fail(error, 2)

            })

        //     const receivesDemo = ['李泞', '章晨望', '赖斯睿', '左熹', '李爽']
        //     for (let i = 0; i < 20; i++) {
        //         let notifyBoBean = new NotifyBoBean()
        //
        //         notifyBoBean.noTitle = '2019春季校运会'
        //         if (i % 2 === 0) {
        //             notifyBoBean.noStatu = '已读'
        //             notifyBoBean.enclosure = [
        //                 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543039474667&di=32c37088ba29d428392cee485ce29995&imgtype=0&src=http%3A%2F%2Fpic153.nipic.com%2Ffile%2F20171226%2F26515894_231421032000_2.jpg',
        //                 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543039450432&di=c4e6d3b8039a4b2b2713a8fa278a54cc&imgtype=0&src=http%3A%2F%2Ffx120.120askimages.com%2F120ask_news%2F2017%2F0706%2F201707061499322886181789.jpg'
        //             ]
        //             notifyBoBean.receiveList = receivesDemo.concat(receivesDemo, receivesDemo, receivesDemo)
        //             notifyBoBean.unRead = 25
        //             notifyBoBean.readed = 20
        //         } else {
        //             notifyBoBean.noStatu = '未读'
        //             notifyBoBean.enclosure = []
        //             notifyBoBean.receiveList = receivesDemo.concat(receivesDemo, receivesDemo)
        //             notifyBoBean.unRead = 30
        //             notifyBoBean.readed = 15
        //         }
        //         notifyBoBean.noContent = ' 尊敬的家长和尊敬的各位来宾，你们好，我校将在10月25号举办校园运动会，请各位家长们积极配合校园运动会的工作的开展'
        //         notifyBoBean.noIssue = '周老师'
        //         notifyBoBean.noTime = '2019-03-20 18:00'
        //
        //         notifyList.push(notifyBoBean)
        //     }
        //
        //     this.setState({
        //         notifyList,
        //         isLoading: false
        //     })
        // }, 1500)
    }

}
