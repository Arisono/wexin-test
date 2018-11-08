/**
 * Created by RaoMeng on 2018/11/7
 * Desc: 班级相册
 */

import React, {Component} from 'react'
import AlbumItem from 'components/AlbumItem'
import {isObjEmpty} from "../../utils/common";

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
            ]
        }
    }

    componentDidMount() {
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

        this.setState({
            albumList: this.state.albumList.concat(albumAll, albumAll, albumAll, albumAll)
        })
    }

    render() {
        const {albumList} = this.state

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
            <div style={{padding: '20px'}}>
                {albumItems}
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
}