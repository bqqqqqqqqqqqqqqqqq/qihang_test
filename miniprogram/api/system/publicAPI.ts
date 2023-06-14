import { httpRequest } from '../../utils/request'
const baseUrl = require('../base').allBaseUrl.GDEnvs.host

interface oneProblem{
  code: any
  pid:number,
  cover_img:string,
  tag:string[]
}

// interface UserInfo{
//   phone:string
//   password:string
// }
interface ReturnUserInfo{
  name:string
  isAdmin:string
}

export default class publicAPI {

static getProblemList = (page:Paging) =>
   httpRequest.get<oneProblem>(
      baseUrl + '/AllProblem',
      page,
    )
}
