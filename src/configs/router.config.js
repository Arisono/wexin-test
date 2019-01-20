import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import AppHomePage from "../modules/home/AppHomePage";
import BindMenu from "../modules/accountBind/BindMenu";
import AccountBind from "../modules/accountBind/AccountBind";
import NewAlbum from "../modules/album/NewAlbum";
import UploadImage from "../modules/album/UploadImage";
import UploadVideo from "../modules/video/UploadVideo";
import ClassAlbum from "../modules/album/ClassAlbum";
import PictureList from "../modules/album/PictureList";
import VideoPlayer from "../modules/video/VideoPlayer";
import PrincipalMailbox from "../modules/principalMailbox/PrincipalMailbox";
import MeetingSignIn from "../modules/meeting/MeetingSignIn";
import PhonesSelect from "../modules/phonesBook/PhonesSelect";
import PhonesList from "../modules/phonesBook/PhonesList";
import LeaveListPage from "../modules/leave/LeaveListPage";
import ReleaseAssignmentPage from "../modules/homework/ReleaseAssignmentPage";
import AssignmentListPage from "../modules/homework/AssignmentListPage";
import AssignmentDetailPage from "../modules/homework/AssignmentDetailPage";
import LeaveApprovalPage from "../modules/leave/LeaveApprovalPage";
import LeaveAddPage from "../modules/leave/LeaveAddPage";
import VoteListPage from "../modules/vote/VoteListPage";
import SystemMessage from "../modules/message/SystemMessage";
import UseHelp from "../modules/message/UseHelp";
import AccessNotice from '../modules/hiPages/access-notice/AccessNotice';
import FieldTrip from '../modules/hiPages/field-trip/FieldTrip';
import ResApply from '../modules/hiPages/res_apply/ResApply';
import SendVote from '../modules/hiPages/send-vote/SendVote';
import SendMeet from '../modules/hiPages/sendMeetting/SendMeet';
import ClassSchedule from '../modules/hiPages/class-schedule/ClassSchedule';
import ScoreInquiry from '../modules/hiPages/score-inquiry/ScoreInquiry';
import Approvel from '../modules/hiPages/approvel/Approvel';
import ApprovelDetail from '../modules/hiPages/approvel-detail/ApprovelDetail';
import MeetDetail from '../modules/hiPages/meet-detail/MeetDetail';
import LeaveDetail from '../modules/hiPages/LeaveDetail/LeaveDetail';
import WonderMoment from "../modules/video/WonderMoment";
import NotifyBoardParent from "../modules/notificationCenter/NotifyBoardParent";
import ConsumeRePage from '../modules/consumeManager/ConsumeRePage'
import CampusCardRecharge from "../modules/payment/CampusCardRecharge";
import RechargeList from "../modules/payment/RechargeList";
import RechargeRelease from "../modules/payment/RechargeRelease";
import AnnounceRelease from "../modules/announce/AnnounceRelease";
import PrincipalHistory from "../modules/principalMailbox/PrincipalHistory";
import VoteDetailPage from "../modules/vote/VoteDetailPage";
import UserInfo from "../modules/user/UserInfo";
import PicturesWallItem from "../components/upload/PicturesWallItem";
import NotifyBoardTeacher from "../modules/notificationCenter/NotifyBoardTeacher";
import ClassRechargeList from "../modules/payment/ClassRechargeList";
import ClassRechargeDetail from "../modules/payment/ClassRechargeDetail";
import LeaveAddCPage from "../modules/leave/LeaveAddCPage";
import VoteListTabPage from "../modules/vote/VoteListTabPage";
import TestImagesViewer from "../modules/demo/TestImagesViewer";
import ImageGrid from "../components/image/ImageGrid";
import MobileUpload from "../components/upload/MobileUpload";
import MobileUploadDemo from "../modules/demo/MobileUploadDemo";
import HomePage from "../modules/home/HomePage";
import VoteListParent from "../modules/vote/VoteListParent";
import VoteListTeacher from "../modules/vote/VoteListTeacher";
import HomeWorkList from "../modules/homework/HomeWorkList";
import NotifyBoardDetail from "../modules/notificationCenter/NotifyBoardDetail";
import PhonesSearch from "../modules/phonesBook/PhonesSearch";
import ChangePhoneNumber from '../modules/hiPages/changephonenumber/ChangePhoneNumber';
import ScoreNotification from '../modules/hiPages/scorenotification/ScoreNotification';
import AccessNoticeDetail from '../modules/hiPages/accessnoticedetail/AccessNoticeDetail';
import ChartDemo from "../modules/chart/ChartDemo";


export default class RouteConfig extends Component {

