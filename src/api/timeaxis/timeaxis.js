/**
 * 时间轴模块
 */
import {
    postMethod,
    postMethodByEncode,
    getMethod,
  } from '@/api/api'
import baseurl from '@/api/baseUrl' 
import qs from 'qs'

/**
 * 设置时间轴
 * @param {*} params 
 * @param {*} opts 
 */
export function setTimeAxis(params,opts){
    params = qs.stringify(params)
    return postMethodByEncode(baseurl.setTimeAxis,params,opts);
}

/**
 * 获取时间轴
 * @param {*} params 
 * @param {*} opts 
 */
export function getTimeAxis(params,opts){
  return getMethod(baseurl.getTimeAxis,params,opts);
}
