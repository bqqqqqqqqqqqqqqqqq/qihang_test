import { httpRequest } from '../../utils/request'
const baseUrl = require('../base').allBaseUrl.GDEnvs.host

interface UserInfo{
  phone:string
  password:string
}
interface ReturnUserInfo{
  name:string
  isAdmin:string
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

  /**
   * @description: 
   * @return {*}
   */
  // static getVillageList = () =>
  //   httpRequest.get<VillageList>(
  //     baseUrl + '/mock/villageList',
  //   )
}
