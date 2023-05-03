// pages/order/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainActiveIndex: 0,
    activeId: null,
    imageURL:"https://zhimg.oss-cn-guangzhou.aliyuncs.com/img1pa2o2w225fb.jpeg",
    items:[
      {
        // 导航名称
        text: '选择教师',
        // 导航名称右上角徽标，1.5.0 版本开始支持
        badge: '',
        // 是否在导航名称右上角显示小红点，1.5.0 版本开始支持
        dot: false,
        // 禁用选项
        disabled: false,
        // 该导航下所有的可选项
        children: [
          {
            // 名称
            text: '温州',
            // id，作为匹配选中状态的标识
            id: 1,
            // 禁用选项
            disabled: false,
          },
          {
            text: '杭州',
            id: 2,
          },
        ],
      },
      {
        text:'选择年级',
        children:[
          {
            text: '杭',
            id: 4,
          },
        ]
      },
      {
        text:'选择项目',
        children:[
          {
            text: '州',
            id: 5,
          },
        ]
      }
    ]
    
    
  },
  
  onClickNav({ detail = {} }) {
    this.setData({
      mainActiveIndex: detail.index || 0,
    }); 
  },
  onClickItem({ detail = {} }) {
    const activeId = this.data.activeId === detail.id ? null : detail.id;

    this.setData({ activeId });
    console.log(activeId);
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