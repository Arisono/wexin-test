/**
*   Created by FANGlh on 2018/11/23 18:03.
*   Desc:审批主界面
*/

import React,{Component} from 'react';
import './Approvel.css';
import Swiper from 'swiper/dist/js/swiper';
import 'swiper/dist/css/swiper.min.css';

export default class Approvel extends Component{
    constructor(){
        super();
        this.state = {
            selectIndex: 0,
            teacherList: [],
            parentList: []
        }
    }
    componentWillMount() {
        console.log('Component WILL MOUNT!')
    }
    componentDidMount() {
        document.title = '审批'
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
    render(){
        const {selectIndex, teacherList, parentList} = this.state

        return(
            <div className='phone-select-root'>
                <div className='gray-line'></div>
                <div className='identity-select'>
                    <div className={selectIndex == 0 ?
                        'identity-item-select' : 'identity-item-normal'}
                         onClick={this.onTeacherClick}>我的申请
                    </div>
                    <div className={selectIndex == 1 ?
                        'identity-item-select' : 'identity-item-normal'}
                         onClick={this.onParentClick}>我的审批
                    </div>
                </div>
                {/*<div className="swiper-container">*/}
                    {/*<div className="swiper-wrapper">*/}
                        {/*<div className="swiper-slide">*/}
                            {/*{teacherItems}*/}
                        {/*</div>*/}
                        {/*<div className="swiper-slide">*/}
                            {/*{parentItems}*/}
                        {/*</div>*/}
                    {/*</div>*/}
                {/*</div>*/}
            </div>
        )
    }

    onTeacherClick = () => {
        this.setState({
            selectIndex: 0
        }, () => {
            // mySwiper.slideTo(this.state.selectIndex, 300, false)
        })
    }

    onParentClick = () => {
        this.setState({
            selectIndex: 1
        }, () => {
            // mySwiper.slideTo(this.state.selectIndex, 300, false)
        })
    }
}