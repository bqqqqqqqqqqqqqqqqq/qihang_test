import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
let baseUrl = require('../../api/base').allBaseUrl.GDEnvs.host
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    autoplay: true,
    interval: 3000,
    duration: 1200,
    AllQimg:<string[]>[],
    fileList:<any>[

        // url: 'https://img.yzcdn.cn/vant/leaf.jpg',
        // name: '图片1',
        // isImage: true,
        // deletable: true,  

      // Uploader 根据文件后缀来判断是否为图片文件
      // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
      
    ],
  },
  beforeRead(event:any){
    //before-read 事件可以在上传前进行校验，调用 callback 方法传入 true 表示校验通过，传入 false 表示校验失败。
    const { file, callback } = event.detail;
    callback(file.type === 'image');
  },
  afterRead(event:any) {
    let that = this;
    const { file } = event.detail;

    const { fileList = [] } = that.data;
    fileList.push({ ...file });
    that.setData({ fileList });
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
   
  },

  deleteImg(event:any){
    let index= event.detail.index
    // console.log(index)//输出的就是图片所在fileList的下标
    var dataArray = this.data.fileList; // 获取数组数据
    dataArray.splice(index, 1); // 删除指定索引位置的元素
    this.setData({fileList: dataArray}); // 更新页面数据
  },
  oversize(){
    wx.showToast({
      title:"超过大小，请压缩后上传",
      icon:"none"
    })
  }, 

  doSubmit(e:any) {
    if (this.data.fileList.length===0){
      wx.showToast({
        title:"请上传题目",
        icon:"error"
      })
      return
    }
  for (let i = 0;i<this.data.fileList.length;i++){
    var uploadTime = setTimeout(() =>{
      wx.uploadFile({
        url: baseUrl+"/user/UpAnswer", //baseUrl+'', 仅为示例，非真实的接口地址
        filePath: this.data.fileList[i].url  ,
        method:'post',
        name: 'file',
        formData: {
          // token:app.globalData.token
          problemID:this.options.id
        },
        header: {
          Authorization: app.globalData.token
        },
        //待测试
        success(res: any){
          // console.log(res);
          // console.log(res.statusCode);
          if (res.statusCode===401){
            wx.showToast({
            title:"登录失效，请重新登录",
            icon:"none"
          })
          wx.removeStorageSync('token')
          wx.removeStorageSync('UserInfo')
          clearTimeout(uploadTime)
          setTimeout(() => {
            wx.navigateTo({
              url:'../login/login'
          })
          }, 2000);
          return
        }else if (res.statusCode===200){
          wx.showToast({
            title:"已成功上传问题",
            icon:"none"
          })
          setTimeout(()=>{
            wx.navigateBack()
          },2000)
        }else {
          wx.showToast({
            title:"网络异常，请稍后重试试",
            icon:"none"
          })
        }
        },
      })
    }, 2000, i );
  }
},

  preview1(e:any) {
    let idx= e.currentTarget.dataset.idx;
    let pics =this.data.AllQimg;
    wx.previewImage({
      current: pics[idx],
      urls:pics
    })
  },
  onChange(){
    
  },
  clickBtn(){
   
  },
  //清除
  reset(){
    this.setData({
      value: '',
      fileList: []
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    let list = JSON.parse(this.options.AllQimg as any)
    // console.log(list)
    this.data.AllQimg.push(...list)
    this.setData({
      AllQimg:this.data.AllQimg
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