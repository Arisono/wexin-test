/**
 *   Created by FANGlh on 2018/11/9 19:35.
 */

import React, {Component} from 'react';
import {Select, Icon, Upload, Modal,Button} from 'antd';
import nextArrowimg from '../../../style/imgs/next_arrow.png';
import './FieldTrip.css';
import {Toast, Picker, List, DatePicker} from 'antd-mobile';
import {fetchPost, fetchGet, fetchGetNoSession} from '../../../utils/fetchRequest';
import {_baseURL, API} from '../../../configs/api.config';
import UploadEnclosure from '../../../components/UploadEnclosure';
import moment from 'moment';
import {connect} from 'react-redux';
import {getIntValue, getStrValue, isObjEmpty} from "../../../utils/common";
import TargetSelect from '../../../components/TargetSelect';
import {getOrganization} from "../../../utils/api.request";
import {ORGANIZATION_TEACHER} from "../../../utils/api.constants";

const nowTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
const Option = Select.Option;

class FieldTrip extends Component {
    componentWillMount() {
        document.title = '外勤出差'
    }

    constructor() {
        super();
        this.state = {
            votePerson: [],
            targetData: [],
            tripType: [],
            startValue: null,
            endValue: null,
            Tdurntion: null,
            tripsHours: null,
            tripsReason: null,
            Receiver: null,
            previewVisible: false,
            previewImage: '',
            fileList: [], //附件
            typeList: [
                {
                    label: '外出申请',
                    value: 1
                }, {
                    label: '出差申请',
                    value: 2
                }
            ],
            /* receiverPerson:[{
                 label: '吴彦祖',
                 value: 5
             },{
                 label: '陈冠希',
                 value:6
             },{
                 label: '古天乐',
                 value:7
             }]*/
        };

    }

