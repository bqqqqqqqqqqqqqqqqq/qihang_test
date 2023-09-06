import userApi from "../../api/system/userAPI"

// pages/allstu/index.ts
interface User{
  sid:string,
  name:string,
}
var AllStu:User[] = []
var app =getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    total:0,
    // indexList: ["初一", "初二", 3, 4, 5, 6, 7, 8, 9, 10],
    sList: [
      {
        id: 1,
        grade: "学生",
     
          AllStu
        
      },
    ],
    AllStu
  },
  //跳转
  goClassDetail(e:any){

    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url:"../stuClassDetail/index?id="+id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    userApi.GetAllStudent({
      needToken:true,
      header:{
    Authorization: app.globalData.token
  }
}).then((res:any)=>{
  if(res.code==200){
    const AllStu = this.data.AllStu
    if (res.data!=null){
      const Stu:User[] =res.data
      AllStu.push(...Stu) 
      this.setData({
        sList:[
          {
            id: 1,
            grade: "学生",
              AllStu
          },
        ],
        total:AllStu.length,
        AllStu: AllStu
      })
    }
  }else{

  }
})

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})