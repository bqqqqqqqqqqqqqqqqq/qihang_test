import { httpRequest } from '../../utils/request'
const baseUrl = require('../base').allBaseUrl.GDEnvs.host

interface BaseInfo{
  name:string,
  isAdmin:string,
}


interface oneProblem{
  code: any
  pid:number,
  cover_img:string,
  tag:string[]
}

interface answer{
  question_picture:string
  answer_picture:string
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
      baseUrl + '/AllProblem'+"/?page="+page.page+"&"+"size="+page.size,
      page
    );
    static searchProblemList = (type:string,teacher:string) =>
   httpRequest.get<oneProblem>(
      baseUrl + '/SearchProblem'+"/?"+"&type="+type+"&teacher="+teacher,
    );
    static getAnswerDetail = (problemid:string) =>
   httpRequest.get<answer>(
      baseUrl + '/Answer'+'/?id='+problemid,
    )
static getTeacher = () =>
    httpRequest.get<string[]>(
      baseUrl + '/GetTea',
    )



    
}
