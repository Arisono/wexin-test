/**
 * Created by RaoMeng on 2018/11/15
 * Desc: 相册
 */

export default function AlbumBean() {
    this.albumId = 0 //相册id
    this.coverImg = '' //封面图片
    this.albumName = '' //相册名称
    this.quantity = -1 //相片数量
    this.albumDate = '' //相册创建日期
    this.type = 1 //类型：1、相片 2、视频
    this.status = 2  //状态 1、草稿 2、发布
    this.remarks = '' //备注
    this.gradeId = -1 //年级id
    this.classId = -1 // 班级id
    this.classname = '' //班级名称
}