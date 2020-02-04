/* eslint-disable no-console */
/**
 * 测试接口
 * 
 */

// 拦截器
import {
  postMethod,
  postMethodByEncode
} from '@/api/api'
import baseurl from '@/api/baseUrl'

import qs from 'qs'


/**
 * post请求
 * application/json
 * 消息主体是序列化后的 JSON 字符串,这个类型越来越多地被大家所使用
 * 
 * @param {*} params 
 */
export function postJson(params,opts){  
  params = qs.stringify(params)
  return postMethod(baseurl.test,params,opts);

}

/**
 * post请求
 * 类型：application/x-www-form-urlencoded
 * @param {*} params 
 * @param {*} opts 
 */
export function postJsonByEncode(params,opts){  
  params = qs.stringify(params)
  return postMethodByEncode(baseurl.test,params,opts);

}

