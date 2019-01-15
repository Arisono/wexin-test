/**
 *   Created by FANGlh on 2018/11/8 14:57.
 *   *   创建投票
 */

import React, {Component} from 'react';
import './SendVote.css';
import {Select, Switch, Upload, Icon, Modal, TreeSelect, Button, Input} from 'antd';
import nextArrowimg from '../../../style/imgs/next_arrow.png';
import moment from 'moment'
import 'antd/dist/antd.css';
import SelectItem from './SelectItem';
import {Toast, Picker, List, DatePicker} from 'antd-mobile';
import TargetSelect from '../../../components/TargetSelect';
import {fetchPost, fetchGet, fetchGetNoSession} from '../../../utils/fetchRequest';
import {_baseURL, API} from '../../../configs/api.config';
import {getIntValue, getStrValue, isObjEmpty} from "../../../utils/common";
import UploadEnclosure from '../../../components/UploadEnclosure';
import {connect} from 'react-redux';
import {clearListState} from "../../../redux/actions/listState";

const Option = Select.Option;
const {TextArea} = Input;

class SendVote extends Component {
    componentWillMount() {
        document.title = '发起投票'
    }

    componentDidMount() {
        this.getOrganization()
    }

    getOrganization = () => {
        Toast.loading('', 0)

        fetchGet(API.USER_GETOBJECT, {
            userId: this.props.userInfo.userId,
            stuId: this.props.userInfo.userId
        }).then(response => {
            Toast.hide()
            const {targetData} = this.state
            targetData.length = 0
            if (response && response.data) {
                const schoolArray = response.data.schools
                const teacherArray = response.data.teachers

                if (!isObjEmpty(teacherArray)) {
                    const teacherData = []
                    teacherArray.forEach((teacherObj, index) => {
                        if (teacherObj) {
                            teacherData.push({
                                title: getStrValue(teacherObj, 'userName'),
                                userId: getIntValue(teacherObj, 'userId'),
                                userPhone: getStrValue(teacherObj, 'userPhone'),
                                value: getStrValue(teacherObj, 'userName') + `-1-${index}`,
                                key: `1-${index}`,
                            })
                        }
                    })

                    targetData.push({
                        title: `全体老师`,
                        value: `1`,
                        key: `1`,
                        children: teacherData,
                    })
                }

                if (!isObjEmpty(schoolArray)) {
                    const classData = []

                    schoolArray.forEach((schoolObj, sIndex) => {
                        if (schoolObj) {
                            const parentArray = schoolObj.parents

                            const parentData = []
                            if (!isObjEmpty(parentArray)) {
                                parentArray.forEach((parentObj, pIndex) => {
                                    parentData.push({
                                        title: getStrValue(parentObj, 'userName'),
                                        userId: getIntValue(parentObj, 'userId'),
                                        userPhone: getStrValue(parentObj, 'userPhone'),
                                        value: getStrValue(parentObj, 'userName') + `-0-${sIndex}-${pIndex}`,
                                        key: `0-${sIndex}-${pIndex}`,
                                    })
                                })

                                classData.push({
                                    title: getStrValue(schoolObj, 'parentName') + getStrValue(schoolObj, 'schName'),
                                    value: getStrValue(schoolObj, 'parentName') + getStrValue(schoolObj, 'schName') + `-0-${sIndex}`,
                                    key: `0-${sIndex}`,
                                    children: parentData,
                                })
                            }
                        }
                    })

                    targetData.push({
                        title: `全体家长`,
                        value: `0`,
                        key: `0`,
                        children: classData,
                    })
                }
            }

            console.log('targetData', targetData)
            this.setState({
                targetData,
            })
        }).catch(error => {
            Toast.hide()

            if (typeof error === 'string') {
                Toast.fail(error, 2)
            } else {
                Toast.fail('请求异常', 2)
            }
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            voteTitle: null,
            endValue: null,
            voteType: null,
            nonameVote: false,
            voteOptionss: [null, null],
            targetList: [],
            targetCount: 0,
            targetData: [],
            previewVisible: false,
            previewImage: '',
            fileList: [],
            votePerson: [],
            voteMembers: 18,
            typeVote: [{
                label: '单选',
                value: '1'
            }, {
                label: '多选',
                value: '2'
            }]
        }
    }

    render() {

        //添加附件按钮
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const targetProps = {
            targetData: this.state.targetData,
            targetValues: this.state.targetList,
            title: '发布对象',
            targetCount: this.state.targetCount,
            onTargetChange: this.onTargetChange.bind(this),
            onTargetFocus: this.onTargetFocus.bind(this)
        }

        const defaultTargetProps = {
            targetData: [],
            targetValues: this.state.targetList,
            title: '发布对象',
            targetCount: this.state.targetCount,
            onTargetChange: this.onTargetChange.bind(this),
            onTargetFocus: this.onTargetFocus.bind(this)
        }
        return (

            <div onChange={this.handelValueCom}>
                {this.state.targetData.length > 0 ? <TargetSelect {...targetProps}/>
                    : <TargetSelect {...defaultTargetProps}/>}
                <div className="comhline_sty"></div>
                <textarea autoFocus="autoFocus" ref='voteTitle' className="form-control textarea_sty"
                          rows="2" placeholder="请填写投票主题…" style={{resize: 'none'}}></textarea>
                <div className="comhline_sty"></div>

                <div>
                    {this.state.voteOptionss.map((itemata, index) => <SelectItem index={index} itemata={itemata}
                                                                                 handelSItem={this.handelSItem}
                                                                                 removeSItem={this.removeSItem}></SelectItem>)}
                    <div onClick={this.addSelectItem} className="text-center"
                         style={{color: "#0CE11D", fontSize: 12, margin: 10,}}>+ <span
                        style={{borderBottom: "1px #0CE11D solid"}}>添加选项</span></div>
                </div>

                <div className="comhline_sty"></div>
                <div className="common-column-layout">
                    <Picker
                        data={this.state.typeVote} title='投票类型' extra='请选择'
                        value={this.state.voteType}
                        onChange={this.handleSelectChange}
                        onOk={this.handleSelectChange} cols={1}>
                        <List.Item arrow="horizontal">投票类型</List.Item>
                    </Picker>
                    {/*<Select defaultValue="请选择" style={{ width:100 }} onChange={this.handleSelectChange}>*/}
                    {/*<Option value="1">单选</Option>*/}
                    {/*<Option value="2">多选</Option>*/}
                    {/*</Select>*/}
                    {/*<img src={nextArrowimg} className="nextarr_sty"/>*/}
                    <div className="comhline_sty1"></div>
                    <DatePicker
                        value={this.state.endValue}
                        locale={{
                            okText: '确定',
                            dismissText: '取消'
                        }}
                        onChange={date => this.setState({endValue: date})}>
                        <List.Item arrow="horizontal">结束时间</List.Item>
                    </DatePicker>
                </div>

                <div className="comhline_sty1"></div>

                <div className="item_sty">
                    <div style={{width: 150, fontSize: 15, color: "#333333"}}>匿名投票:</div>
                    <div className="text-right" style={{width: "100%",}}>
                        <Switch checkedChildren="开" unCheckedChildren="关" defaultunchecked="false"
                                onChange={this.switchStatues}/>
                    </div>
                </div>
                <div className="comhline_sty1"></div>

                <div style={{margin: 10}}>
                    <UploadEnclosure
                        action={API.UPLOAD_FILE}
                        fileList={this.state.fileList}
                        count={4}
                        multiple={true}
                        beforeUpload={this.beforeUpload.bind(this)}
                        handleChange={this.handleChange.bind(this)}
                    />
                </div>

                <center><Button type="button" className="btn btn-primary comBtn_sty"
                                onClick={this.doSendVote}>提交</Button></center>
            </div>
        )
    }

    onTargetFocus = (e) => {
        if (isObjEmpty(this.state.targetData)) {
            this.getOrganization()
        }
    }

    onTargetChange = (value, label, checkNodes, count) => {
        this.checkNodes = checkNodes
        this.setState({
            targetList: value,
            targetCount: count
        });
    }
    //发布提交
    doSendVote = (event) => {
        if (!isObjEmpty(this.checkNodes)) {
            this.checkNodes.forEach((node, index) => {
                this.state.votePerson.push(node.userId)
            })
        }
        console.log('state', this.state)
        if (this.state.votePerson.length == 0) {
            Toast.fail('请选择投票对象...')
            return
        }
        if (this.state.voteTitle == '' || this.state.voteTitle == null) {
            Toast.fail('请填写投票主题...', 1)
            return
        }
        if (this.state.voteOptionss.length < 2) {
            Toast.show('请输入选项内容...')
            return
        }
        if (this.state.voteType == null || this.state.voteType == '') {
            Toast.fail('请选择投票类型...')
            return
        }
        if (this.state.endValue == null || this.state.endValue == '') {
            Toast.fail('请选择正确结束时间...')
            return
        }

        var nowT = new Date().getTime()
        var endT = new Date(this.state.endValue).getTime()
        if (nowT > endT) {
            Toast.fail('当前时间不可大于结束时间', 1)
            return
        }

        var options = []
        for (let i = 0; i < this.state.voteOptionss.length; i++) {
            const item = {
                optionName: this.state.voteOptionss[i],
                optionStatus: 1
            }
            options[i] = item
        }


        const approveFiles = []
        if (this.state.fileList) {
            this.state.fileList.forEach((value, index) => {
                approveFiles.push(value.picUrl)
            })
        }
        var params = {
            creator: this.props.userInfo.userId,
            voteStatus: 1,
            voteRemarks: "这是一个调查",
            voteName: this.state.voteTitle,
            voteFile: approveFiles,
            voter: JSON.stringify(this.state.votePerson),
            voteEndDate: moment(this.state.endValue).format('YYYY-MM-DD HH:mm:ss'),
            voteType: this.state.voteType[0],
            topics: [
                {
                    topicName: this.state.voteTitle,
                    topicStatus: 1,
                    topicType: 1,
                    options: options
                }
            ]
        }
        console.log('params', {
            voteString: params
        })
        fetchPost(API.voteCreate, {
            voteString: JSON.stringify(params)
        }, {})
            .then((response) => {
                if (response.success) {
                    Toast.show('提交成功', 1)
                    clearListState()()
                    this.backTask = setTimeout(() => {
                        this.props.history.push("/voteListTab")
                    }, 2000)
                }
            })
            .catch((error) => {
                console.log('error', error)
                if (typeof error === 'string') {
                    Toast.fail(error, 2)
                } else {
                    Toast.fail('请求异常', 2)
                }
            })
    }

    componentWillUnmount() {
        Toast.hide()
        clearTimeout(this.backTask)
    }

    removeSItem = (index) => {
        if (this.state.voteOptionss.length == 2) {
            return
        }
        let voteOptionss = this.state.voteOptionss
        voteOptionss.splice(index, 1)
        this.setState({
            voteOptionss
        })
    }
    handelSItem = (itemdata, index) => {
        console.log('index', index)
        console.log('itemdata', itemdata)
        let voteOptionss = this.state.voteOptionss
        voteOptionss[index] = itemdata
        this.setState({
            voteOptionss
        })
    }

    addSelectItem = (event) => {
        let voteOptionss = [...this.state.voteOptionss, null];
        this.setState({
            voteOptionss
        })
    }
    addAnnex = (event) => {
        console.log('addAnnex')
    }

    handleSelectChange = (value) => {
        console.log('voteType', value)
        this.setState({
            voteType: value
        })
    }
    handelValueCom = (event) => {
        //获取用户名的值
        let voteTitle = this.refs.voteTitle.value;
        //获得内容的值
        this.setState({
            voteTitle: voteTitle,
        })
    }

    switchStatues = (value) => {
        console.log('isOpend?', value)
        this.setState({
            nonameVote: value
        })
    }
    handleCancel = () => this.setState({previewVisible: false})

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    beforeUpload = (file, fileList) => {

    }
    handleChange = fileList => {
        if (fileList) {
            fileList.forEach((value, index) => {
                value.url = value.response ? (_baseURL + value.response.data) : value.url
                value.picUrl = value.response ? value.response.data : value.picUrl
            })

            this.setState({fileList})
        }
    }

}

let mapStateToProps = (state) => ({
    userInfo: {...state.redUserInfo}
})

let mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(SendVote)