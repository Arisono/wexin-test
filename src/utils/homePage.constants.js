/**
 * 教师端首页菜单
 * @type {Array}
 */
export const CONFIG_TEACHER_MENU = [
    {
        groupText: '家校互动',
        groupIcon: require('imgs/ic_group_Interaction.png'),
        funcList: [
            {
                funcText: '通知公告',
                funcIcon: require('imgs/ic_notice_announce.png'),
                funcPage: '/notifyBoard/teacher'
            },
            {
                funcText: '作业发布',
                funcIcon: require('imgs/ic_homework_release.png'),
                funcPage: '/assignmentList/teacher'
            },
            /*{
                funcText: '班级交费',
                funcIcon: require('imgs/ic_class_payment.png'),
                funcPage: '/classRechargeList'
            },*/
            {
                funcText: '投票助手',
                funcIcon: require('imgs/ic_vote_helper.png'),
                funcPage: '/voteListTab'
            },
            {
                funcText: '学生请假条',
                funcIcon: require('imgs/ic_student_leave.png'),
                funcPage: '/leaveList/teacher'
            },
            {
                funcText: '班级相册',
                funcIcon: require('imgs/ic_class_album.png'),
                funcPage: '/classAlbum/teacher'
            },
            /*{
                funcText: '精彩瞬间',
                funcIcon: require('imgs/ic_wonder_moment.png'),
                funcPage: '/wonderMoment/teacher'
            },*/
        ]
    }, {
        groupText: '校园OA',
        groupIcon: require('imgs/ic_group_campus.png'),
        funcList: [
            {
                funcText: '我的审批',
                funcIcon: require('imgs/ic_my_approval.png'),
                funcPage: '/approvel'
            },
            {
                funcText: '会议管理',
                funcIcon: require('imgs/ic_meeting_manage.png'),
                funcPage: '/meetingSignIn'
            },
            {
                funcText: '请假申请',
                funcIcon: require('imgs/ic_leave_apply.png'),
                funcPage: '/leaveAddC'
            },
            {
                funcText: '出差申请',
                funcIcon: require('imgs/ic_business_trip_apply.png'),
                funcPage: '/field-trip'
            },
            {
                funcText: '用品申请',
                funcIcon: require('imgs/ic_supply_apply.png'),
                funcPage: '/res_apply'
            },
            {
                funcText: '通讯录',
                funcIcon: require('imgs/ic_mail_list.png'),
                funcPage: '/phonesSelect'
            },
            /*{
                funcText: '校园卡',
                funcIcon: require('imgs/ic_campus_card.png'),
                funcPage: '/campusCardRecharge/teacher'
            },
            {
                funcText: '课表查询',
                funcIcon: require('imgs/ic_timetable_query.png'),
                funcPage: '/class-schedule'
            },*/
        ]
    }
]

/**
 * 家长端首页菜单
 * @type {Array}
 */
export const CONFIG_PARENT_MENU = [
    {
        groupText: '家校互动',
        groupIcon: require('imgs/ic_group_Interaction.png'),
        funcList: [
            {
                funcText: '出入校通知',
                funcIcon: require('imgs/ic_entry_exit.png'),
                funcPage: '/access-notice'
            },
            {
                funcText: '通知公告',
                funcIcon: require('imgs/ic_notice_announce.png'),
                funcPage: '/notifyBoard/parent'
            },
            {
                funcText: '成绩通知',
                funcIcon: require('imgs/ic_score_notice.png'),
                funcPage: '/score-inquiry'
            },
            {
                funcText: '作业通知',
                funcIcon: require('imgs/ic_homework_release.png'),
                funcPage: '/assignmentList/parent'
            },
            /*{
                funcText: '交费通知',
                funcIcon: require('imgs/ic_payment_notice.png'),
                funcPage: '/rechargeList'
            },*/
            {
                funcText: '学生请假条',
                funcIcon: require('imgs/ic_student_leave.png'),
                funcPage: '/leaveList/parent'
            },
            {
                funcText: '投票助手',
                funcIcon: require('imgs/ic_vote_helper.png'),
                funcPage: '/voteList'
            },
        ]
    }, {
        groupText: '校园服务',
        groupIcon: require('imgs/ic_group_campus.png'),
        funcList: [
            {
                funcText: '老师通讯录',
                funcIcon: require('imgs/ic_mail_list.png'),
                funcPage: '/phonesList/parent'
            },
            /*{
                funcText: '入校登记',
                funcIcon: require('imgs/ic_admission_registration.png'),
                funcPage: ''
            },*/
            {
                funcText: '课表查询',
                funcIcon: require('imgs/ic_timetable_query.png'),
                funcPage: '/class-schedule'
            },
            /*{
                funcText: '成绩查询',
                funcIcon: require('imgs/ic_score_query.png'),
                funcPage: '/score-inquiry'
            },*/
            /*{
                funcText: '校园卡',
                funcIcon: require('imgs/ic_campus_card.png'),
                funcPage: '/campusCardRecharge/parent'
            },*/
            {
                funcText: '班级相册',
                funcIcon: require('imgs/ic_class_album.png'),
                funcPage: '/classAlbum/parent'
            },
            /*{
                funcText: '精彩瞬间',
                funcIcon: require('imgs/ic_wonder_moment.png'),
                funcPage: '/wonderMoment/parent'
            },*/
            {
                funcText: '校长信箱',
                funcIcon: require('imgs/ic_principal_mailbox.png'),
                funcPage: '/principalMailbox'
            },
        ]
    }
]

export const CONFIG_HOME_TOP_MENU = [{
    icon: require('imgs/ic_personal_info.png'),
    text: '个人信息',
    page: '/userInfoPage'
}, {
    icon: require('imgs/ic_use_help.png'),
    text: '使用帮助',
    page: '/useHelp'
}, {
    icon: require('imgs/ic_system_message.png'),
    text: '系统消息',
    page: '/systemMessage'
},]