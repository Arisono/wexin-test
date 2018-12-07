/**
 * 对象是否为null或undefined
 * @param obj
 * @returns {boolean}
 */
export function isObjNull(obj) {
    return (obj == null || obj == undefined)
}

/**
 * 对象是否为null或undefined或长度为0
 * @param obj
 * @returns {boolean}
 */
export function isObjEmpty() {
    let args = arguments
    if (isObjNull(args) || args.length == 0) {
        return true
    } else {
        for (let i = 0; i < args.length; i++) {
            let arg = args[i]
            if (isObjNull(arg) || arg.length == 0) {
                return true
            }
        }
        return false
    }
}

/**
 * 是否为空object
 * @param obj
 * @returns {boolean}
 */
export function isEmptyObject(obj) {
    if (isObjNull(obj)) {
        return false
    }
    if (obj.length == 0) {
        return false
    }
    for (var n in obj) {
        return false
    }
    return true;
}

/**
 * 字符串是否包含另一字符串
 * @param parent
 * @param child
 * @returns {boolean}
 */
export function strContain(parent, child) {
    if (isObjEmpty(parent)) {
        return false
    }
    return (parent.indexOf(child) != -1)
}

/**
 * 根据key取某对象中的String值
 * @param object
 * @param key
 * @returns {*}
 */
export function getStrValue(object, key) {
    if (isObjNull(object)) {
        return ''
    }
    if (isObjNull(object[key])) {
        return ''
    }
    return object[key]
}


/**
 * 根据key取某对象中的Number值
 * @param object
 * @param key
 * @returns {*}
 */
export function getIntValue(object, key) {
    if (isObjNull(object)) {
        return 0
    }
    if (isObjNull(object[key])) {
        return 0
    }
    return object[key]
}


/**
 * 根据key取某对象中的日期long值
 * @param object
 * @param key
 * @returns {*}
 */
export function getTimeValue(object, key) {
    if (isObjNull(object)) {
        return 0
    }
    if (isObjNull(object[key])) {
        return 0
    }
    let result = object[key];
    if (typeof result == 'string') {
        try {
            let time = Date.parse(new Date(result))
            return time
        } catch (e) {
            return result
        }
    } else {
        return result
    }
}


/**
 * 根据key取某对象中的Array值
 * @param object
 * @param key
 * @returns {*}
 */
export function getArrayValue(object, key) {
    if (isObjNull(object)) {
        return []
    }
    if (isObjNull(object[key])) {
        return []
    }
    return object[key]
}

/**
 * 根据key取某对象中的Object值
 * @param object
 * @param key
 * @returns {*}
 */
export function getObjValue(object, key) {
    if (isObjNull(object)) {
        return {}
    }
    if (isObjNull(object[key])) {
        return {}
    }
    return object[key]
}


/**
 * 取出中括号内的内容
 * @param text
 * @returns {string}
 */
export function getBracketStr(text) {
    let result = ''
    if (isObjEmpty(text))
        return result
    let regex = /\[(.+?)\]/g;
    let options = text.match(regex)
    if (!isObjEmpty(options)) {
        let option = options[0]
        if (!isObjEmpty(option)) {
            result = option.substring(1, option.length - 1)
        }
    }
    return result
}

/**
 * 取出小括号内的内容
 * @param text
 * @returns {string}
 */
export function getParenthesesStr(text) {
    let result = ''
    if (isObjEmpty(text))
        return result
    let regex = /\((.+?)\)/g;
    let options = text.match(regex)
    if (!isObjEmpty(options)) {
        let option = options[0]
        if (!isObjEmpty(option)) {
            result = option.substring(1, option.length - 1)
        }
    }
    return result
}

String.prototype.endWith = function (s) {
    if (s == null || s == "" || this.length == 0 || s.length > this.length)
        return false;
    if (this.substring(this.length - s.length) == s)
        return true;
    else
        return false;
    return true;
}


