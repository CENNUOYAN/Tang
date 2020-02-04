/**
 * 绿色通道模块
 */

import {
    postMethod,
    postMethodByEncode,
    getMethod
  } from '@/api/api'
import baseurl from '@/api/baseUrl'
import qs from 'qs'

/**
 * 绿色通道类型查询接口
 * @param {*} params 
 * @param {*} opts 
 */
export function getGreenChannelTypes(params,opts){
    return getMethod(baseurl.getGreenChannelTypes,params,opts)
}

/**
 * 绿色通道响应部门查询接口
 * @param {*} params 
 * @param {*} opts 
 */
export function getGreenChannelResponseBranchList(params,opts){
    return getMethod(baseurl.getGreenChannelResponseBranchList,params,opts)
}

/**
 * 绿色通道申请接口
 * @param {*} params 
 * @param {*} opts 
 */
export function greenChannelApply(params,opts){
    console.log('请求参数11：',params);
    
    return getMethod(baseurl.greenChannelApply,params,opts)
}