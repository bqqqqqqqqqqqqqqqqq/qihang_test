import publicAPI from "../../api/system/publicAPI";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total:'',
    nameList:["李华","江军"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },
  getAllTeacher(){
    publicAPI.getTeacher().then((res:any)=>{
      if(res.code===200){
        let nameList = this.data.nameList;
        

        this.setData({
          nameList: nameList,
          total: nameList.length.toString()
        })
      }else{
        wx.showToast({
          title:"出现错误，请重试"
        })
      }
    }
    )
  }
})