/**
 * 初步诊断
 */

import {
    postMethod,
    postMethodByEncode,
    getMethod
  } from '@/api/api'
import baseurl from '@/api/baseUrl'
import qs from 'qs'

/**
 * 保存出诊
 * @param {*} params 
 * @param {*} opts 
 */
export function diagnosisInsert(params,opts){
    params = qs.stringify(params)
    return postMethodByEncode(baseurl.diagnosisInsert,params,opts)
}

/**
 * 获取初步诊断默认数据
 * @param {*} params 
 * @param {*} opts 
 */
export function getAllClassify(params,opts){
  return getMethod(baseurl.getAllClassify,params,opts)
}


export function getDiagnosisInfo(params,opts){
  return getMethod(baseurl.getDiagnosisInfo,params,opts)
}