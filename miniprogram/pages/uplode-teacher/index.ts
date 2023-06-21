import Dialog from '@vant/weapp/dialog/dialog';
import Toast from '@vant/weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    autoplay: true,
    interval: 3000,
    duration: 1200,
    Qimg:[
      'https://zhimg.oss-cn-guangzhou.aliyuncs.com/wx/021f828776fa53d3dba775fdcff0426b_902397dda144ad340c66a469d2a20cf430ad8506.jpg',
      'https://zhimg.oss-cn-guangzhou.aliyuncs.com/wx/20230416165951.png',
      'https://zhimg.oss-cn-guangzhou.aliyuncs.com/wx/f5a9287f989835f8730a667ce2a4695.jpg',
      'https://zhimg.oss-cn-guangzhou.aliyuncs.com/wx/021f828776fa53d3dba775fdcff0426b_902397dda144ad340c66a469d2a20cf430ad8506.jpg',
    ],
    fileList: [
      {
        url: 'https://img.yzcdn.cn/vant/leaf.jpg',
        name: '图片1',
        isImage: true,
        deletable: true,  
      },
      // Uploader 根据文件后缀来判断是否为图片文件
      // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
      {
        url: 'http://iph.href.lu/60x60?text=default',
        name: '图片2',
        isImage: true,
        deletable: true,
      },
      
    ],
  },
  deleteImg(event:any){
    let index= event.detail.index
    console.log(index)//输出的就是图片所在fileList的下标
    var dataArray = this.data.fileList; // 获取数组数据
    dataArray.splice(index, 1); // 删除指定索引位置的元素
    this.setData({fileList: dataArray}); // 更新页面数据
  },
  preview1(e:any) {
    let idx= e.currentTarget.dataset.idx;
    let pics =this.data.Qimg;
    wx.previewImage({
      current: pics[idx],
      urls:pics
    })
  },
  onChange(){
    
  },
  clickBtn(){
    let inputValue = this.data.value;
    let picArrLength = this.data.fileList.length;
    if(inputValue==''){
      Dialog.confirm({
        message: '“知识点范畴”为空',
        confirmButtonText: '确认上传',
        cancelButtonText: '返回编辑',
      })
        .then(() => {
          // on confirm
          this.reset()
          Toast.success('上传成功');
        })
        .catch(() => {
          // on cancel
        });
    }else{
      this.reset()
      Toast.success('上传成功');
    }
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