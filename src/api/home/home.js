/**
 * 首页模块
 */
import {
    postMethod,
    postMethodByEncode,
    getMethod
  } from '@/api/api'
import baseurl from '@/api/baseUrl'
import qs from 'qs'

/**
 * 获取首页数据
 * @param {*} params 
 * @param {*} opts 
 */
export function getIndexData(params,opts){
    return getMethod(baseurl.getIndexData,params,opts);
}