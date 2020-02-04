/**
 * 患者模块
 */
import {
    postMethod,
    postMethodByEncode,
    getMethod,
  } from '@/api/api'
import baseurl from '@/api/baseUrl' 
import qs from 'qs'

/**
 * 添加患者基本信息
 * @param {*} params 
 * @param {*} opts 
 */
export function savePatient(params,opts){
    params = qs.stringify(params)
    return postMethodByEncode(baseurl.savePatient,params,opts);
}

/**
 * 籍贯省份接口
 * @param {*} param 
 * @param {*} opts 
 */
export function getAllProvince(params,opts){
    return getMethod(baseurl.getAllProvince,params,opts);
}


/**
 * 籍贯城市接口
 * @param {*} params 
 * @param {*} opts 
 */
export function getByProvinceId(params,opts){
    return getMethod(baseurl.getByProvinceId,params,opts);
}

/**
 * 保存陪同人
 * @param {*} params 
 * @param {*} opts 
 */
export function saveCompanions(params,opts){
    params = qs.stringify(params)
    return postMethodByEncode(baseurl.saveCompanions,params,opts);
}

/**
 * 腕带绑定
 * @param {*} params 
 * @param {*} opts 
 */
export function bindWristband(params,opts){
    return getMethod(baseurl.bindWristband,params,opts);
}

/**
 * 获取民族列表数据
 * @param {*} params 
 * @param {*} opts 
 */
export function getNations(params,opts){
    return getMethod(baseurl.getNations,params,opts)
}

/**
 * 获取患者列表
 * @param {*} params 
 * @param {*} opts 
 */
export function getPatientList(params,opts){
    return getMethod(baseurl.getPatientList,params,opts)
}

/**
 * 保存三无人员
 * @param {*} params 
 * @param {*} opts 
 */
export function saveMysterious(params,opts){
    params = qs.stringify(params)
    return postMethodByEncode(baseurl.saveMysterious,params,opts); 
}

/**
 * 获取所有突发事件
 * @param {*} params 
 * @param {*} opts 
 */
export function getAll(params,opts){
    return getMethod(baseurl.getAll,params,opts)
}

/**
 * 保存突发事件
 * @param {*} params 
 * @param {*} opts 
 */
export function saveEmergency(params,opts){
    params = qs.stringify(params)
    return postMethodByEncode(baseurl.saveEmergency,params,opts)
}