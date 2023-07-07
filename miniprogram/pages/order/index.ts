// pages/order/index.ts
import Dialog from '@vant/weapp/dialog/dialog';
const options = [
  {
    text: '高老师',
    value: '330000',
    children: [{ text: '杭州市', value: '330100' ,children:[{ text: '市', value: '330110'}]}],
  },
  {
    text: '江苏省',
    value: '320000',
    children: [{ text: '南京市', value: '320100' }],
  },
];

Page({
  data: {
    imageURL:"https://zhimg.oss-cn-guangzhou.aliyuncs.com/img1pa2o2w225fb.jpeg",
    price:0,
    total:999999999,
    value:'',
    show: false,
    show2:false,
    options,
    fieldValue: '',
    cascaderValue: '',
    
    
  },
  //输入框
  onChange(e:any){
    let v = e.detail
    this.setData({
      value: v,
    });
  },
  onClick() {
    this.setData({
      show: true,
    });
  },
  onClose() {
    this.setData({
      show: false,
    });
  },
  onFinish(e:any) {
    const { selectedOptions, value } = e.detail;
    const fieldValue = selectedOptions
        .map((option:any) => option.text || option.name)
        .join('/');
    this.setData({
      fieldValue,
      cascaderValue: value,
    })
  },
  onClose2() {
    this.setData({
      show2: false,
    });
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
  onSubmit(){
    let oid = this.data.cascaderValue;
    this.setData({
      show2: true,
    });
    
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