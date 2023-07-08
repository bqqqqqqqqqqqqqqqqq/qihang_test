import { httpRequest } from '../../utils/request'
const baseUrl = require('../base').allBaseUrl.GDEnvs.host
const userUrl = '/user'
const stuUrl = '/stu'
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
interface kcInfo {
  cover_img:string
  t_name:string
  type:string
  complete:string
  completeTotal:string
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
//  注册登录
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
    //  教师操控题目
    static TeacherDeleteAnswer = (RequestConfig:{needToken:boolean,header:object},data:string) =>
    httpRequest.post(
      baseUrl + '/tea/DeleteAnswer'+"?id="+data,
      {},
      RequestConfig
    )

    // 学生
    // 学生查询课程
    static StuDetailClass = (RequestConfig:{needToken:boolean,header:object},data:string) =>
    httpRequest.get<kcInfo>(
      baseUrl + userUrl+'/DetailClass?id='+data,
      {},
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
