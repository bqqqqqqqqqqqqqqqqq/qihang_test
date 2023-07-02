import publicAPI from "../../api/system/publicAPI";

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAdmin:app.globalData.UserInfo.isAdmin,
    autoplay: true,
    interval: 3000,
    duration: 1200,
    current: 0,
    AllQimg:<string[]>[

    ],
    AllAimg:<string[]>[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
  //   var id:string = this.options.id
  //  this.getProblemDetail(id) 
  this.getProblemDetail((this.options.id as any) as string)
  },
  
getProblemDetail(id:string){
  publicAPI.getAnswerDetail(id).then((res:any)=>{
    if (res.code===200){
      this.data.AllQimg.push(...((res.data.problem_picture as string).split(";")))
      this.data.AllAimg.push(...((res.data.answer_picture as string).split(";")))
        this.setData({
            AllQimg: this.data.AllQimg,
            AllAimg:this.data.AllAimg
        })
        this.onLoad
    } else {
        wx.showToast({
          title:"出现错误，请重试"
        })
    }
  })
},

preview1(e:any) {
  let idx= e.currentTarget.dataset.idx;
  let pics =this.data.AllQimg;
  wx.previewImage({
    current: pics[idx],
    urls:pics
  })
},
preview2(e:any) {
  let idx= e.currentTarget.dataset.idx;
  let pics =this.data.AllAimg;
  wx.previewImage({
    current: pics[idx],
    urls:pics
  })
},


  
  
})