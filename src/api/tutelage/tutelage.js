/**
 * 体征监护模块
 */

import {
    postMethod,
    postMethodByEncode,
    getMethod
  } from '@/api/api'
import baseurl from '@/api/baseUrl'
import qs from 'qs'

/**
 * 保存体征监护接口
 * @param {*} params 
 * @param {*} opts 
 */
export function saveVitalSign(params,opts){
    params = qs.stringify(params)
    return postMethodByEncode(baseurl.saveVitalSign,params,opts);
}

/**
 * 获取体征监护数据接口
 * @param {*} params 
 * @param {*} opts 
 */
export function getVitalSign(params,opts){
    return getMethod(baseurl.getVitalSign,params,opts)
}


