/**
 * 评分模块
 */

import {
    postMethod,
    postMethodByEncode,
    getMethod
  } from '@/api/api'
import baseurl from '@/api/baseUrl'
import qs from 'qs'


/**
 * 保存创伤评分信息接口
 * @param {*} param 
 * @param {*} opts 
 */
export function saveTraumaScore(params,opts){
    params = qs.stringify(params)
    return postMethodByEncode(baseurl.saveTraumaScore,params,opts);   
}

/**
 * 获得评分信息接口
 * @param {*} params 
 * @param {*} opts 
 */
export function getTraumaScore(params,opts){
    // params = qs.stringify(params)
    return getMethod(baseurl.getTraumaScore,params,opts);   
}

/**
 * 获得评分项目接口
 * @param {*} params 
 * @param {*} opts 
 */
export function getScoreItems(params,opts){
    return getMethod(baseurl.getScoreItems,params,opts)
}