String.prototype.isStrEquals = function () {
    let args = arguments
    if (isObjNull(args) || args.length == 0) {
        return false
    } else {
        for (let i = 0; i < args.length; i++) {
            let arg = args[i]
            if (isObjNull(arg)) {
                return false
            }
            if (this === arg) {
                return true
            }
        }
        return false
    }
}

//yyyy-MM-dd hh:mm:ss
Date.prototype.format = function (fmt) {
    let o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


String.prototype.startWith = function (s) {
    if (s == null || s == "" || this.length == 0 || s.length > this.length)
        return false;
    if (this.substr(0, s.length) == s)
        return true;
    else
        return false;
    return true;
}


String.prototype.replaceAll = function (reg, s) {
    if (isObjEmpty(this)) {
        return ''
    }
    return this.replace(new RegExp(reg, 'gm'), s)
}


/**
 * Map转json
 * @param m
 * @returns String
 */
export function MapToJson(m) {
    if (isObjEmpty(m)) {
        return ''
    }
    var str = '{';
    var i = 1;
    m.forEach(function (item, key, mapObj) {
        if (mapObj.size == i) {
            str += '"' + key + '":"' + item + '"';
        } else {
            str += '"' + key + '":"' + item + '",';
        }
        i++;
    });
    str += '}';
    return str;
}

/**
 * require.context(directory, useSubdirectories = false, regExp = /^\.\//);
 * 获取目标目录下符合条件的所有文件
 * @param directory 目标文件夹
 * @param useSubdirectories 是否查找子级目录
 * @param regExp 匹配文件的正则表达式
 */
export function getDirFiles(directory, useSubdirectories, regExp) {
    const context = require.context(directory, useSubdirectories, regExp)

    return context.keys().map(context)
}

export const getCheckedNodes = (extra) => {
    let checkedNodes = extra.allCheckedNodes
    let count = getCheckedCount(checkedNodes)
    if (isObjEmpty(checkedNodes)) {
        checkedNodes = []
    }
    checkedNodes = getNodes(checkedNodes)
    console.log('childNodes', checkedNodes)
    return {checkedNodes, count}
}

export const getCheckedCount = (checkedNodes) => {
    if (!isObjEmpty(checkedNodes)) {
        let quantity = 0
        for (let i = 0; i < checkedNodes.length; i++) {
            let checkedNode = checkedNodes[i]
            if (checkedNode.node) {
                if (checkedNode.children) {
                    checkedNode = checkedNode.children
                    quantity = quantity + getCheckedCount(checkedNode)
                } else {
                    quantity = quantity + 1
                    continue
                }
            } else {
                if (checkedNode.props) {
                    if (checkedNode.props.children.length > 0) {
                        checkedNode = checkedNode.props.children
                        quantity = quantity + getCheckedCount(checkedNode)
                    } else {
                        quantity = quantity + 1
                        continue
                    }
                }
            }
        }
        return quantity
    } else {
        return 0
    }
}

export const getNodes = (checkedNodes) => {
    if (!isObjEmpty(checkedNodes)) {
        let childNodes = []
        for (let i = 0; i < checkedNodes.length; i++) {
            let checkedNode = checkedNodes[i]
            if (checkedNode.node && checkedNode.node.props) {
                const checkProps = checkedNode.node.props
                if (!isObjEmpty(checkProps.children)) {
                    checkedNode = checkProps.children
                    childNodes = childNodes.concat(getNodes(checkedNode))
                } else {
                    childNodes.push(checkProps)
                    continue
                }
            } else {
                if (checkedNode.props) {
                    const checkProps = checkedNode.props
                    if (!isObjEmpty(checkProps.children)) {
                        checkedNode = checkProps.children
                        childNodes = childNodes.concat(getNodes(checkedNode))
                    } else {
                        childNodes.push(checkProps)
                        continue
                    }
                }
            }
        }
        return childNodes
    } else {
        return []
    }
}

export const getFileType = (filePath) => {
    var startIndex = filePath.lastIndexOf(".");
    if (startIndex != -1) {
        return filePath.substring(startIndex + 1, filePath.length).toLowerCase()
    } else {
        return ""
    }
}

