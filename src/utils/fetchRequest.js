import {isObjNull} from "./common";

export function fetchPost(url, params, header) {
    if (isObjNull(header)) {
        header = {}
    }

    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(params),
        mode: 'cors',
        credentials: 'include',
        // cache: "force-cache",
        headers: new Headers({
            'Accept': 'application/json',
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
            ...header
        })
    }).then(response => {
        if (response.status == 200) {
            return response;
        } else {
            throw response
        }
    }).catch(error => {
        return error.json()
    }).then(result => {
        if (result.status == 200) {
            let resultJson = result.json();
            console.log('response', resultJson)
            return resultJson;
        } else {
            if (result.exceptionInfo) {
                if (result.exceptionInfo.length > 30) {
                    throw '接口请求异常'
                } else {
                    throw result.exceptionInfo
                }
            } else {
                throw result
            }
        }
    })
}

export function fetchGet(url, params, header) {
    if (isObjNull(header)) {
        header = {}
    }

    if (params) {
        let paramsArray = [];
        //拼接参数
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + encodeURI(params[key].toString())))

        if (paramsArray.length > 0) {
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
    }

    return fetch(url, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        // cache: "force-cache",
        headers: new Headers({
            'Accept': 'application/json',
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
            ...header
        })
    }).then(response => {
        if (response.status == 200) {
            return response;
        } else {
            throw response
        }
    }).catch(error => {
        return error.json()
    }).then(result => {
        if (result.status == 200) {
            let resultJson = result.json();
            console.log('response', resultJson)
            return resultJson;
        } else {
            if (result.exceptionInfo) {
                if (result.exceptionInfo.length > 30) {
                    throw '接口请求异常'
                } else {
                    throw result.exceptionInfo
                }
            } else {
                throw result
            }
        }
    })
}


export function fetchGetNoSession(url, params, header) {
    if (isObjNull(header)) {
        header = {}
    }

    if (params) {
        let paramsArray = [];
        //拼接参数
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + encodeURI(params[key].toString())))

        if (paramsArray.length > 0) {
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
    }

    return fetch(url, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        // cache: "force-cache",
        headers: new Headers({
            'Accept': 'application/json',
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
            ...header
        })
    }).then(response => {
        if (response.status == 200) {
            return response;
        } else {
            throw response
        }
    }).catch(error => {
        return error.json()
    }).then(result => {
        if (result.status == 200) {
            return result.json();
        } else {
            if (result.exceptionInfo) {
                if (result.exceptionInfo.length > 30) {
                    throw '接口请求异常'
                } else {
                    throw result.exceptionInfo
                }
            } else {
                throw result
            }
        }
    })
}