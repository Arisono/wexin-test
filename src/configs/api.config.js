/**
 * Created by RaoMeng on 2018/11/21
 * Desc: 项目接口
 */

export const _baseURL = 'http://192.168.253.130:8099'

export const API = {
    //获取验证码
    SEND_CODE: _baseURL + '/user/sendCode',
    //获取openId
    GET_OPENID: _baseURL + '/wxPay/getOpenid',
    //绑定学号
    BIND_STUDENTID: _baseURL + '/user/bindStudentId',
    //绑定工号
    BIND_TEACHERID: _baseURL + '/user/bindTeacherId',
    //消费记录/充值记录
    CONSUME_RECODE: _baseURL + '/payRank/consumeRecode',
}


