/**
 *   Created by FANGlh on 2018/12/12 11:45.
 *   Desc:
 */

import React, {Component} from 'react';
import '../../style/css/app-gloal.css'
import './LeaveApprovalPage.css'
import './LeaveAddPage.css'
import {Toast, Picker, List, DatePicker} from 'antd-mobile';
import UploadEnclosure from '../../components/UploadEnclosure';
import {fetchPost, fetchGet, fetchGetNoSession} from '../../utils/fetchRequest';
import {_baseURL, API} from '../../configs/api.config';
import {Input, Button} from 'antd';
import moment from 'moment'
import {connect} from 'react-redux';
import TargetSelect from '../../components/TargetSelect';
import {getIntValue, getStrValue, isObjEmpty} from "../../utils/common";
import {getOrganization} from "../../utils/api.request";
import {ORGANIZATION_TEACHER} from "../../utils/api.constants";


class LeaveAddCPage extends Component {
    componentDidMount() {
        getOrganization(ORGANIZATION_TEACHER, this.props.userInfo.userId, false)
            .then(organization => {
                this.setState({
                    targetData: organization.teachers,
                })
            }).catch(error => {

        })
    }

    constructor(props) {
        super(props);
        this.state = {
            targetData: [],
            votePerson: [],
            fileList: [],
            typeLeave: [
                {
                    label: '事假',
                    value: '1'
                }, {
                    label: '病假',
                    value: '2'
                }, {
                    label: '丧假',
                    value: '3'
                }, {
                    label: '陪产假',
                    value: '4'
                }
            ],
            leaveName: null,
            leaveReason: null,
            leaveType: [],
            startValue: null,
            endValue: null,
        }
    }


    componentWillMount() {
        document.title = "请假申请";
    }
    render() {
        const targetProps = {
            targetData: this.state.targetData,
            targetValues: this.state.targetList,
            title: '接收人',
            targetCount: this.state.targetCount,
            onTargetChange: this.onTargetChange.bind(this),
            onTargetFocus: this.onTargetFocus.bind(this),
            multiple: false,
        }

        const defaultTargetProps = {
            targetData: [],
            targetValues: this.state.targetList,
            title: '接收人',
            targetCount: this.state.targetCount,
            onTargetChange: this.onTargetChange.bind(this),
            onTargetFocus: this.onTargetFocus.bind(this),
            multiple: false,
        }
        return (
            <div>
                <Picker
                    data={this.state.typeLeave} title='请假类型' extra='请选择'
                    value={this.state.leaveType}
                    onChange={this.handleSelectChange} cols={1}>
                    <List.Item arrow="horizontal">请假类型</List.Item>
                </Picker>
                <div className="comhline_sty1"></div>

                <DatePicker
                    value={this.state.startValue}
                    onChange={date => this.setState({startValue: date})}>
                    <List.Item arrow="horizontal">开始时间</List.Item>
                </DatePicker>

                <div className="comhline_sty1"></div>

                <DatePicker
                    value={this.state.endValue}
                    onChange={date => this.setState({endValue: date})}>
                    <List.Item arrow="horizontal">结束时间</List.Item>
                </DatePicker>

                <div className="comhline_sty"></div>
                <div onChange={this.handelValueCom}>
                    <textarea autoFocus="autoFocus" ref='leaveReason' className="form-control textarea_sty" rows="4"
                              placeholder="请填写请假理由…"></textarea>
                </div>
                <div className="comhline_sty"></div>
                {this.state.targetData.length > 0 ? <TargetSelect {...targetProps}/>
                    : <TargetSelect {...defaultTargetProps}/>}

                <UploadEnclosure
                    action={API.UPLOAD_FILE}
                    fileList={this.state.fileList}
                    count={9}
                    multiple={true}
                    beforeUpload={this.beforeUpload.bind(this)}
                    handleChange={this.handleChange.bind(this)}
                />

                <div className="flex_center margin_top_20">
                    <center><Button type="button" className="btn btn-primary comBtn_sty"
                                    onClick={this.onSubmitClick}>提交</Button></center>
                </div>
                {/*<div*/}
                    {/*onClick={this.clickLeaveList.bind(this)}*/}
                    {/*className="leave-history flex_center text_underline">*/}
                    {/*请假记录*/}
                {/*</div>*/}
            </div>
        )
    }

