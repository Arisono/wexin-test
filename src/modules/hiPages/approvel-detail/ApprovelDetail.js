/**
 *   Created by FANGlh on 2018/11/26 16:18.
 *   Desc:审批详情，审批操作通用界面
 */

import React,{Component} from 'react';
import './ApprovelDetail.css';
import hi_img from '../../../style/imgs/hiimg.png';
import line_img from '../../../style/imgs/line_img.png';
import DetailItem from './DetailItem';
import {isObjEmpty} from "../../../utils/common";
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import LazyLoad from 'react-lazyload'
import ItemApprovel from './ItemApprovel';

export default class ApprovelDetail extends Component{
    constructor(){
        super();
        this.state = {
            detailList:[],
            pictureList:[],
            approvelData:[]
        }
    }
     render(){
         const {pictureList} = this.state
         let pictureItems = []
         for (let i = 0; i < pictureList.length; i++) {
             const pictureUrl = pictureList[i]
             if (!isObjEmpty(pictureUrl)) {
                 pictureItems.push(
                     i > 20 ?
                         <LazyLoad throttle={200} height={300} once overflow>
                             <CSSTransition
                                 timeout={2000}
                                 classNames='fade'
                                 appear={true}
                                 key={i}>
                                 <div className='pictureItem'>
                                     <img src={pictureUrl}/>
                                 </div>
                             </CSSTransition>
                         </LazyLoad> :
                         <div className='pictureItem'>
                             <img src={pictureUrl}/>
                         </div>
                 )
             }
         }

        return(
            <div>
               <div className="headerDiv">
                   <img className="headerImg" src={hi_img} alt=""/>
                   <div style={{marginTop:10}}>
                       <div style={{color:"#000000",fontSize:15}}>吴彦祖</div>
                       <div style={{color:"#666666",fontSize:12,marginTop:10}}>2018/11/22   14:00</div>
                   </div>
               </div>
                <div className="comhline_sty"></div>

                <div style={{marginTop:10}}>
                    {this.state.detailList.map((itemdata,index) =>
                        <DetailItem index = {index} itemdata = {itemdata}></DetailItem>
                    )}
                </div>
                <div className="comhline_sty1" style={{marginTop:10}}></div>
                <div style={{textAlign:'left',color:'#666666',marginLeft:10,marginTop:10}}>附件</div>

                <div style={{display: 'flex', width: '100%', flexDirection: 'column'}}>
                    <div style={{flex: '1', overflow: 'scroll', padding: '5px', webkitOverflowScrolling: 'touch'}}>
                        <TransitionGroup>
                            {pictureItems}
                        </TransitionGroup>
                    </div>
                </div>

                <div className="comhline_sty"></div>

                <div style={{marginBottom:50}}>
                    {this.state.approvelData.map((itemdata,index) => <ItemApprovel key ={index} itemdata = {itemdata}></ItemApprovel>)}
                </div>

            </div>
        )
    }
    componentWillMount() {
    }
    componentDidMount() {
        document.title = '审批详情';
         let detailList = [
             {
                 key:'申请流程',
                 value:'出差申请'
             }, {
                 key:'开始时间',
                 value:'2018/11/22  14:00'
             }
             , {
                 key:'结束时间',
                 value:'2018/11/22  18:00'
             },{
                 key:'时长（h）',
                 value:'2'
             }, {
                 key:'外出地址',
                 value:'蜀国与东吴争议之地荆州郡'
             }, {
                 key:'外出事由',
                 value:'奉命驻守城池'
             }
         ]
        let pictures = [
            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3507505698,2706878664&fm=15&gp=0.jpg',
            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3507505698,2706878664&fm=15&gp=0.jpg',
        ]
        let approvelData = [
            {
                img:hi_img,
                name:'陈冠希1',
                date:'2018/11/22   14:00',
                status:'已审批',
                statustype:2
            },{
                img:hi_img,
                name:'陈冠希2',
                date:'',
                status:'待审批',
                statustype:1
            },
            {
                img:hi_img,
                name:'陈冠希3',
                date:'',
                status:'待审批',
                statustype:1
            }
        ]
        this.setState({
            detailList:detailList,
            pictureList: this.state.pictureList.concat(pictures, pictures),
            approvelData:approvelData
        })
    }
    componentWillReceiveProps(newProps) {
        console.log('Component WILL RECEIVE PROPS!')
    }
    shouldComponentUpdate(newProps, newState) {
        return true;
    }
    componentWillUpdate(nextProps, nextState) {
        console.log('Component WILL UPDATE!');
    }
    componentDidUpdate(prevProps, prevState) {
        console.log('Component DID UPDATE!')
    }
    componentWillUnmount() {
        console.log('Component WILL UNMOUNT!')
    }
}