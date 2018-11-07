/**
 * Created by RaoMeng on 2018/11/7
 * Desc: 相册布局
 */

import React, {Component} from 'react'
import AlbumBean from 'model/AlbumBean'
import 'css/album-item.css'

export default class AlbumItem extends Component {

    constructor() {
        super()

        this.state = {
            albumBean: new AlbumBean()
        }
    }

    componentDidMount() {
        this.setState({
            albumBean: this.props.albumBean
        })
    }

    render() {
        const {albumBean} = this.state
        return (
            <div className='parentLayout' onClick={this.albumClick}>
                <div className='itemLayout'>
                    <img className='coverImg'
                         src={albumBean.coverImg == 'upload' ? require('imgs/ic_annex_upload.png') : albumBean.coverImg}/>
                    <span className='nameText'>{albumBean.albumName}</span>
                    <span className='quantityText'>{albumBean.quantity >= 0 ? (albumBean.quantity + '张') : ''}</span>
                </div>
            </div>

        )
    }

    albumClick = () => {
        this.props.itemClick(this.props.index)
    }
}