/**
 * Created by Arison on 2018/11/1.
 */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import  icon_group from '../../style/imgs/icon_group.png'
import  icon_menu from '../../style/imgs/icon_menu.png'
/**
 * Created by Arison on 2018/11/1.
 */
class AppHomePage extends React.Component{
       constructor(props){
        super(props);
    }
    render(){
        let borderLine={
            border:"1px solid #f4f4f4"};
        return <div className="container-fluid">
            {/*顶部Header*/}
            <div className="row">
                <div className="row">
                    <div className="col-xs-8 col-sm-8" style={borderLine}> </div>
                    <div className="col-xs-4 col-sm-4" style={borderLine}> 宝安区十八中</div>
                </div>
                <div className="row" style={borderLine}>
                    <div className="col-xs-2"  style={{marginBottom:"20px",marginTop:"20px"}}>
                        <img src={"https://upload-images.jianshu.io/upload_images/1131704-eb8f2d63ed00682d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"} style={{marginRight:"10px"}}  width={70} height={70} class="img-circle" />
                    </div>
                    <div className="col-xs-10">
                        <div style={{marginTop:"30px"}}><span style={{fontSize:"17px"}}>尊敬的小明家长</span>   <img src={icon_group} style={{marginRight:"10px"}}  width={12} height={12} /></div>

                           <img src={"https://upload-images.jianshu.io/upload_images/1131704-eb8f2d63ed00682d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"} style={{margin:"10px"}}  width={25} height={25} class="img-circle" />
                            <span>王涵</span>

                            <img src={"https://upload-images.jianshu.io/upload_images/1131704-eb8f2d63ed00682d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"} style={{margin:"10px"}}  width={25} height={25} class="img-circle" />
                            <span>王涵</span>


                    </div>
                </div>
                {/*个人信息*/}
                <div className="row">
                    <div className="col-xs-4" style={borderLine}>
                        <div style={{display:"flex",justifyContent:"center",alignItems:"center",margin:"8px"}}>
                            <img src={icon_group} style={{marginRight:"10px"}}  width={12} height={12} />
                            个人信息</div>
                        </div>
                    <div className="col-xs-4" style={borderLine}>
                        <div style={{display:"flex",justifyContent:"center",alignItems:"center",margin:"8px"}}>
                        <img src={icon_group} style={{marginRight:"10px"}}  width={12} height={12} />
                        使用帮助</div>
                        </div>
                    <div className="col-xs-4" style={borderLine}>
                        <div style={{display:"flex",justifyContent:"center",alignItems:"center",margin:"8px"}}>
                        <img src={icon_group} style={{marginRight:"10px"}}  width={12} height={12} />
                        系统消息
                        </div>
                    </div>
                </div>
            </div>
            {/*分割线*/}
            <div className="row" style={{background:"#DADADA",height:"10px"}}/>
            {/*家校互动*/}
            <div className="row">
                  <div className="row">
                      <div className="col-xs-12" style={{margin:"10px"}}>家校互动</div>
                  </div>
                {/*横向图文列表*/}
                <div className="row">
                    <div className="col-xs-3" style={borderLine}>
                        <div> <img src={icon_menu} style={{margin:"10px"}}  width={30} height={30} /></div>
                        <div>  <span style={{margin:"5px",fontSize:"13px"}}>出入校通知</span></div>
                    </div>
                    <div className="col-xs-3" style={borderLine}>
                        <div> <img src={icon_menu} style={{margin:"10px"}}  width={30} height={30} /></div>
                        <div>  <span style={{margin:"5px",fontSize:"13px"}}>通知公告</span></div>
                    </div>
                    <div className="col-xs-3" style={borderLine}>
                        <div> <img src={icon_menu} style={{margin:"10px"}}  width={30} height={30} /></div>
                        <div>  <span style={{margin:"5px",fontSize:"13px"}}>成绩通知</span></div>
                    </div>
                    <div className="col-xs-3" style={borderLine}>
                        <div> <img src={icon_menu} style={{margin:"10px"}}  width={30} height={30} /></div>
                        <div>  <span style={{margin:"5px",fontSize:"13px"}}>作业通知</span></div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-3" style={borderLine}>
                        <div> <img src={icon_menu} style={{margin:"10px"}}  width={30} height={30} /></div>
                        <div>  <span style={{margin:"5px",fontSize:"13px"}}>出入校通知</span></div>
                    </div>
                    <div className="col-xs-3" style={borderLine}>
                        <div> <img src={icon_menu} style={{margin:"10px"}}  width={30} height={30} /></div>
                        <div>  <span style={{margin:"5px",fontSize:"13px"}}>通知公告</span></div>
                    </div>
                    <div className="col-xs-3" style={borderLine}>
                        <div> <img src={icon_menu} style={{margin:"10px"}}  width={30} height={30} /></div>
                        <div>  <span style={{margin:"5px",fontSize:"13px"}}>成绩通知</span></div>
                    </div>
                    <div className="col-xs-3" style={borderLine}>
                        <div> <img src={icon_menu} style={{margin:"10px"}}  width={30} height={30} /></div>
                        <div>  <span style={{margin:"5px",fontSize:"13px"}}>作业通知</span></div>
                    </div>
                </div>
            </div>
            {/*分割线*/}
            <div className="row" style={{background:"#DADADA",height:"10px"}}/>
            {/*校园服务*/}
            <div className="row">

            </div>

            {/*班级相册*/}
            <div className="row">

            </div>


            {/*精彩瞬间*/}
            <div className="row">

            </div>
        </div>
    }
}

export  default AppHomePage;