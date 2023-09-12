import { httpRequest } from '../../utils/request'
const baseUrl = require('../base').allBaseUrl.GDEnvs.host
const userUrl = '/user'
const stuUrl = '/stu'


interface oneProblem{
  code: any
  pid:number,
  cover_img:string,
  tag:string[]
}

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
  teacherid:string
}
interface BaseInfo{
  name:string,
  isAdmin:string,
}
interface loginInfo{
  phone:string,
  password:string
}
export default class userApi {
  static getUserInfo = (data: loginInfo,RequestConfig:{needToken:boolean}) =>
    httpRequest.post<WXPhoneLogUserInfo>(
      baseUrl + '/Login',
      data,
      RequestConfig
    )
//  注册登录
    static UserwxPhoneLogin = (data: code,RequestConfig:{needToken:boolean}) =>
    httpRequest.post<WXPhoneLogUserInfo>(
      baseUrl + '/WXLogin',
      data,
      RequestConfig
    )

    static UserwxPhoneRegister = (data: RegUserInfo,RequestConfig:{needToken:boolean},wxcode:string) =>
    httpRequest.post(
      baseUrl + '/WXRegister?IDcode='+wxcode,
      data,
      RequestConfig
    )
  static SetProfile = (RequestConfig:{needToken:boolean,header:object},id:string,name:string,grade:string) =>
    httpRequest.post(
      baseUrl + '/SetProfile?id='+id+"&name="+name+"&grade="+grade,
      {},
      RequestConfig
    )

    // 学生-------------------------------------
      //下单买课

      static wechatPAY = (RequestConfig:{needToken:boolean,header:object},data:any,id:string) =>
      httpRequest.post(
        baseUrl +userUrl+'/JSAPI?id='+id,
        data,
        RequestConfig
      )
      static AddBuyClassStu = (RequestConfig:{needToken:boolean,header:object},data:any) =>
      httpRequest.post(
       baseUrl + '/tea'+'/AddBuyClassStu',
        data,
        RequestConfig
     )

      static creatProblem = (RequestConfig:{needToken:boolean,header:object},grade:string,subject:string,teacherID:string,id:string) =>
      httpRequest.post(
        baseUrl +userUrl+'/CreatProblem?grade='+grade+'&subject='+subject+'&teacherID='+teacherID+'&id='+id,
        {},
        RequestConfig
      )



    // 学生查询课程
    static StuDetailClass = (RequestConfig:{needToken:boolean,header:object},data:string) =>
    httpRequest.get<kcInfo>(
      baseUrl + userUrl+'/GetMyClass?id='+data,
      {},
      RequestConfig
    )
    // 管理员管理所有班级
    static AllClass = (RequestConfig:{needToken:boolean,header:object}) =>
    httpRequest.get(  
      baseUrl+'/tea'+'/AllClass',
      {},
      RequestConfig
    )
    static AllClassBuy = (RequestConfig:{needToken:boolean,header:object},data:string) =>
    httpRequest.get<kcInfo>(  
      baseUrl + userUrl+'/AllClassBuy',
      {},
      RequestConfig
    )
    static BuyClassDetail = (RequestConfig:{needToken:boolean,header:object},id:string) =>
    httpRequest.get<kcInfo>(  
      baseUrl + userUrl+'/BuyClassDetail?id='+id,
      {},
      RequestConfig
    )
    // 学生--绑定孩子后----成为家长
    static BindMyKID = (RequestConfig:{needToken:boolean,header:object},childPhone:string, parentsID:string)=>
    httpRequest.post(
      baseUrl+ userUrl+'/AddChild?'+'childPhone='+childPhone+"&parentsID="+parentsID,
      {},
      RequestConfig
    )
    // 学生--绑定新用户孩子---成为家长
    static AddAndRegisterChild = (RequestConfig:{needToken:boolean,header:object},name:string,grade:string,parentsID:string)=>
    httpRequest.post(
      baseUrl+ userUrl+'/AddAndRegisterChild?'+'name='+name+'&grade='+grade+'&parentsID='+parentsID,
      {},
      RequestConfig
    )

    // 家长查询孩子
    static GetChild = (RequestConfig:{needToken:boolean,header:object},data:string) =>httpRequest.get(
      baseUrl + userUrl+'/GetChild?id='+data,
      {},
      RequestConfig
    )
    // 家长查询孩子课程 
    static ParStuDetailClass = (RequestConfig:{needToken:boolean,header:object},data:string) =>httpRequest.get<kcInfo>(
      baseUrl + userUrl+'/GetChildClass?id='+data,
      {},
      RequestConfig
    )
     //  教师操控题目
    static TeacherDeleteAnswer = (RequestConfig:{needToken:boolean,header:object},data:string) =>
     httpRequest.post(
      baseUrl + '/tea/DeleteAnswer'+"?id="+data,
     {},
       RequestConfig
    )
//  老师查询待回答
    static WaitMyAnswer = (RequestConfig:{needToken:boolean,header:object}) =>
   httpRequest.get<oneProblem>(
      baseUrl + '/tea/WaitMyAnswer',
      {},
      RequestConfig
    );
    // 老师查询已回答
    static MyAnswer = (RequestConfig:{needToken:boolean,header:object}) =>
    httpRequest.get<oneProblem>(
       baseUrl + '/tea/MyAnswer',
       {},
       RequestConfig
     );
      // @管理员
      // 管理员查看所有游客