    componentDidMount() {
        this.node.scrollIntoView();
        getOrganization(ORGANIZATION_TEACHER, this.props.userInfo.userId, false)
            .then(organization => {
                this.setState({
                    targetData: organization.teachers,
                })
            }).catch(error => {

        })
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
            <div className='common-column-layout' onChange={this.handelValueCom} ref={node => this.node = node }>
                <div className="common-column-layout">
                    <Picker
                        data={this.state.typeList} title='出差类型' extra='请选择'
                        value={this.state.tripType}
                        onChange={this.handleSelectChange} cols={1}>
                        <List.Item arrow="horizontal">出差类型</List.Item>
                    </Picker>
                </div>

                <div className="comhline_sty1"></div>
                <DatePicker
                    value={this.state.startValue}
                    locale={{
                        okText: '确定',
                        dismissText: '取消'
                    }}
                    onChange={this.setStartDate}>
                    <List.Item arrow="horizontal">开始时间</List.Item>
                </DatePicker>
                <div className="comhline_sty1"></div>
                <DatePicker
                    value={this.state.endValue}
                    locale={{
                        okText: '确定',
                        dismissText: '取消'
                    }}
                    onChange={this.setEndDate}>
                    <List.Item arrow="horizontal">结束时间</List.Item>
                </DatePicker>

                <div className="comhline_sty1"></div>

                <div className="item_sty">
                    <div style={{width: 150, color: "#666666", fontSize: '15px'}}>时长(h)</div>
                    <div className="text-right" style={{width: "100%",}}>{this.state.tripsHours}
                        {this.state.Tdurntion}<img src={nextArrowimg} className="nextarr_sty"/>
                    </div>
                </div>
                <div className="comhline_sty"></div>

                <textarea ref='tripsReason' className="form-control textarea_sty" rows="5" placeholder="请填写出差事由…"
                          value={this.state.tripsReason}></textarea>
                <div className="comhline_sty1"></div>
                {this.state.targetData.length > 0 ? <TargetSelect {...targetProps}/>
                    : <TargetSelect {...defaultTargetProps}/>}
                {/*<div className="common-column-layout">*/}
                {/*<Picker*/}
                {/*data={this.state.receiverPerson} title='接收人' extra='请选择'*/}
                {/*value={this.state.Receiver}*/}
                {/*onChange={this.handleSelectChange1}*/}
                {/*onOk={this.handleSelectChange1} cols={1}>*/}
                {/*<List.Item arrow="horizontal" >接收人</List.Item>*/}
                {/*</Picker>*/}
                {/*</div>*/}
                <div className="comhline_sty"></div>

                    <UploadEnclosure
                        action={API.UPLOAD_FILE}
                        fileList={this.state.fileList}
                        count={9}
                        multiple={true}
                        beforeUpload={this.beforeUpload.bind(this)}
                        handleChange={this.handleChange.bind(this)}
                    />


                {/*<center>*/}
                    <Button className='commonButton' type='primary' style={{margin: '35px'}}
                            onClick={this.doSaveClick}>提交</Button>
                    {/*<button type="button" className="btn btn-primary comBtn_sty" onClick={this.doSaveClick}>提交</button>*/}
                {/*</center>*/}

            </div>
        )
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
    //提交
    doSaveClick = () => {
        console.log('state', this.state)
        // console.log('startValue',this.state.startValue)
        if (this.state.tripType == null || this.state.tripType.trim().length == 0) {
            Toast.fail('请选择出差类型')
            return
        }
        if (this.state.startValue == null || this.state.startValue.trim().length == 0) {
            Toast.fail('请选择开始时间')
            return
        }
        if (this.state.endValue == null || this.state.endValue.trim().length == 0) {
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
        if (this.state.tripsReason == null || this.state.tripsReason.trim().length == 0) {
            Toast.fail('请输入出差事由')
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

        var params = {
            appType: this.state.tripType[0],
            approveName: this.state.tripType[0] == 1 ? "外出申请":"出差申请",
            approveDetails: this.state.tripsReason,
            approveType: 1,
            proposer: this.props.userInfo.userId,
            approver: this.state.votePerson[0],
            startDate: moment(this.state.startValue).format('YYYY-MM-DD HH:mm:ss'),
            endDate: moment(this.state.endValue).format('YYYY-MM-DD HH:mm:ss'),
            approveFiles: approveFiles
        }
        console.log('param', {
            oaString: params
        })
        fetchPost(API.oaCreate, {
            oaString: JSON.stringify(params)
        }, {})
            .then((response) => {
                console.log('response', response)
                if (response.success) {
                    Toast.show(response.data, 1)
                    this.backTask = setTimeout(() => {
                        this.props.history.goBack()
                    }, 1000)
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
    setStartDate = (value) => {
        this.setthisTime(value, null)
    }
    setEndDate = (value) => {
        this.setthisTime(null, value)
    }
    setthisTime = (stT, enT) => {
        this.setState({
            startValue: stT == null ? this.state.startValue : stT,
            endValue: enT == null ? this.state.endValue : enT
        }, function () {
            var startT = new Date(this.state.startValue).getTime()
            var endT = new Date(this.state.endValue).getTime()
            // console.log('startT',startT)
            // console.log('endT',endT)
            if (startT > endT && stT == null) {
                Toast.show('结束时间不可小于开始时间', 1)
                return
            } else if (startT != 0 && endT != 0) {
                var Tdurntion = parseInt((endT - startT) / (1000 * 60 * 60))
                this.setState({
                    Tdurntion: Tdurntion
                })
            }
        })
    }
    handleSelectChange = (value) => {
        console.log('handleSelectChange', value)
        this.setState({
            tripType: value
        }, function () {
            console.log('tripType', this.state.tripType)
        })
    }
    handleSelectChange1 = (value) => {
        console.log('handleSelectChange1', value)
        this.setState({
            Receiver: value
        }, function () {
            console.log('Receiver', this.state.Receiver)
        })
    }
    handelValueCom = (event) => {
        //获取用户名的值
        let tripsReason = this.refs.tripsReason.value;
        //获得内容的值
        this.setState({
            tripsReason: tripsReason
        })
    }

    componentWillUnmount() {
        Toast.hide()
        clearTimeout(this.backTask)
    }

    onChange = (field, value) => {
        this.setState({
            [field]: value,
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

    handleCancel = () => this.setState({previewVisible: false})

}

let mapStateToProps = (state) => ({
    userInfo: {...state.redUserInfo}
})

let mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(FieldTrip)