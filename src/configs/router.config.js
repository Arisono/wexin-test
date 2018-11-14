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
import WonderMoment from "../modules/video/WonderMoment";
import ConsumeRePage from "../modules/consumeManager/ConsumeRePage";
import NotifyBoard from "../modules/notificationCenter/NotifyBoard";
import ConsumeRePage from '../modules/consumeManager/ConsumeRePage'
import CampusCardRecharge from "../modules/payment/CampusCardRecharge";
import RechargeList from "../modules/payment/RechargeList";
import RechargeRelease from "../modules/payment/RechargeRelease";
import AnnounceRelease from "../modules/announce/AnnounceRelease";

export default class RouteConfig extends Component {

    render() {
        return (
            <Router basename="/smart-school/">
                <div>
                    <Route exact path="/" component={AppHomePage}/>

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

                    <Route path='/campusCardRecharge' component={CampusCardRecharge}/>
                    <Route path='/rechargeList' component={RechargeList}/>
                    <Route path='/rechargeRelease' component={RechargeRelease}/>
                    <Route path='/announceRelease' component={AnnounceRelease}/>

                    {/*刘杰*/}

                    <Route path='/voteList' component={VoteListPage}/>
                    <Route path='/leaveAdd' component={LeaveAddPage}/>
                    <Route path='/leaveApproval' component={LeaveApprovalPage}/>
                    <Route path='/leaveList' component={LeaveListPage}/>

                    <Route path='/releaseAssignment' component={ReleaseAssignmentPage}/>
                    <Route path='/assignmentList' component={AssignmentListPage}/>
                    <Route path='/assignmentDetail' component={AssignmentDetailPage}/>
                    {/*方龙海*/}
                    <Route path='/access-notice' component={AccessNotice}/>
                    <Route path='/field-trip' component={FieldTrip}/>
                    <Route path='/res_apply' component={ResApply}/>
                    <Route path='/phonesList/send-vote' component={SendVote}/>
                    <Route path='/sendMeetting' component={SendMeet}/>
                    <Route path='/class-schedule' component={ClassSchedule}/>
                    <Route path='/score-inquiry' component={ScoreInquiry}/>
                    {/*刘金龙*/}
                    <Route path='/consumeRePage' component={ConsumeRePage}/>
                    <Route path='/notifyBoPage' component={NotifyBoard}/>
                </div>
            </Router>
        );
    }
}