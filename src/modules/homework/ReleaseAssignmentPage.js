/**
 * Created by Arison on 2018/11/6.
 */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './ReleaseAssignmentPage.css'
import '../../style/css/app-gloal.css'
import moment from 'moment'
import {Input, Button, Icon, message} from 'antd';
import TargetSelect from "../../components/TargetSelect";
import {fetchPost, fetchGet} from '../../utils/fetchRequest';
import {_baseURL, API} from '../../configs/api.config';
import {isObjEmpty, getIntValue, getStrValue} from '../../utils/common';
import UploadEnclosure from 'components/UploadEnclosure'

import {Toast, DatePicker, List} from 'antd-mobile'
import {connect} from 'react-redux'

const {TextArea} = Input;

/**
 * 发布作业
 * Created by Arison on 17:47.
 */
class ReleaseAssignmentPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'ReleaseAssignmentPage',
            targetList: [],
            targetCount: 0,
            targetData: [],
            checkNodes: [],
            startDate: null,//当前时间
            endDate: null,//截止时间
            data: {
                notifyName: '',//标题
                notifyType: '3',//作业发布
                notifyDetails: '',//内容
                notifyCreator: '',//创建者
                notifyStatus: '2',//状态  2发布  1草稿
                userIds: [],//通知
                notifyFiles: [],
                startDate: '',//当前时间
                endDate: null//截止时间
            }

        }
    }

    componentWillMount() {
        document.title = "发布作业";
    }

    componentWillUnmount() {
        Toast.hide()

        clearTimeout(this.backTask)
    }

    handleChange = (file, fileList) => {
        if (fileList) {
            fileList.forEach((value, index) => {
                value.url = value.response ? (_baseURL + value.response.data) : value.url
                value.picUrl = value.response ? value.response.data : value.picUrl
            })

            this.setState({
                data: {
                    notifyFiles: fileList
                }
            })
        }

        /* this.state.data.notifyFiles.length = 0;
         for (let i = 0; i < fileList.length; i++) {
             if (fileList[i].status === "done") {
                 this.state.data.notifyFiles.push(fileList[i].response.data)
             }
         }*/
    }

    handleRemove = (file) => {
    }

    componentDidMount() {
        this.getOrganization();
    }


    changeName = (value) => {
        this.setState({
            data: {
                notifyName: value.target.value,//标题
                notifyType: '3',//作业发布
                notifyDetails: this.state.data.notifyDetails,//内容
                notifyCreator: '',//创建者
                notifyStatus: '2',//状态  2发布  1草稿
                userIds: ['10001', '10000', '10002', '10003'],//通知
                notifyFiles: [],
                startDate: '',//当前时间
                endDate: this.state.data.endDate//截止时间
            }
        })

    }

    changeContent = (value) => {
        this.setState({
            data: {
                notifyDetails: value.target.value,//标题
                notifyName: this.state.data.notifyName,//标题
                notifyType: '3',//作业发布
                notifyCreator: '10000',//创建者
                notifyStatus: '2',//状态  2发布  1草稿
                userIds: ['10001', '10000', '10002', '10003'],//通知
                notifyFiles: [],
                startDate: '',//当前时间
                endDate: this.state.data.endDate//截止时间
            }
        })
    }
    changeEndDateOk = (value) => {
        if (isObjEmpty(value)) {
            message.info("请选择日期");
            return
        }
    }

    changeEndDate = (value, dateString) => {
        this.setState({
            data: {
                notifyDetails: this.state.data.notifyDetails,//标题
                notifyName: this.state.data.notifyName,//标题
                notifyType: '3',//作业发布
                notifyCreator: '10000',//创建者
                notifyStatus: '2',//状态  2发布  1草稿
                userIds: JSON.stringify([10001, 10000, 10002, 10003]),//通知
                notifyFiles: [],
                startDate: '',//当前时间
                endDate: dateString,//标题
            }
        })
    }

    onTargetChange = (value, label, checkNodes, count) => {
        this.setState({
            targetList: value,
            targetCount: count,
            checkNodes: checkNodes
        });
    }

    commitAction = () => {
        if (isObjEmpty(this.state.data.notifyName)) {
            Toast.fail("请输入作业名称");
            return;
        }
        if (isObjEmpty(this.state.data.notifyDetails)) {
            Toast.fail('请输入作业内容...')
            return;
        }
        if (isObjEmpty(this.state.endDate)) {
            Toast.fail("请输入截止时间");
            return;
        }
        if (isObjEmpty(this.state.targetList)) {
            Toast.fail("请选择抄送对象");
            return;
        }
        let personArrays = [];
        if (!isObjEmpty(this.state.checkNodes)) {
            this.state.checkNodes.forEach((node) => {
                personArrays.push(node.userId)
            })
        }
        Toast.loading('正在发布...', 0)
        fetchPost(API.homeWorkAdd, {
            notifyName: this.state.data.notifyName,//标题
            notifyType: '3',//作业发布
            notifyDetails: this.state.data.notifyDetails,//内容
            notifyCreator: this.props.userInfo.userId,//创建者
            notifyStatus: '2',//状态
            endDate: moment(this.state.endDate).format('YYYY-MM-DD HH:mm:ss'),
            userIds: JSON.stringify(personArrays),//通知
            notifyFiles: JSON.stringify(this.state.data.notifyFiles)
        }).then((response) => {
            Toast.hide();
            if (response.success) {
                Toast.success("发布成功！")
                this.initPageData()

                this.backTask = setTimeout(() => {
                    this.props.history.goBack()
                }, 2000)
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

    goListAction = () => {
        //  this.props.history.push("/assignmentList/teacher");
        this.props.history.goBack();
    }

    onTargetFocus = (e) => {
        if (isObjEmpty(this.state.targetData)) {
            this.getOrganization()
        }
    }


    render() {
        const {targetCount, targetList, targetData, data} = this.state
        console.log("render()", targetData);
        const targetProps = {
            placeholder: '请选择抄送对象',
            targetData: targetData,
            targetValues: targetList,
            title: '抄送对象',
            targetCount: targetCount,
            onTargetChange: this.onTargetChange.bind(this),
            onTargetFocus: this.onTargetFocus.bind(this)
        }

        const defaultTargetProps = {
            targetData: [],
            targetValues: this.state.targetList,
            title: '抄送对象',
            targetCount: this.state.targetCount,
            onTargetChange: this.onTargetChange.bind(this),
            onTargetFocus: this.onTargetFocus.bind(this)
        }

        return <div className='common-column-layout' style={{paddingBottom: '40px'}}>
            <div className='gray-line'></div>
            {this.state.targetData.length > 0 ? <TargetSelect {...targetProps}/>
                : <TargetSelect {...defaultTargetProps}/>}
            <div className='gray-line'></div>
            <DatePicker
                value={this.state.endDate}
                locale={{
                    okText: '确定',
                    dismissText: '取消'
                }}
                onChange={date => this.setState({endDate: date})}>
                <List.Item arrow="horizontal">截止时间</List.Item>
            </DatePicker>
            <div className='gray-line'></div>
            <input placeholder="请输入作业名称" defaultValue={this.state.data.notifyName}
                   onChange={this.changeName}
                   className='titleInput'/>
            <div className='gray-line' style={{height: '1px'}}></div>
            <TextArea autosize={{minRows: 6, maxRows: 12}}
                      value={this.state.data.notifyDetails}
                      onChange={this.changeContent}
                      className='contentInput'
                      placeholder="请输入作业内容"/>
            <div className='gray-line'></div>
            <UploadEnclosure
                action={API.UPLOAD_FILE}
                fileList={data.notifyFiles}
                count={4}
                multiple={true}
                beforeUpload={this.beforeUpload.bind(this)}
                handleChange={this.handleChange.bind(this)}
            />

            <Button type="primary" onClick={this.commitAction}
                    style={{margin: '35px 35px 16px'}}
                    className='commonButton'>发布作业</Button>

            <span className='announce-release-history' onClick={this.goListAction}>历史发布</span>
        </div>
    }

    beforeUpload = (file, fileList) => {

    }

    initPageData = () => {
        this.setState({
            data: {
                notifyName: '',//标题
                notifyType: '3',//作业发布
                notifyDetails: '',//内容
                notifyCreator: '',//创建者
                notifyStatus: '2',//状态  2发布  1草稿
                userIds: [],//通知
                notifyFiles: [],
                startDate: '',//当前时间
                endDate: null//截止时间
            }
        })
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
                targetData
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
}

let mapStateToProps = (state) => ({
    userInfo: {...state.redUserInfo},
})

let mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(ReleaseAssignmentPage)