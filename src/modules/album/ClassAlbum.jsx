/**
 * Created by RaoMeng on 2018/11/7
 * Desc: 班级相册
 */

import React, {Component} from 'react'
import AlbumItem from 'components/AlbumItem'
import {isObjEmpty} from "../../utils/common";
import {Icon} from 'antd'
import {Picker, List} from 'antd-mobile'

const uploadItem = new AlbumItem()
uploadItem.coverImg = 'upload'
uploadItem.albumName = '新建相册'
uploadItem.quantity = -1

export default class ClassAlbum extends Component {

    constructor() {
        super()

        this.state = {
            albumList: [
                uploadItem
            ],
            classList: [],
            classText: ''
        }
    }

    componentDidMount() {
        this.node.scrollIntoView();
        const {classList, albumList} = this.state

        let albumAll = [
            {
                coverImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                albumName: '六一儿童节',
                quantity: 50,
            },
            {
                coverImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                albumName: '六一儿童节',
                quantity: 50,
            },
            {
                coverImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                albumName: '六一儿童节',
                quantity: 50,
            }
        ]


        for (let i = 0; i < 10; i++) {
            if (i % 2 == 0) {
                classList.push({
                    label: '三年级（一）班',
                    value: '三年级（一）班'
                })
            } else {
                classList.push({
                    label: '三年级（二）班',
                    value: '三年级（二）班'
                })
            }
        }

        this.setState({
            albumList: albumList.concat(albumAll, albumAll, albumAll, albumAll),
            classList
        })
    }

    render() {
        const {albumList, classList, classText} = this.state

        let albumItems = []
        if (!isObjEmpty(albumList)) {
            for (let i = 0; i < albumList.length; i++) {
                const albumBean = albumList[i]
                if (!isObjEmpty(albumBean)) {
                    albumItems.push(<AlbumItem albumBean={albumBean}
                                               itemClick={this.onItemClick.bind(this)}
                                               index={i}/>)
                }
            }
        }
        return (
            <div ref={node => this.node = node}>
                <div className='gray-line'></div>
                <Picker data={classList} title='选择班级' extra='请选择'
                        value={classText} onChange={this.handleClassChange}
                        onOk={this.handleClassChange} cols={1}>
                    <List.Item arrow="horizontal">选择班级</List.Item>
                </Picker>
                <div className='gray-line'></div>
                <div style={{padding: '20px'}}>
                    {albumItems}
                </div>
            </div>
        )
    }

    onItemClick = (index) => {
        console.log(index)
        if (index == 0) {
            this.props.history.push('/newAlbum')
        } else {
            this.props.history.push('/pictureList')
        }
    }

    handleClassChange = (v) => {
        this.setState({classText: v})
    }
}