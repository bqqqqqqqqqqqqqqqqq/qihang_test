import publicAPI from "../../api/system/publicAPI";
import userAPI from "../../api/system/userAPI";

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total:'',
    nameList:<any>[]
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
        let nameList = this.data.nameList;
        if(res.data!=null){
          nameList.push(...res.data)
          this.setData({
            nameList: nameList,
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
  }
})