// pages/buykc/index.ts

import userApi from "../../api/system/userAPI";

var app = getApp()
Page({
  data: {
    list:<any>[],
  },
  Alltea(){
    userApi.GetAllTeacher({
        needToken:true,
        header:{
      Authorization: app.globalData.token
    }
  },).then((res:any)=>{
      if(res.code===200){
        let dataList = this.data.list;
        if(res.data!=null){
          dataList.push(...res.data)
          this.setData({
            list: dataList,
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
  gotobuy(e:any){
    const id = e.currentTarget.dataset.id
    const teacherid = e.currentTarget.dataset.teacherid
    wx.navigateTo({
      url:"../order/index?id="+id+"&teacherID="+teacherid
    })
  },


onLoad(){
  this.Alltea()
}

})