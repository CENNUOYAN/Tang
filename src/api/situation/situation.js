/**
 * 出车情况模块
 */

import {
    postMethod,
    postMethodByEncode,
    getMethod
  } from '@/api/api'
import baseurl from '@/api/baseUrl'
import qs from 'qs'

/**
 * 保存出车情况接口
 * @param {*} params 
 * @param {*} opts 
 */
export function saveVisitResults(params,opts){
    params = qs.stringify(params)
    return postMethodByEncode(baseurl.saveVisitResults,params,opts); 
}

/**
 * 获得出车情况接口
 * @param {*} params 
 * @param {*} opts 
 */
export function getVisitResults(params,opts){
    return getMethod(baseurl.getVisitResults,params,opts)
}
