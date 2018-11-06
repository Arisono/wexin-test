/**
*   Created by FANGlh on 2018/11/6 15:47.
*/

import React,{Component} from 'react';
import nextArrowimg from '../../../style/imgs/next_arrow.png';
import './SendMeet.css';
import  icon_group from '../../../style/imgs/icon_group.png'

export default class SendMeet extends Component{
    constructor(){
        super();
    }


    render(){
        return(
            <div >
                <div>
                    <textarea class="form-control textarea_sty" rows="2" placeholder="请填写会议主题…" ></textarea>
                    <textarea class="form-control textarea_sty" rows="3" placeholder="请填写会议地址…"></textarea>
                    <div className="comhline_sty"></div>
                    <div  className="item_sty">
                        <div style={{width:150}}>会议开始时间:</div>
                        <div class="text-right" style={{width:"100%",}}>2018-11-07 09:00:00<img src={nextArrowimg} className="nextarr_sty"/></div>
                    </div>
                    <div className="comhline_sty1"></div>

                    <div  className="item_sty">
                        <div style={{width:150}}>会议结束时间:</div>
                        <div class="text-right" style={{width:"100%",}}>2018-11-07 10:00:00<img src={nextArrowimg} className="nextarr_sty"/></div>
                    </div>
                    <div className="comhline_sty1"></div>

                    <div  className="item_sty">
                        <div style={{width:150}}>提醒:</div>
                        <div class="text-right" style={{width:"100%",}}>开会前15分钟<img src={nextArrowimg} className="nextarr_sty"/></div>
                    </div>
                    <div className="comhline_sty1"></div>

                    <span className="item_sty">与会人</span>

                    <div className="meet_penson">
                        <img className="meet_penson_img" src={"https://upload-images.jianshu.io/upload_images/1131704-eb8f2d63ed00682d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"} alt=""/>
                        <img className="meet_penson_img" src={"https://upload-images.jianshu.io/upload_images/1131704-eb8f2d63ed00682d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"} alt=""/>
                        <img className="meet_penson_img" src={"https://upload-images.jianshu.io/upload_images/1131704-eb8f2d63ed00682d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"} alt=""/>
                    </div>
                    <center><button type="button" class="btn btn-primary comBtn_sty">创建</button></center>
                </div>
            </div>
        )
    }
}