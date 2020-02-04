/**
 * 治疗、护理模块
 */

import {
    postMethod,
    postMethodByEncode,
    getMethod
  } from '@/api/api'
import baseurl from '@/api/baseUrl'
import qs from 'qs'

/**
 * 保存治疗/护理信息接口
 * @param {*} params 
 * @param {*} opts 
 */
export function saveTreatmentAndCare(params,opts){
    params = qs.stringify(params)
    return postMethodByEncode(baseurl.saveTreatmentAndCare,params,opts);   
}


/**
 * 获取治疗措施项目接口
 * @param {*} params 
 * @param {*} opts 
 */
export function getFirstAidMeasuresItems(params,opts){
    return getMethod(baseurl.getFirstAidMeasuresItems,params,opts)
}

/**
 * 获取药物治疗项目接口
 * @param {*} params 
 * @param {*} opts 
 */
export function getDrugTreatmentItems(params,opts){
    return getMethod(baseurl.getDrugTreatmentItems,params,opts)
}

/**
 * 获得治疗/护理信息接口
 * @param {*} params 
 * @param {*} opts 
 */
export function getTreatmentAndCare(params,opts){
    return getMethod(baseurl.getTreatmentAndCare,params,opts)
}

/**
 * 获取一级选项
 * @param {*} params 
 * @param {*} opts 
 */
export function getTreatmentAndCareItems(params,opts){
    return getMethod(baseurl.getTreatmentAndCareItems,params,opts)
}

/**
 * 获取子级数据
 * @param {*} params 
 * @param {*} opts 
 */
export function getChildItems(params,opts){
    return getMethod(baseurl.getChildItems,params,opts)
}

/**
 * 保存药物治疗子级数据
 * @param {*} params 
 * @param {*} opts 
 */
export function saveChildItems(params,opts){
    params = qs.stringify(params)
    return postMethodByEncode(baseurl.saveChildItems,params,opts);   
}