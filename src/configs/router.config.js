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
import ConsumeRePage from '../modules/consumeManager/ConsumeRePage'
import CampusCardRecharge from "../modules/payment/CampusCardRecharge";
import RechargeList from "../modules/payment/RechargeList";

export default class RouteConfig extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={SendVote}/>

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

                    {/*刘杰*/}

                    {/*方龙海*/}
                    {/*进出校通知*/}
                    <Route path='/access-notice' component={AccessNotice}/>
                    {/*//外勤出差*/}
                    <Route path='/field-trip' component={FieldTrip}/>
                    {/*//用品申请*/}
                    <Route path='/res_apply' component={ResApply}/>
                    {/*//发起投票*/}
                    <Route path='/phonesList/send-vote' component={SendVote}/>
                    {/*//发起会议*/}
                    <Route path='/sendMeetting' component={SendMeet}/>
                    {/*//课程表*/}
                    <Route path='/class-schedule' component={ClassSchedule}/>
                    {/*//成绩通知*/}
                    <Route path='/score-inquiry' component={ScoreInquiry}/>

                    {/*刘金龙*/}
                    <Route path='/consumeRePage' component={ConsumeRePage}/>
                </div>
            </Router>
        );
    }
}