    render() {
        return (
            <Router basename="/smart-school">
                <div>
                    <Route exact path='/' render={() => (
                        <Redirect to='/bindMenu/app/'/>
                    )}/>

                    {/*饶猛*/}
                    <Route path="/homePage" component={HomePage}/>{/*首页*/}

                    <Route path='/bindMenu/:type/:openid?/:token?' component={BindMenu}/>{/*绑定菜单页面*/}
                    <Route path='/accountBind/:type?' component={AccountBind}/>{/*绑定页面*/}

                    <Route path='/newAlbum/:classId/:name?' component={NewAlbum}/>{/*新建相册*/}
                    <Route path='/uploadImage/:albumId' component={UploadImage}/>{/*照片上传*/}
                    <Route path='/classAlbum/:type?' component={ClassAlbum}/>{/*班级相册*/}
                    <Route path='/pictureList/:type/:albumId/:title?' component={PictureList}/>{/*相册详情*/}
                    <Route path='/uploadVideo/:classId/:name?' component={UploadVideo}/>{/*视频上传*/}
                    <Route path='/videoPlayer/:title?' component={VideoPlayer}/>{/*视频播放*/}

                    <Route path='/phonesSelect' component={PhonesSelect}/>{/*教师端通讯录*/}
                    <Route path='/phonesList/:type/:classId?/:classTitle?' component={PhonesList}/>{/*家长端通讯录*/}
                    <Route path='/phonesSearch/:type' component={PhonesSearch}/>{/*通讯录搜索页面*/}

                    <Route path='/principalMailbox' component={PrincipalMailbox}/>{/*校长信箱*/}
                    <Route path='/meetingSignIn' component={MeetingSignIn}/>{/*会议列表*/}
                    <Route path='/systemMessage' component={SystemMessage}/>{/*系统消息*/}
                    <Route path='/useHelp' component={UseHelp}/>{/*使用帮助*/}
                    <Route path='/wonderMoment/:type?' component={WonderMoment}/>{/*精彩瞬间*/}
                    <Route path='/principalHistory' component={PrincipalHistory}/>{/*校长信箱历史投递*/}
                    <Route path='/campusCardRecharge/:type' component={CampusCardRecharge}/>{/*校园卡*/}
                    <Route path='/consumeRePage/:type/:cardId' component={ConsumeRePage}/>{/*校园卡 1:消费记录 2.充值记录*/}

                    <Route path='/rechargeList/:userId?' component={RechargeList}/>{/*家长端收费列表*/}
                    <Route path='/rechargeRelease' component={RechargeRelease}/>{/*发起收费*/}
                    <Route path='/classRechargeList' component={ClassRechargeList}/>{/*班级收费列表*/}
                    <Route path='/classRechargeDetail/:payId' component={ClassRechargeDetail}/>{/*收费详情*/}

                    <Route path='/announceRelease' component={AnnounceRelease}/>{/*新建通知公告*/}
                    <Route path='/notifyBoard/parent' component={NotifyBoardParent}/>{/*家长端通知公告列表*/}
                    <Route path='/notifyBoard/teacher' component={NotifyBoardTeacher}/>{/*教师端通知公告列表*/}
                    <Route path='/notifyDetail/:notifyId' component={NotifyBoardDetail}/>{/*通知公告详情*/}

                    <Route path='/userInfoPage/:type?' component={UserInfo}/>{/*个人信息*/}
                    <Route path='/releaseAssignment' component={ReleaseAssignmentPage}/>{/*作业发布*/}
                    <Route path='/assignmentList/:role' component={HomeWorkList}/>{/*作业列表*/}
                    <Route path='/assignmentDetail/:role/:id' component={AssignmentDetailPage}/>{/*作业详情*/}
                    <Route path='/voteList' component={VoteListParent}/>{/*家长端投票列表*/}
                    <Route path='/voteListTab' component={VoteListTeacher}/>{/*教师端投票列表*/}
                    <Route path="/voteDetail/:id" component={VoteDetailPage}/>{/*投票详情*/}

                    {/*测试demo*/}
                    <Route path='/chartDemo' component={ChartDemo}/>{/*图表测试页面*/}

                    {/*方龙海*/}
                    <Route path='/access-notice/:stuId?' component={AccessNotice}/> {/*进出校通知*/}
                    <Route path='/field-trip' component={FieldTrip}/> {/*//外勤出差*/}
                    <Route path='/res_apply' component={ResApply}/>{/*//用品申请*/}
                    <Route path='/send-vote' component={SendVote}/>{/*//发起投票*/}
                    <Route path='/sendMeetting' component={SendMeet}/> {/*//发起会议*/}
                    <Route path='/class-schedule' component={ClassSchedule}/> {/*//课程表*/}
                    <Route path='/score-inquiry' component={ScoreInquiry}/> {/*//成绩查询*/}
                    <Route path='/approvel' component={Approvel}/>{/*我的审批*/}
                    <Route path='/approvel-detail/:approveId/:isMyApply' component={ApprovelDetail}/> {/*审批详情*/}
                    <Route path='/meet-detail/:meetId?' component={MeetDetail}/> {/*会议签到详情 meetingSignIn*/}
                    <Route path='/leavedetail/:lvId/:role' component={LeaveDetail}/> {/*学生请假详情*/}
                    <Route path="/changephonenumber" component={ChangePhoneNumber}/> {/*更换手机号码*/}
                    <Route path="/scorenotification/:stuId?" component={ScoreNotification}/> {/*成绩通知*/}
                    {/*<Route path="/accessnoticedetail/:stuId?" component={AccessNoticeDetail}/>     /!*出入校通知详情*!/*/}
                    <Route path="/accessnoticedetail" component={AccessNoticeDetail}/> {/*出入校通知详情*/}

                    <Route path='/leaveAddC' component={LeaveAddCPage}/>{/*老师请假*/}
                    <Route path='/leaveAdd' component={LeaveAddPage}/>   {/*学生请假*/}
                    <Route path='/leaveList/:role' component={LeaveListPage}/>{/*学生请假列表*/}


                    {/*刘杰*/}
                    <Route path={"/MobileUploadDemo"} component={MobileUploadDemo}/>
                    <Route path={"/MobileUpload"} component={MobileUpload}/>
                    <Route path={"/ImageGrid"} component={ImageGrid}/>
                    <Route path={"/TestImagesViewer"} component={TestImagesViewer}/>
                    <Route path={'/picturesWall'} component={PicturesWallItem}/>
                    <Route path='/leaveApproval' component={LeaveApprovalPage}/>

                </div>
            </Router>
        );
    }
}