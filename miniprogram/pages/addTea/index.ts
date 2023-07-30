import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";
import userAPI from "../../api/system/userAPI"

interface User{
  sid:string,
  name:string,
}
var AllStu:User[] = []
var app =getApp()
interface user{
  id: string,
  name: string
}
var userList: user[] = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList:<any>[]

  },



  click(e:any){

    let id = e.currentTarget.dataset.id;
    let name = e.currentTarget.dataset.name;
    Dialog.confirm({
      message: '是否添加'+name+'为老师？',
    })
      .then(() => {
        // on confirm
          userAPI.AddTeacher({
            needToken:true,
            header:{
          Authorization: app.globalData.token
        }
      },id).then((res:any)=>{
          if (res.code!=200){
            wx.showToast({
              title:"服务超时请重试",
              icon:"none"
            })
          }else if (res.code == 200){
            let oldList = this.data.userList;
            let newList = oldList.filter((item: { id: any; }) => item.id !== id);
            this.setData({
              userList:newList
            })
          }
      })
      })
      .catch(() => {
        // on cancel
      });
  },
  onLoad() {
    userAPI.GetAllStudent({
      needToken:true,
      header:{
    Authorization: app.globalData.token
  }
}).then((res:any)=>{
  if(res.code==200){
    const AllStu = this.data.userList
    if (res.data!=null){
      const Stu:User[] =res.data
      AllStu.push(...Stu) 
      this.setData({
        userList:AllStu
      })
    }
  }else{

  }
})

  },
})