// pages/buykc/index.ts

import userApi from "../../api/system/userAPI";

var app = getApp()
Page({
  data: {
    teaList:<any>[],
  },
  getAllTeacher(){
    userApi.GetAllTeacher({
        needToken:true,
        header:{
      Authorization: app.globalData.token
    }
  }).then((res:any)=>{
      if(res.code===200){
        let nameList = this.data.teaList;
        if(res.data!=null){
          nameList.push(...res.data)
          this.setData({
            teaList: nameList,
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
  goBuyTeaKc(e:any){
    const id = e.currentTarget.dataset.tid;
    const type = e.currentTarget.dataset.type;
    
    wx.navigateTo({
      url:"../buykc-tea/index?tid="+id+"&type="+type
    })
  },


onLoad(){
  this.getAllTeacher()
}

})