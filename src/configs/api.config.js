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
    SYSTEM_MESSAGE: _baseURL + '/notify/systemMessage',
    //获取班级列表
    GET_CLASS_LIST: _baseURL + '/school/getClassList',
    //获取班级相册列表
    GET_ALBUM_LIST: _baseURL + '/picture/getAlbumList',
    //获取相册内所有图片
    GET_PICTURE_LIST: _baseURL + '/picture/getPictureList',
    //文件上传地址
    UPLOAD_FILE: _baseURL + '/file/uploadFile',
    //修改相册
    UPDATE_ALBUM: _baseURL + '/picture/updateAlbum',
    //删除附件
    DELETE_FILE: _baseURL + '/picture/deleteFile',
    //新建相册
    NEW_CLASS_ALBUM: _baseURL + '/picture/newClassAlbum',
    //视频上传
    INSERT_VIDEO: _baseURL + '/picture/insertVideo',
    //作业 /会议/通知等详情
    TASK_DETAIL: _baseURL + '/notify/taskDetail',
    //发布通知公告/发布作业/创建会议
    ISSUE_NOTIFICATION: _baseURL + '/notify/issueNotification',
    //发布缴费
    PAYMENT_PAYFEE: _baseURL + '/payment/payFee',
    //收费列表家长端
    PAYMENT_PAYMENTLIST: _baseURL + '/payment/paymentList',
    //收费列表教师端
    PAYMENT_PAYMENTLIST_TEACHER: _baseURL + '/payment/paymentListByUserId',
    //收费详情
    PAYMENT_PAYMENT_DETAIL: _baseURL + '/payment/paymentDetails',
    //结束收款
    PAYMENT_ENTPAY: _baseURL + '/payment/endPay',
    //获取所有老师的电话
    TEACHER_PHONES_LIST:_baseURL+'/user/getTeacherPhoneList',
    //获取相应班级老师电话号码
    GET_TEACHER_PHONES: _baseURL + '/user/getTeacherPhones',
    //获取班级家长手机号
    GET_PARENT_PHONES: _baseURL + '/user/getParentPhones',
    //会议签到
    MEETING_SIGN:_baseURL+'/notify/meetingSign',



    //消费记录/充值记录
    CONSUME_RECODE: _baseURL + '/payRank/consumeRecode',

    //根据学号取课程表
    curriculumListByStuId: _baseURL + '/curriculum/curriculumListByStuId',
    //查询学生出入校记录
    RecordOutgoingList: _baseURL + '/recordOutgoing/RecordOutgoingList',
    //充值，缴费记录
    rechargeRecord: _baseURL + '/payRank/consumeRecode',
    //分页显示会议 /分页显示作业 /分页显示通知
    notifyMessage: _baseURL + '/notify/getMeetingList',

    //创建投票单
    voteCreate: _baseURL + '/vote/voteCreate',
    voteList: _baseURL + "/vote/voteList",
    voteDetail: _baseURL + "/vote/voteList",
    //发布作业
    homeWorkAdd: _baseURL + "/notify/issueNotification",
    homeWorkList: _baseURL + "/notify/getMeetingList",
    homeWorkDetail: _baseURL + "/notify/taskDetail",
    //留言功能
    messageCreate: _baseURL + "/leaveMessage/messageCreate",
    messageList: _baseURL + "/leaveMessage/getMessageListByNotifyId",
    //学生请假
    leaveCreate: _baseURL + "/leave/leaveCreate",
    leaveList: _baseURL + "/leave/leaveList",

    //发布通知公告/发布作业/创建会议
    issueNotification: _baseURL + '/notify/issueNotification',
    //成绩查询
    getScoreByStuId: _baseURL + '/score/getScoreByStuId',

    //OA单据创建
    oaCreate: _baseURL + '/oaApprove/oaCreate',
    //审批列表
    oaApproveList:_baseURL + '/oaApprove/oaList',
    //审批操作
    doapprove:_baseURL+'/oaApprove/approve',
    //审批单详情
    oaDetails:_baseURL + '/oaApprove/oaDetails'
}


