import { httpRequest } from '../../utils/request'
const baseUrl = require('../base').allBaseUrl.GDEnvs.host

interface UserInfo{
  name:string
  password:string
}
interface ReturnUserInfo{
  name:string
  isAdmin:string
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

    static UserwxPhoneLogin = (data: code,RequestConfig:{needToken:boolean}) =>
    httpRequest.post<Token>(
      baseUrl + '/WXLogin',
      data,
      RequestConfig
    )
    static UserwxPhoneRegister = (data: UserInfo,RequestConfig:{needToken:boolean}) =>
    httpRequest.post<Token>(
      baseUrl + '/WXRegister ',
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
