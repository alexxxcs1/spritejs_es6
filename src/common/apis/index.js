import axios from 'axios'

import demoPost from './demo'

const host = 'http://client.rup-china.com/'

// 实例化 ajax请求对象
const ajaxinstance = axios.create({
  baseURL: host,
  timeout: 5000,
  // withCredentials: true,
  headers: {
    // responseType: 'JSON',
    // 'Content-Type': 'application/json'
  }
})

// 添加拦截器，处理 公用请求参数，和通用请求头部
ajaxinstance
  .interceptors
  .request
  .use((config) => {
    // TODO
    console.log(config);
    
    return config
  }, (error) => {
    Promise.reject(error)
  })

// 请求响应拦截器
ajaxinstance
  .interceptors
  .response
  .use((response) => {
    // TODO
    return response.data
  }, (error) => {
    // let isLogin = true

    // // TODO 登录鉴权
    // if (!isLogin) {
    //   hashHistory.push('/login')
    // }
    return Promise.reject(error)
  })

/**
 * [API api接口封装]
 * @type {Object}
 */
const API = {
  ...demoPost(ajaxinstance),
}

export default API
