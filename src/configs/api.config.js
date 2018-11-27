/**
 * Created by RaoMeng on 2018/11/21
 * Desc: 项目接口
 */

export const _baseURL = 'http://192.168.253.130:8099'

export const API = {
    //获取验证码
    SEND_CODE: _baseURL + '/user/sendCode',
    //获取openId
    GET_OPENID: _baseURL + '/wxPay/getOpenid',
    //绑定学号
    BIND_STUDENTID: _baseURL + '/user/bindStudentId',
    //绑定工号
    BIND_TEACHERID: _baseURL + '/user/bindTeacherId',
    //3作业发布 4通知公告 5 校长信箱 6会议
    GET_MEETING_LIST: _baseURL + '/notify/getMeetingList',
    //1系统信息 2使用帮助
    SYSTEM_MESSAGE:_baseURL+'/notify/systemMessage',
    //消费记录/充值记录
    CONSUME_RECODE: _baseURL + '/payRank/consumeRecode',

   //根据学号取课程表
    curriculumListByStuId:_baseURL + '/curriculum/curriculumListByStuId',
    //查询学生出入校记录
    RecordOutgoingList:_baseURL + '/recordOutgoing/RecordOutgoingList',
    //创建投票单
    voteCreate:_baseURL + '/vote/voteCreate',
    //充值，缴费记录
    rechargeRecord:_baseURL + '/payRank/consumeRecode'

}