    onSubmitClick = (event) => {
        console.log('state', this.state)
        console.log('state', this.state.leaveType)
        if (this.state.leaveType == null || this.state.leaveType == '') {
            Toast.fail('请选择请假类型')
            return
        }
        if (this.state.startValue == null || this.state.startValue == '') {
            Toast.fail('请选择开始时间')
            return
        }
        if (this.state.endValue == null || this.state.endValue == '') {
            Toast.fail('请选择结束时间')
            return
        }
        var startT = new Date(this.state.startValue).getTime()
        var endT = new Date(this.state.endValue).getTime()
        // console.log('startT',startT)
        if (startT > endT) {
            Toast.fail('结束时间不可小于开始时间')
            return
        }
        if (this.state.leaveReason == null || this.state.leaveReason == '') {
            Toast.fail('请填写请假理由')
            return
        }
        if (!isObjEmpty(this.checkNodes)) {
            this.checkNodes.forEach((node, index) => {
                this.state.votePerson.push(node.userId)
            })
        } else {
            Toast.fail('请选择接收人')
            return
        }

        const approveFiles = []
        if (this.state.fileList) {
            this.state.fileList.forEach((value, index) => {
                approveFiles.push(value.picUrl)
            })
        }
        const params = {
            lvStatus:2,
            lvName: this.state.leaveName,
            lvType: this.state.leaveType[0],
            lvDetails: this.props.userInfo.userName + "的请假条",
            lvPro: this.props.userInfo.userId,
            lvApprover: JSON.stringify(this.state.votePerson[0]),
            lvFiles: approveFiles,
            lvRemarks: this.state.leaveReason,
            startDate: moment(this.state.startValue).format('YYYY-MM-DD HH:mm:ss'),
            endDate: moment(this.state.endValue).format('YYYY-MM-DD HH:mm:ss'),

        }
        console.log('param', params)
        fetchPost(API.leaveCreate, {
            leaveString:JSON.stringify(params)
        }, {}).then((response) => {
            console.log('response', response)
            if (response.success) {
                Toast.show(response.data, 1)
                // this.props.history.push("/leaveList/" + this.props.match.params.role)
                // this.props.history.push("/homePage")
                // this.backTask = setTimeout(() => {
                //     this.props.history.goBack()
                // }, 2000)
            }
        }).catch((error) => {
            console.log('error', error)
            if (typeof error === 'string') {
                Toast.fail(error, 2)
            } else {
                Toast.fail('请求异常', 2)
            }
        })
    }

    beforeUpload = (file, fileList) => {

    }

    clickLeaveList() {
        this.props.history.push("/leaveList/" + this.props.match.params.role)
    }

    onTargetFocus = (e) => {
        if (isObjEmpty(this.state.targetData)) {
            getOrganization(ORGANIZATION_TEACHER, this.props.userInfo.userId, false)
                .then(organization => {
                    this.setState({
                        targetData: organization.teachers,
                    })
                }).catch(error => {

            })
        }
    }


    onTargetChange = (value, label, checkNodes, count) => {
        this.checkNodes = checkNodes
        this.setState({
            targetList: value,
            targetCount: count
        });
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
    handleSelectChange = (value) => {
        console.log('value', value)
        this.setState({
            leaveType: value
        }, function () {
            var ln = null;
            switch (value[0]) {
                case "1":
                    ln = "事假"
                    break;
                case "2":
                    ln = "病假"
                    break;
                case "3":
                    ln = "丧假"
                    break;
                case "4":
                    ln = "陪产假"
                    break;
                default:
                    break;
            }
            this.setState({
                leaveName: ln
            })
        })
    }
    handelValueCom = (event) => {
        //获取用户名的值
        let leaveReason = this.refs.leaveReason.value;
        //获得内容的值
        this.setState({
            leaveReason: leaveReason,
        })
    }

}


let mapStateToProps = (state) => ({
    userInfo: {...state.redUserInfo}
})

let mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(LeaveAddCPage)