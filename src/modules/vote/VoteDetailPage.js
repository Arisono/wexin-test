/**
 * Created by Arison on 2018/11/15.
 */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {List, Button, Checkbox, Progress} from 'antd';
import './VoteDetailPage.css'
import {fetchPost, fetchGet} from "../../utils/fetchRequest";
import {API, _baseURL} from "../../configs/api.config";
import {Toast} from 'antd-mobile'
import ImageGrid from "../../components/image/ImageGrid";
import {connect} from 'react-redux'
import {getIntValue, getStrValue, isObjEmpty} from "../../utils/common";
import {saveListState} from "../../redux/actions/listState";

/**
 * Created by Arison on 15:51.
 */
class VoteDetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'VoteDetailPage',
            id: this.props.match.params.id,
            voteState: false,
            data: {
                title: '三年级2班',
                state: '进行中',
                voter: '',
                voterPhoto: '',
                files: [],
                endTime: '2018-11-15 08:00',
                selectState: 0,//0 单选 1 多选
                votes: []
            }
        };
    }


    componentWillMount() {
        document.title = "投票";
    }

    componentDidMount() {
        this.getVoteDetail();
    }

    getVoteDetail() {
        Toast.loading("", 0)
        fetchGet(API.voteDetail, {
            voteId: this.state.id,
            userId: this.props.userInfo.userId
        }).then((response) => {
            Toast.hide();
            if (response.data) {
                this.state.data.title = response.data.topics[0].topicName;
                this.state.data.voter = response.data.userName;

                this.state.data.files.length = 0;
                if (response.data.enclosure != null) {
                    for (let i = 0; i < response.data.enclosure.length; i++) {
                        this.state.data.files.push(_baseURL + response.data.enclosure[i]);
                    }
                }

                this.state.data.endTime = response.data.voteEndDate;
                this.state.data.voterPhoto = response.data.userPhoto
                this.state.data.selectState = response.data.voteType === 1 ? 0 : 1
                this.state.data.state = response.data.voteStatus === 1 ? "进行中" : "已结束"
                if (this.state.data.state === "进行中") {
                    this.state.voteState = true;
                } else {
                    this.state.voteState = false;
                }
                this.state.data.votes.length = 0;
                for (let i = 0; i < response.data.topics[0].options.length; i++) {
                    let model = {
                        optionId: response.data.topics[0].options[i].optionId,
                        topicId: response.data.topics[0].options[i].topicId,
                        count: response.data.topics[0].options[i].count,
                        percent: parseInt(response.data.topics[0].options[i].percent),
                        name: response.data.topics[0].options[i].optionName,
                        checked: false
                    }
                    this.state.data.votes.push(model);
                }
                this.setState({
                    data: this.state.data
                })

                console.log(this.props.listState)
                const item = response.data
                let voteBean = {}

                voteBean.voteId = getIntValue(item, 'voteId')
                voteBean.voteName = getStrValue(item, 'voteName')
                voteBean.voteType = getIntValue(item, 'voteType')
                voteBean.voteStatusCode = getIntValue(item, 'voteStatus')
                if (voteBean.voteStatusCode === 1) {
                    voteBean.voteStatus = '进行中'
                } else {
                    voteBean.voteStatus = '已投票'
                }
                voteBean.creatDate = getStrValue(item, 'creatDate')
                voteBean.voteEndDate = getStrValue(item, 'voteEndDate')
                voteBean.voteRemarks = getStrValue(item, 'voteRemarks')

                const topics = getStrValue(item, 'topics')
                if (!isObjEmpty(topics)) {
                    voteBean.options = topics[0].options
                }

                if (this.props.listState.tabIndex >= 0) {
                    const tabIndex = this.props.listState.tabIndex
                    if (tabIndex === 0) {
                        if (this.props.listState && !isObjEmpty(this.props.listState.listData)) {
                            if (this.props.listState.itemIndex >= 0) {
                                this.props.listState.listData[this.props.listState.itemIndex] = voteBean
                            }
                            saveListState({
                                listData: this.props.listState.listData,
                            })()
                        }
                    } else if (tabIndex === 1) {
                        if (this.props.listState && !isObjEmpty(this.props.listState.listData2)) {
                            if (this.props.listState.itemIndex >= 0) {
                                this.props.listState.listData2[this.props.listState.itemIndex] = voteBean
                            }
                            saveListState({
                                listData2: this.props.listState.listData2,
                            })()
                        }
                    }
                }
            }
        }).catch((error) => {
            Toast.hide()

            if (typeof error === 'string') {
                Toast.fail(error, 2)
            } else {
                Toast.fail('请求异常', 2)
            }
        })
    }

    onChangeEvent = (index, event) => {
        console.log("onChangeEvent()", event.target.checked);
        if (this.state.data.selectState === 0) {//单选
            this.state.data.votes[index].checked = event.target.checked;
            for (let i = 0; i < this.state.data.votes.length; i++) {
                if (i != index) {
                    this.state.data.votes[i].checked = false;
                }
            }
            this.setState({
                data: this.state.data
            })
        } else {//多选
            this.state.data.votes[index].checked = event.target.checked;
            this.setState({
                data: this.state.data
            })
        }
    }

    onClickEvent = () => {
        //投票状态
        let options = [];
        for (let i = 0; i < this.state.data.votes.length; i++) {
            let model = this.state.data.votes[i];
            console.log("onClickEvent():model:", model);
            if (model.checked) {
                if (this.state.data.selectState === 0) {
                    options.push(model.optionId);
                } else {
                    options.push(model.optionId);
                }
            }
        }
        if (options.length == 0) {
            Toast.info("请选择一个投票项")
            return
        }
        fetchPost(API.voteAction, {
            optionIds: JSON.stringify(options),
            voteId: this.state.id,
            userId: this.props.userInfo.userId
        }).then((response) => {
            Toast.info(response.data)
            this.getVoteDetail();
            this.setState({
                voteState: true
            })
        }).catch((error) => {
            Toast.hide()

            if (typeof error === 'string') {
                Toast.fail(error, 2)
            } else {
                Toast.fail('请求异常', 2)
            }
        })
    }


    render() {
        return <div className="container-fluid">
            <div className="row">
                <div className="col-xs-12">
                    <div className="row" id="pager_header">
                        <div className="flex_row">
                            <img class="img-circle"
                                 style={{marginLeft: "20px", marginTop: '24px', border: "1px solid #e4e4e4"}}
                                 src={this.props.userInfo.userAvatar} width={54}
                                 height={54}/>

                            <div className="vote-header ">
                                {this.state.data.title}
                            </div>
                        </div>
                        <div className="vote-detail-name">{this.state.data.voter}</div>
                        <div id="row_right">
                            <span className="vote-detail-time-caption">截止时间：</span>
                            <span className="vote-detail-time-value">{this.state.data.endTime}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className='common-flex-row vote-detail-type'>
                            {this.state.data.selectState === 0 ? (<span>单选</span>) : (<span>多选</span>)}
                            <div style={{height: '1px', flex: 1, background: '#EEEEEE', marginLeft: '5px'}}></div>
                        </div>
                        <div className="col-xs-12">
                            <List dataSource={this.state.data.votes}
                                  renderItem={(item, index) => (
                                      <div className='common-flex-row vote-detail-option-layout'>
                                          {this.state.voteState ? (<Checkbox
                                                  checked={item.checked}
                                                  onChange={this.onChangeEvent.bind(this, index)}
                                                  style={{marginLeft: "20px", display: "flex", alignItems: "center"}}>
                                              </Checkbox>) :
                                              (<Checkbox disabled
                                                         checked={item.checked}
                                                         onChange={this.onChangeEvent.bind(this, index)}
                                                         style={{
                                                             marginLeft: "20px",
                                                             display: "flex",
                                                             alignItems: "center"
                                                         }}>
                                              </Checkbox>)}
                                          <div style={{
                                              flex: 1,
                                              display: "inline",
                                              marginRight: "10px",
                                              marginLeft: "10px",
                                              alignItems: "center",
                                              height: "100%"
                                          }}>
                                              <Progress percent={item.percent} size="small"/>
                                          </div>
                                          <span className='vote-detail-option-text'>{item.name}</span>
                                      </div>
                                  )}/>
                        </div>
                    </div>

                    <div className="row flex_center" id="row_vote">
                        {this.state.voteState == true ? (
                            <Button onClick={this.onClickEvent.bind(this)} type="primary" block
                                    style={{margin: '30px 10px'}}
                                    className='commonButton'>
                                投票</Button>
                        ) : (
                            <Button className='commonButton'
                                    block
                                    style={{
                                        backgroundColor: "#9D9D9D",
                                        color: "#ffffff",
                                        border: "1px solid #ffffff",
                                        margin: '30px 10px'
                                    }} block>已投票</Button>
                        )
                        }
                    </div>
                    {this.state.data.files.length === 0 ? ("") : (<div>
                        <div className="row" id="page_block_min"></div>
                        <div className="row margin_left_right_15">
                            <div className="margin_top_20"><span className="span_15">附件</span></div>
                            <ImageGrid images={this.state.data.files}/>
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    }
}


let mapStateToProps = (state) => ({
    userInfo: {...state.redUserInfo},
    listState: {...state.redListState}
})

let mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(VoteDetailPage)