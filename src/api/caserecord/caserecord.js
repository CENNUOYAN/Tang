/**
 * 病历模块
 */

import {
    postMethod,
    postMethodByEncode
  } from '@/api/api'
import baseurl from '@/api/baseUrl'
import qs from 'qs'

/**
 * 更新病历接口
 * @param {*} params 
 * @param {*} opts 
 */
export function updateMedicalRecord(params,opts){
    params = qs.stringify(params)
    return postMethodByEncode(baseurl.updateMedicalRecord,params,opts);
}


