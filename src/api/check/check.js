/**
 * 检查模块
 */

import {
    postMethod,
    postMethodByEncode,
    getMethod
  } from '@/api/api'
import baseurl from '@/api/baseUrl'
import qs from 'qs'

/**
 * 保存体格检查接口
 * @param {*} params 
 * @param {*} opts 
 */
export function savePhysicalCheck(params,opts){
    params = qs.stringify(params)
    return postMethodByEncode(baseurl.savePhysicalCheck,params,opts);
}

/**
 * 获取体格检查信息接口
 * @param {*} params 
 * @param {*} opts 
 */
export function getPhysicalCheck(params,opts){
    return getMethod(baseurl.getPhysicalCheck,params,opts)
}

/**
 * 获取体格检查项目接口
 * @param {*} params 
 * @param {*} opts 
 */
export function getPhysicalCheckItems(params,opts){
    return getMethod(baseurl.getPhysicalCheckItems,params,opts)
}