      //管理员查看所有学生
      static GetAllStudent = (RequestConfig:{needToken:boolean,header:object}) =>
      httpRequest.get(
       baseUrl + '/tea/GetAllStudent',
      {},
        RequestConfig
     )

     // 管理员查看所有老师
     static GetAllTeacher = (RequestConfig:{needToken:boolean,header:object}) =>
     httpRequest.get(
      baseUrl + '/tea/GetAllTeacher',
     {},
       RequestConfig
    )
    // 管理员添加老师
    static AddTeacher = (RequestConfig:{needToken:boolean,header:object},id:string) =>
    httpRequest.post(
     baseUrl + '/tea/AddTeacher?id='+id,
    {},
      RequestConfig
   )

   // 管理员查询所有游客
   static GetAllVis = (RequestConfig:{needToken:boolean,header:object}) =>
   httpRequest.get(
    baseUrl + '/tea/GetAllVis',
   {},
     RequestConfig
  )

   // 管理员添加学生
   static AddStudent = (RequestConfig:{needToken:boolean,header:object},id:string) =>
   httpRequest.post(
    baseUrl + '/tea/AddStudent?id='+id,
   {},
     RequestConfig
  )
   // 管理员删除
   static DeleteTeacher = (RequestConfig:{needToken:boolean,header:object},id:string) =>
   httpRequest.post(
    baseUrl + '/tea/DeleteTeacher?id='+id,
   {},
     RequestConfig
  )
// 管理员查看该班级的所有学生
     // 管理员查看所有老师
     static AllClassStudent = (RequestConfig:{needToken:boolean,header:object},data:string) =>
     httpRequest.get(
      baseUrl + '/tea/AllClassStudent?classID='+data,
     {},
       RequestConfig
    )
    //管理员添加班级学生
    static AddClassStudent = (RequestConfig:{needToken:boolean,header:object},data:any) =>
    httpRequest.post(
     baseUrl + '/tea/AddStuToClass',
      data,
      RequestConfig
   )
   static DeleteClassStudent = (RequestConfig:{needToken:boolean,header:object},data:any) =>
   httpRequest.post(
    baseUrl + '/tea/DeteleStuToClass',
     data,
     RequestConfig
  )
  // 管理员添加班级课程
  static AddClass = (RequestConfig:{needToken:boolean,header:object},data:any) =>
  httpRequest.post(
   baseUrl + '/tea/AddClass',
    data,
    RequestConfig
 )
 static DeleteClass = (RequestConfig:{needToken:boolean,header:object},data:any) =>
 httpRequest.post(
  baseUrl + '/tea/AddClass',
   data,
   RequestConfig
)
static PutClass = (RequestConfig:{needToken:boolean,header:object},data:any) =>
httpRequest.post(
 baseUrl + '/tea/PutClass?id='+data,
  data,
  RequestConfig
)
static DownClass = (RequestConfig:{needToken:boolean,header:object},data:any) =>
httpRequest.post(
 baseUrl + '/tea/DownClass?id='+data,
  data,
  RequestConfig
)
//签到
static Checkin = (RequestConfig:{needToken:boolean,header:object},sid:any,cid:any) =>
httpRequest.post(
  baseUrl + '/tea/Checkin?stuID='+sid+'&claID='+cid,
   {},
   RequestConfig
)
static LastCheck = (RequestConfig:{needToken:boolean,header:object},sid:any,cid:any)=>
httpRequest.post(
  baseUrl + '/tea/LastCheck?stuID='+sid+'&claID='+cid,
  {},
  RequestConfig
  )
  //根据老师ID选择课程
  static SelectClassByTeacher = (RequestConfig:{needToken:boolean,header:object},id:string) =>
  httpRequest.get(
    baseUrl + '/user/SelectClassByTeacher?id='+id,
    {},
    RequestConfig
    )
  //更改课程数量
  static UpdateClassNumber = (RequestConfig:{needToken:boolean,header:object},data:any)=>
  httpRequest.post(
    baseUrl + '/tea/UpdateClassNumber',
    data,
    RequestConfig
    )
	//查询一个学生的所有课程方法
	static SelcetStudentClass = (RequestConfig:{needToken:boolean,header:object},id:any)=>
	httpRequest.get(
	  baseUrl + '/tea'+'/SelectStudentClass?id='+id,
	  {},
	  RequestConfig
    )
    
}
