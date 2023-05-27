import { httpRequest } from '../../utils/request'
const baseUrl = require('../base').allBaseUrl.GDEnvs.host
interface UserInfo{
  name:string
  password:string
}
interface ReturnUserInfo{
  name:string
}
export default class userApi {
  /**
   * @description: 获取用户信息
   * @return {*}
   */

  static getUserInfo = (data: UserInfo) =>
    httpRequest.post<ReturnUserInfo>(
      baseUrl + '/mock/getUserInfo',
      data
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
