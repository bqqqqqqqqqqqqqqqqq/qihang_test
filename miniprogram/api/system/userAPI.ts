import { httpRequest } from '../../utils/request'
const baseUrl = require('../base').allBaseUrl.GDEnvs.host

interface BaseInfo{
  name:string,
  isAdmin:string,
}

interface RegUserInfo{
  name:string
  password:string
  code:string
}
interface WXPhoneLogUserInfo{
  userInfo:BaseInfo,
  token:string
}
interface ReturnUserInfo{
  name:string
  isAdmin:string
  token:string
}
interface code{
  code:string
}
interface Token{
  token:string
}

export default class userApi {
  /**
   * @description: 获取用户信息
   * @return {*}
   */

  static getUserInfo = (data: UserInfo,RequestConfig:{needToken:boolean}) =>
    httpRequest.get<ReturnUserInfo>(
      baseUrl + '/login',
      data,
      RequestConfig
    )

    // static TokenLogin = (page:Paging) =>
    // httpRequest.post<BaseInfo>(
    //    baseUrl 
    //    page
    //  )

    static UserwxPhoneLogin = (data: code,RequestConfig:{needToken:boolean}) =>
    httpRequest.post<WXPhoneLogUserInfo>(
      baseUrl + '/WXLogin',
      data,
      RequestConfig
    )
    static UserwxPhoneRegister = (data: RegUserInfo,RequestConfig:{needToken:boolean}) =>
    httpRequest.post(
      baseUrl + '/WXRegister',
      data,
      RequestConfig
    )

  /**
   * @description: 
   * @return {*}
   */
  // static getVillageList = () =>
  //   httpRequest.get<VillageList>(
  //     baseUrl + '/mock/villageList',
  //   )
}
