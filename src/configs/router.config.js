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
import ApprovelDetail from  '../modules/hiPages/approvel-detail/ApprovelDetail';
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


export default class RouteConfig extends Component {

    render() {
        return (
            <Router basename="/smart-school">
                <div>
                    <Route exact path='/' render={() => (
                        <Redirect to='/bindMenu'/>
                    )}/>

                    {/*饶猛*/}
                    <Route path='/bindMenu' component={BindMenu}/>
                    <Route path='/accountBind/:type?' component={AccountBind}/>
                    <Route path='/newAlbum' component={NewAlbum}/>
                    <Route path='/uploadImage' component={UploadImage}/>
                    <Route path='/uploadVideo' component={UploadVideo}/>
                    <Route path='/classAlbum' component={ClassAlbum}/>
                    <Route path='/pictureList/:title?' component={PictureList}/>
                    <Route path='/videoPlayer/:title?' component={VideoPlayer}/>
                    <Route path='/principalMailbox' component={PrincipalMailbox}/>
                    <Route path='/meetingSignIn' component={MeetingSignIn}/>
                    <Route path='/phonesSelect' component={PhonesSelect}/>
                    <Route path='/phonesList/:classTitle?' component={PhonesList}/>
                    <Route path='/systemMessage' component={SystemMessage}/>
                    <Route path='/useHelp' component={UseHelp}/>
                    <Route path='/wonderMoment' component={WonderMoment}/>
                    <Route path='/principalHistory' component={PrincipalHistory}/>

                    <Route path='/campusCardRecharge' component={CampusCardRecharge}/>
                    <Route path='/rechargeList' component={RechargeList}/>
                    <Route path='/rechargeRelease' component={RechargeRelease}/>
                    <Route path='/announceRelease' component={AnnounceRelease}/>
                    <Route path='/classRechargeList' component={ClassRechargeList}/>
                    <Route path='/classRechargeDetail' component={ClassRechargeDetail}/>

                    {/*刘杰*/}
                    <Route path={'/picturesWall'} component={PicturesWallItem}/>
                    <Route path="/voteDetail" component={VoteDetailPage}/>
                    <Route path="/homePage" component={AppHomePage}/>
                    <Route path='/voteList' component={VoteListPage}/>
                    <Route path='/leaveAddC' component={LeaveAddCPage}/>
                    <Route path='/leaveAdd' component={LeaveAddPage}/>
                    <Route path='/leaveApproval' component={LeaveApprovalPage}/>
                    <Route path='/leaveList' component={LeaveListPage}/>

                    <Route path='/releaseAssignment' component={ReleaseAssignmentPage}/>
                    <Route path='/assignmentList' component={AssignmentListPage}/>
                    <Route path='/assignmentDetail' component={AssignmentDetailPage}/>

                    {/*方龙海*/}
                    <Route path='/access-notice' component={AccessNotice}/> {/*进出校通知*/}
                    <Route path='/field-trip' component={FieldTrip}/> {/*//外勤出差*/}
                    <Route path='/res_apply' component={ResApply}/>{/*//用品申请*/}
                    <Route path='/send-vote' component={SendVote}/>{/*//发起投票*/}
                    <Route path='/sendMeetting' component={SendMeet}/>  {/*//发起会议*/}
                    <Route path='/class-schedule' component={ClassSchedule}/> {/*//课程表*/}
                    <Route path='/score-inquiry' component={ScoreInquiry}/> {/*//成绩通知*/}
                    <Route path='/approvel' component={Approvel}/>{/*审批*/}
                    <Route path='/approvel-detail' component={ApprovelDetail}/> {/*审批详情*/}

                    {/*刘金龙*/}
                    <Route path='/consumeRePage' component={ConsumeRePage}/>
                    <Route path='/notifyBoard/parent' component={NotifyBoardParent}/>
                    <Route path='/notifyBoard/teacher' component={NotifyBoardTeacher}/>
                    {/*龚鹏明*/}
                    {/*type  1:老师  2.家长*/}
                    <Route path='/userInfoPage/:type?' component={UserInfo}/>
                </div>
            </Router>
        );
    }
}