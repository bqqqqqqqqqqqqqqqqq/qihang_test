import userAPI from "../../api/system/userAPI";
import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";

interface user{
  id: string,
  name: string
}
var userList: user[] = []
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList
  },
  click(e:any){
    let id = e.currentTarget.dataset.id;
    let name = e.currentTarget.dataset.name;
    Dialog.confirm({
      message: '是否移除'+name+'的权限？',
    }).then(() => {
        // on confirm
        userAPI.DeleteTeacher({
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
          let newList = oldList.filter(item => item.id !== id);
          this.setData({
            userList:newList
          })
        }
      })
      .catch(() => {
        // on cancel
      });

  })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getAllTeacher()
  },

  getAllTeacher(){
    userAPI.GetAllTeacher({
        needToken:true,
        header:{
      Authorization: app.globalData.token
    }
  }).then((res:any)=>{
      if(res.code===200){
        let nameList = this.data.userList;
        if(res.data!=null){
          nameList.push(...res.data)
          this.setData({
            userList: nameList,
            total: nameList.length.toString()
          })
        }

      }else{
        wx.showToast({
          title:"出现错误，请重试"
        })
      }
    }
    )
  },
})