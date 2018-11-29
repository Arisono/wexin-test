/**
 * Created by RaoMeng on 2018/11/8
 * Desc: 通讯录列表
 */

import React, {Component} from 'react'
import PhonesBean from 'model/PhonesBean'
import {List} from 'antd'
import PhonesItem from "../../components/PhonesItem";
import 'css/phones.css'
import {isObjEmpty} from "../../utils/common";
import {fetchGet} from "../../utils/fetchRequest";
import {API} from "../../configs/api.config";
import {Toast} from "antd-mobile";
export default class PhonesList extends Component {

    constructor() {
        super()

        this.state = {
            phonesList: [],
            classTitle: ''
        }
    }

    componentDidMount() {
        document.title = '通讯录'

        let title = this.props.match.params.classTitle;
        if (title) {
            this.setState({
                classTitle: title
            })
        }

        fetchGet(API.getParentPhones, {
            schId: 8,
        }).then(response => {

            console.log(response);

            response.data.map((item,index)=>{

                let phoneBean = new PhonesBean()
                let phones = []
                phoneBean.name = item.stuName

                phoneBean.claName = title

                item.parents.map((ite,ind)=>{

                    phoneBean.children.push(ite.userName)
                    phones.push(ite.userPhone)

                })

                 if (phones.length>0){

                     phoneBean.phone = phones[0]

                 }

                this.state.phonesList.push(phoneBean)


            })


            this.setState({
                phonesList: this.state.phonesList,
                // isLoading: false,
                // hasMoreData:false

            })

            Toast.hide();
        }).catch(error => {
            // Toast.fail(error, 2)

        })

        for (let i = 0; i < 20; i++) {
            // let phoneBean = new PhonesBean()
            // phoneBean.name = '章晨望'
            // phoneBean.phone = '13632423333'
            // phoneBean.claName = title
            // phoneBean.children = [
            //     '李泞', '赖思睿'
            // ]
            //
            // this.state.phonesList.push(phoneBean)
        }

        this.setState({
            phonesList: this.state.phonesList
        })
    }

    render() {
        const {phonesList, classTitle} = this.state

        return (
            <div className='phone-select-root'>
                <div className={isObjEmpty(classTitle) ? 'displayNone' : 'phones-list-header'}>{classTitle}</div>
                <div className={isObjEmpty(classTitle) ? 'displayNone' : 'gray-line'}></div>
                <List className='phones-list-layout'
                      dataSource={phonesList}
                      renderItem={phonesBean => (
                          <List.Item>
                              <PhonesItem phonesBean={phonesBean}/>
                          </List.Item>
                      )}/>
            </div>
        )
    }
}