Page({
  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    gender: '男'
  },
  /**
   * 生命周期函数--监听页面加载
   */
 
  onLoad: function (options) {
    this.setData({
      //收到数据后使用decodeURIComponent()解码
      username: decodeURIComponent(options.username),
      gender: decodeURIComponent(options.gender)
    });
    console.log(options.username)
  },
  //保存按钮
  formSubmit:function(e:any){
    //表单返回的所有数据
    const formData=e.detail.value;
    //获取上一个页面的对象
    const pages=getCurrentPages()
    const prevPage=pages[pages.length-2]
    //调用上一个页面的setData()方法，把数据存储到上一个页面中去
    prevPage.setData({
      username:formData.username,
      gender:formData.gender
    })
    //返回上一个页面
    wx.navigateBack()
  }
})