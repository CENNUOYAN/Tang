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
 * 保存血压信息接口
 * @param {*} param 
 * @param {*} opts 
 */
export function saveBloodPressure(params,opts){
    params = qs.stringify(params)
    return postMethodByEncode(baseurl.saveBloodPressure,params,opts);   
}
/**
 * 保存用药信息接口
 * @param {*} param 
 * @param {*} opts 
 */
export function saveMedication(params,opts){
    params = qs.stringify(params)
    return postMethodByEncode(baseurl.saveMedication,params,opts);   
}
/**
 * 保存运动信息接口
 * @param {*} param 
 * @param {*} opts 
 */
export function saveMotion(params,opts){
    params = qs.stringify(params)
    return postMethodByEncode(baseurl.saveMotion,params,opts);   
}
/**
 * 保存身高体重信息接口
 * @param {*} param 
 * @param {*} opts 
 */
export function saveWHeight(params,opts){
    params = qs.stringify(params)
    return postMethodByEncode(baseurl.saveWHeight,params,opts);   
}
/**
 * 保存饮食信息接口
 * @param {*} param 
 * @param {*} opts 
 */
export function saveDiet(params,opts){
    params = qs.stringify(params)
    return postMethodByEncode(baseurl.saveDiet,params,opts);   
}
/**
 * 保存血糖信息接口
 * @param {*} param 
 * @param {*} opts 
 */
export function saveBloodsugar(params,opts){
    params = qs.stringify(params)
    return postMethodByEncode(baseurl.saveBloodsugar,params,opts);   
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